import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"
import { StackActions, useNavigation, useRoute } from "@react-navigation/native"
import dayjs from "dayjs"
import React, { useEffect, useState } from "react"
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import Menu from "../components/Menu"
import Transaction from "../components/Transaction"
import { colors } from "../utils/constants"
import { calculateTaxes } from "../utils/taxUtils"

const Homepage = () => {
  const route = useRoute()
  const navigation = useNavigation()
  const hour = dayjs().get("hour")

  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({})
  const [data, setData] = useState({
    transactions: [],
    error: "",
  })

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (!user) {
        navigation.dispatch(StackActions.replace("landing_screen"))
      }
    })
  }, [])

  useEffect(() => {
    setLoading(true)
    firestore()
      .collection("users")
      .doc((route.params as any).uid)
      .get()
      .then((snapShot) => {
        if (snapShot.exists) {
          setUser(snapShot.data() as any)
          setLoading(false)
        }
      })
      .catch((error) => {
        console.error(error)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    const subscribe = firestore()
      .collection("transactions")
      .onSnapshot((snapShot) => {
        if (!snapShot.empty) {
          const _docs: never[] = []
          snapShot.forEach((doc) => {
            if (doc.data().userId === auth().currentUser!.uid)
              _docs.push({ id: doc.id, ...doc.data() } as never)
          })
          setData({ ...data, transactions: _docs })
        }
      })

    return () => subscribe()
  }, [user])

  const fabHandler = () => {
    navigation.navigate("add_screen" as any)
  }

  const [taxObj, setTaxObj] = useState(null)
  useEffect(() => {
    const subscribe = firestore()
      .collection("taxes")
      .onSnapshot((snapShot) => {
        if (!snapShot.empty) {
          snapShot.forEach((doc) => {
            if (doc.id === auth().currentUser?.uid) {
              setTaxObj(doc.data() as any)
            }
          })
        }
      })

    return () => subscribe()
  }, [])

  return (
    <SafeAreaView style={styles.root}>
      {loading ? (
        <View style={styles.loadingScreen}>
          <Text style={{ color: "#000" }}>Loading...</Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <Menu user={user} />

          <View
            style={{ position: "absolute", right: 16, bottom: 28, zIndex: 100 }}
          >
            <Pressable
              style={styles.fab}
              android_ripple={{ color: "#fff" }}
              onPress={fabHandler}
            >
              <Icon name="add" size={27} color="#fff" />
            </Pressable>
          </View>

          <ScrollView contentContainerStyle={styles.homepage}>
            <View style={{ paddingTop: 42, paddingBottom: 21 }}>
              <Text style={{ color: "#000", fontSize: 21 }}>
                Good{" "}
                {hour > 12 && hour < 17
                  ? "afternoon"
                  : hour > 17 && hour < 24
                  ? "evening"
                  : "morning"}{" "}
                <Text style={{ fontWeight: "bold" }}>
                  {(user as any).fullName?.split(" ")[0]?.toLowerCase()}.
                </Text>
              </Text>
              <Text style={{ marginTop: 5, fontSize: 12 }}>
                {calculateTaxes(data.transactions, taxObj as any).tax === 0
                  ? "Rest assured, your taxes are paid."
                  : "Clear outstanding taxes to reduce fine."}
              </Text>
            </View>

            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 21,
              }}
            >
              <View
                style={{
                  backgroundColor: "#f3f3f3",
                  flexDirection: "row",
                  paddingHorizontal: 21,
                  paddingVertical: 21,
                  borderRadius: 5,
                }}
              >
                <View style={{ alignItems: "center" }}>
                  <Text
                    style={{ fontSize: 16, fontWeight: "900", color: "#000" }}
                  >
                    {taxObj &&
                      `$${
                        calculateTaxes(data.transactions, taxObj).earnings -
                        calculateTaxes(data.transactions, taxObj).expenditure
                      }`}
                  </Text>
                  <Text
                    style={{ color: "#22c55e", fontSize: 12, marginTop: 3.5 }}
                  >
                    Earned
                  </Text>
                </View>
                <View
                  style={{
                    width: 1,
                    height: "100%",
                    backgroundColor: "#d3d3d3",
                    marginHorizontal: 16,
                  }}
                />
                <Pressable
                  disabled={
                    calculateTaxes(data.transactions, taxObj as any).tax === 0
                  }
                  onPress={() =>
                    navigation.navigate(
                      "taxpay_screen" as never,
                      {
                        userId: auth().currentUser?.uid,
                        income: calculateTaxes(data.transactions, taxObj as any)
                          .earnings,
                        tax: calculateTaxes(data.transactions, taxObj as any)
                          .tax,
                        prevTaxedAt: (taxObj as any)?.at,
                      } as never
                    )
                  }
                >
                  <View style={{ alignItems: "center" }}>
                    <Text
                      style={{ fontSize: 16, fontWeight: "900", color: "#000" }}
                    >
                      {taxObj &&
                        `$${calculateTaxes(data.transactions, taxObj).tax}`}
                    </Text>
                    <Text
                      style={{ color: "#ef4444", fontSize: 12, marginTop: 3.5 }}
                    >
                      Tax to pay
                    </Text>
                  </View>
                </Pressable>
              </View>
            </View>

            <View>
              <Text style={{ fontSize: 18, fontWeight: "bold", color: "#000" }}>
                Transactions
              </Text>
              {data.transactions.map((transaction: any, i) => (
                <Transaction
                  key={i}
                  title={transaction.title}
                  amount={transaction.amount}
                  transactionType={transaction.transactionType}
                  date={transaction.createdAt?.toDate()}
                  handlePress={() => {
                    navigation.navigate(
                      "edit_screen" as never,
                      {
                        currentTotal: calculateTaxes(
                          data.transactions,
                          taxObj as any
                        ).earnings,
                        ...transaction,
                      } as never
                    )
                  }}
                />
              ))}
            </View>
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#fbfbfb",
    flex: 1,
  },
  loadingScreen: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  homepage: {
    padding: 20,
  },
  fab: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 8,
  },
})

export default Homepage
