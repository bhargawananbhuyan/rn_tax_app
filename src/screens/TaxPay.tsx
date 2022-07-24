import { StackActions, useNavigation, useRoute } from "@react-navigation/native"
import React, { useState } from "react"
import { StyleSheet, Text, ToastAndroid, View } from "react-native"
import BackButton from "../components/BackButton"
import SubmitButton from "../components/SubmitButton"
import firestore from "@react-native-firebase/firestore"

const TaxPay = () => {
  const [loading, setLoading] = useState(false)
  const { income, tax, userId, prevTaxedAt }: any = useRoute().params
  const navigation = useNavigation()

  const payTax = async () => {
    setLoading(true)
    await firestore()
      .collection("taxes")
      .doc(userId)
      .set({
        at: income,
        amount: tax,
        cleared: true,
      })
      .then(() => {
        setLoading(false)
        ToastAndroid.show("Tax paid successfully.", ToastAndroid.SHORT)
        navigation.dispatch(StackActions.pop())
      })
      .catch((error) => {
        setLoading(false)
        ToastAndroid.show(error.code, ToastAndroid.SHORT)
      })
  }

  return (
    <View>
      <BackButton />

      <View style={styles.root}>
        <Text style={{ fontWeight: "bold", color: "#000", fontSize: 21 }}>
          Tax payment
        </Text>
        <View style={{ marginTop: 24 }}>
          <Text style={{ fontWeight: "bold", color: "#000" }}>Breakup</Text>
          <View style={styles.divider} />

          <View style={styles.transaction}>
            <Text style={{ color: "#000" }}>Earnings taxed</Text>
            <Text style={{ color: "#000", fontWeight: "bold" }}>
              ${income - prevTaxedAt ?? 0}.00
            </Text>
          </View>

          <View style={styles.transaction}>
            <Text style={{ color: "#000" }}>Tax percentage</Text>
            <Text style={{ color: "#000", fontWeight: "bold" }}>1%</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.transaction}>
            <Text style={{ color: "#000" }}>Total</Text>
            <Text style={{ color: "#000", fontWeight: "bold" }}>${tax}</Text>
          </View>
        </View>

        <View style={{ marginTop: "12%" }}>
          <SubmitButton
            text={loading ? "Please wait..." : "Pay now"}
            onPress={payTax}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 20,
  },
  transaction: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  divider: {
    borderTopWidth: 1,
    borderColor: "#dbdbdb",
    marginTop: 12,
  },
})

export default TaxPay
