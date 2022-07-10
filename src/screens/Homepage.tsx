import { StackActions, useNavigation, useRoute } from "@react-navigation/native"
import React, { useEffect, useState } from "react"
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native"
import firestore from "@react-native-firebase/firestore"
import Icon from "react-native-vector-icons/MaterialIcons"
import auth from "@react-native-firebase/auth"

const Homepage = () => {
  const route = useRoute()
  const navigation = useNavigation()

  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({})

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

  const menuPressHandler = () => {
    auth()
      .signOut()
      .then(() => {
        navigation.dispatch(StackActions.replace("signin_screen"))
      })
      .catch((error) => console.error(error))
  }

  return (
    <SafeAreaView style={styles.root}>
      {loading ? (
        <View style={styles.loadingScreen}>
          <Text style={{ color: "#000" }}>Loading...</Text>
        </View>
      ) : (
        <View style={styles.homepage}>
          <View style={{ position: "absolute", right: 20, top: 20 }}>
            <Pressable
              android_ripple={{ color: "#fff" }}
              onPress={menuPressHandler}
            >
              <Icon name="keyboard-control" size={32} color="#000" />
            </Pressable>
          </View>
          <View style={{ paddingTop: 42 }}>
            <Text style={{ color: "#000", fontSize: 21 }}>
              Good morning{" "}
              <Text style={{ fontWeight: "bold" }}>
                {(user as any).fullName?.split(" ")[0]?.toLowerCase()}.
              </Text>
            </Text>
          </View>
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
})

export default Homepage
