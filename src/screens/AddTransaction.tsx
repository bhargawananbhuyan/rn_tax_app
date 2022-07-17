import { StackActions, useNavigation } from "@react-navigation/native"
import React, { useState } from "react"
import { StyleSheet, Text, ToastAndroid, View } from "react-native"
import BackButton from "../components/BackButton"
import Dropdown from "../components/Dropdown"
import InputField from "../components/InputField"
import SubmitButton from "../components/SubmitButton"
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"

const options = ["Earning", "Expenditure"]

const AddTransaction = () => {
  const [value, setValue] = useState(options[0])
  const [title, setTitle] = useState("")
  const [amount, setAmount] = useState("")
  const navigation = useNavigation()

  return (
    <View>
      <BackButton />

      <View style={{ paddingHorizontal: 20 }}>
        <Text
          style={{
            color: "#000",
            fontSize: 18,
            fontWeight: "bold",
            marginBottom: 16,
          }}
        >
          Add a new transaction
        </Text>

        <Dropdown options={options} defaultValue={value} onChange={setValue} />
        <View style={{ marginTop: 12 }}>
          <InputField
            label="Title"
            placeholder="Enter title"
            value={title}
            onChangeText={(value) => setTitle(value)}
            onBlur={() => {}}
            error={false}
            errorMsg={""}
          />
        </View>

        <View style={{ marginVertical: 12 }}>
          <InputField
            label="Amount"
            placeholder="Enter amount"
            value={amount}
            onChangeText={(value) => setAmount(value)}
            onBlur={() => {}}
            error={false}
            errorMsg={""}
          />
        </View>

        <SubmitButton
          text="Submit"
          onPress={async () => {
            await firestore()
              .collection("transactions")
              .add({
                userId: auth().currentUser!.uid,
                transactionType: value,
                title,
                amount: parseFloat(amount),
                createdAt: firestore.FieldValue.serverTimestamp(),
              })
              .then(() => {
                ToastAndroid.show(
                  "Transaction added successfully",
                  ToastAndroid.SHORT
                )
                navigation.dispatch(StackActions.pop())
              })
              .catch((error) => {
                ToastAndroid.show(error?.message, ToastAndroid.SHORT)
              })
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})

export default AddTransaction
