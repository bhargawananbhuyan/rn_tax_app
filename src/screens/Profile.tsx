import { StackActions, useNavigation, useRoute } from "@react-navigation/native"
import React, { useState } from "react"
import { StyleSheet, Text, ToastAndroid, View } from "react-native"
import BackButton from "../components/BackButton"
import InputField from "../components/InputField"
import SubmitButton from "../components/SubmitButton"
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"

const Profile = () => {
  const { user }: any = useRoute().params
  const [userData, setUserData] = useState({
    fullName: user.fullName,
    email: user.email,
    password: "",
  })

  const navigation = useNavigation()
  const [loading, setLoading] = useState(false)

  return (
    <View>
      <BackButton />

      <View style={styles.root}>
        <Text
          style={[
            styles.text,
            { fontWeight: "bold", fontSize: 18, marginBottom: 21 },
          ]}
        >
          My profile
        </Text>

        <View>
          <InputField
            label="Full name"
            placeholder="Enter full name"
            value={userData.fullName}
            onChangeText={(value) =>
              setUserData({ ...userData, fullName: value })
            }
            onBlur={() => {}}
            error={false}
            errorMsg={""}
          />
          <View style={{ marginVertical: 12 }}>
            <InputField
              isEmail
              label="Email"
              placeholder="Enter email"
              value={userData.email}
              onChangeText={(value) =>
                setUserData({ ...userData, email: value })
              }
              onBlur={() => {}}
              error={false}
              errorMsg={""}
            />
          </View>
          <InputField
            isPassword
            label="Password"
            placeholder="Enter new password"
            value={userData.password}
            onChangeText={(value) =>
              setUserData({ ...userData, password: value })
            }
            onBlur={() => {}}
            error={false}
            errorMsg={""}
          />

          <View style={{ flexDirection: "row", marginTop: 16 }}>
            <View style={{ flex: 1 }}>
              <SubmitButton
                text="Edit"
                onPress={async () => {
                  if (
                    !userData.fullName ||
                    !userData.email ||
                    !userData.password
                  ) {
                    ToastAndroid.show(
                      "All fields are required.",
                      ToastAndroid.SHORT
                    )
                    return
                  }

                  try {
                    setLoading(true)
                    await auth().currentUser?.updatePassword(userData.password)

                    await auth().currentUser?.updateEmail(userData.email)

                    await firestore()
                      .collection("users")
                      .doc(auth().currentUser?.uid)
                      .update({
                        fullName: userData.fullName,
                        email: userData.email,
                      })

                    setLoading(false)
                    ToastAndroid.show(
                      "Profile updated successfully.",
                      ToastAndroid.SHORT
                    )
                  } catch (error) {
                    setLoading(false)
                    ToastAndroid.show(
                      (error as any)?.code ?? "Error occured.",
                      ToastAndroid.SHORT
                    )
                  }
                }}
              />
            </View>

            <View style={{ flex: 1, marginLeft: 12 }}>
              <SubmitButton
                text="Sign out"
                onPress={async () => {
                  auth()
                    .signOut()
                    .then(() => {
                      navigation.dispatch(StackActions.popToTop())
                      ToastAndroid.show(
                        "Signed out successfully.",
                        ToastAndroid.SHORT
                      )
                    })
                    .catch((error) => {
                      ToastAndroid.show(error.code, ToastAndroid.SHORT)
                    })
                }}
                color="#ef4444"
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 20,
  },
  text: {
    color: "#000",
  },
})

export default Profile
