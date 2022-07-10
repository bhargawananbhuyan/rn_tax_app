import { StackActions, useNavigation } from "@react-navigation/native"
import { Formik } from "formik"
import React from "react"
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native"
import * as Yup from "yup"
import InputField from "../components/InputField"
import SubmitButton from "../components/SubmitButton"

import auth from "@react-native-firebase/auth"

const validationSchema = Yup.object().shape({
  email: Yup.string().email("please enter a valid email").required("required"),
  password: Yup.string()
    .min(8, "requires minimum 8 characters")
    .max(12, "maximum 12 characters allowed")
    .required("required"),
})

const Signin: React.FC = () => {
  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.root}>
      <View style={{ paddingHorizontal: 16 }}>
        <Text
          style={{
            fontSize: 21,
            fontWeight: "bold",
            color: "#000000",
            marginBottom: 18,
          }}
        >
          Sign in
        </Text>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            auth()
              .signInWithEmailAndPassword(values.email, values.password)
              .then((snapShot) => {
                navigation.dispatch(
                  StackActions.replace("homepage_screen", {
                    uid: snapShot.user.uid,
                  })
                )
                resetForm()
              })
              .catch((error) => {
                if (error.code === "auth/user-not-found") {
                  ToastAndroid.show("User not registered.", ToastAndroid.SHORT)
                }
              })
          }}
        >
          {({
            values,
            handleChange,
            handleBlur,
            touched,
            errors,
            handleSubmit,
            resetForm,
            isSubmitting,
          }) => (
            <>
              <InputField
                label="Email"
                placeholder="johndoe@gmail.com"
                isEmail
                value={values.email}
                onChangeText={handleChange(`email`)}
                onBlur={handleBlur(`email`) as any}
                error={touched.email && (errors.email as any)}
                errorMsg={errors.email as any}
              />

              <View style={{ marginVertical: 12 }}>
                <InputField
                  label="Password"
                  placeholder="Enter 8 to 12 characters"
                  isPassword
                  value={values.password}
                  onChangeText={handleChange(`password`)}
                  onBlur={handleBlur(`password`) as any}
                  error={touched.password && (errors.password as any)}
                  errorMsg={errors.password as any}
                />
              </View>

              <SubmitButton
                text={isSubmitting ? "Please wait..." : "Sign in"}
                onPress={handleSubmit}
              />

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "baseline",
                  marginTop: 12,
                }}
              >
                <Text style={{ color: "#000" }}>Not yet registered?</Text>
                <Pressable
                  style={{ padding: 3.5 }}
                  onPress={() => {
                    resetForm()
                    navigation.navigate("register_screen" as any)
                  }}
                >
                  <Text style={{ color: "#f87171" }}>Sign up</Text>
                </Pressable>
              </View>
            </>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#fbfbfb",
    flex: 1,
    paddingTop: 24,
  },
})

export default Signin
