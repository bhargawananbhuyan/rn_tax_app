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

  const menuPressHandler = () => {
    auth()
      .signOut()
      .then(() => {
        navigation.dispatch(StackActions.replace("signin_screen"))
      })
      .catch((error) => console.error(error))
  }

  const fabHandler = () => {
    navigation.navigate("add_screen" as any)
  }

  return (
    <SafeAreaView style={styles.root}>
      {loading ? (
        <View style={styles.loadingScreen}>
          <Text style={{ color: "#000" }}>Loading...</Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <View
            style={{ position: "absolute", right: 16, top: 20, zIndex: 100 }}
          >
            <Pressable
              android_ripple={{ color: "#fff" }}
              onPress={menuPressHandler}
            >
              <Icon name="keyboard-control" size={32} color="#000" />
            </Pressable>
          </View>

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
                {hour > 12
                  ? "afternoon"
                  : hour > 17 && hour < 24
                  ? "evening"
                  : "morning"}{" "}
                <Text style={{ fontWeight: "bold" }}>
                  {(user as any).fullName?.split(" ")[0]?.toLowerCase()}.
                </Text>
              </Text>
              <Text style={{ marginTop: 5, fontSize: 12 }}>
                Clear outstanding taxes to reduce fine.
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
                    ${calculateTaxes(data.transactions).total}
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
                <View style={{ alignItems: "center" }}>
                  <Text
                    style={{ fontSize: 16, fontWeight: "900", color: "#000" }}
                  >
                    ${calculateTaxes(data.transactions).tax}
                  </Text>
                  <Text
                    style={{ color: "#ef4444", fontSize: 12, marginTop: 3.5 }}
                  >
                    Tax to pay
                  </Text>
                </View>
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
