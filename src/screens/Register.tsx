import { StackActions, useNavigation } from "@react-navigation/native"
import * as Yup from "yup"
import React from "react"
import {
  Pressable,
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  ToastAndroid,
} from "react-native"
import InputField from "../components/InputField"
import SubmitButton from "../components/SubmitButton"
import { Formik } from "formik"
import BackButton from "../components/BackButton"
import firestore from "@react-native-firebase/firestore"
import auth from "@react-native-firebase/auth"

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("required"),
  email: Yup.string().email("please enter a valid email").required("required"),
  password: Yup.string()
    .min(8, "requires minimum 8 characters")
    .max(12, "maximum 12 characters allowed")
    .required("required"),
})

const Register: React.FC = () => {
  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.root}>
      <BackButton />
      <View style={{ paddingHorizontal: 16 }}>
        <Text
          style={{
            fontSize: 21,
            fontWeight: "bold",
            color: "#000000",
            marginBottom: 18,
          }}
        >
          Sign up
        </Text>

        <Formik
          initialValues={{
            fullName: "",
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            auth()
              .createUserWithEmailAndPassword(values.email, values.password)
              .then((snapShot) => {
                firestore()
                  .collection("users")
                  .doc(snapShot.user.uid)
                  .set({
                    fullName: values.fullName,
                    email: values.email,
                  })
                  .then(() => {
                    ToastAndroid.show(
                      "Account registered successfully.",
                      ToastAndroid.SHORT
                    )
                    navigation.dispatch(StackActions.replace("signin_screen"))
                    resetForm()
                  })
                  .catch((error) =>
                    ToastAndroid.show(error.code, ToastAndroid.SHORT)
                  )
              })
              .catch((error) => {
                if (error.code === "auth/email-already-in-use") {
                  ToastAndroid.show(
                    "Account already registered.",
                    ToastAndroid.SHORT
                  )
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
                label="Full name"
                placeholder="John Doe"
                value={values.fullName}
                onChangeText={handleChange(`fullName`)}
                onBlur={handleBlur(`fullName`) as any}
                error={touched.fullName && (errors.fullName as any)}
                errorMsg={errors.fullName as any}
              />

              <View style={{ marginVertical: 12 }}>
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
              </View>

              <View>
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

              <View style={{ marginVertical: 12 }}>
                <SubmitButton
                  text={isSubmitting ? "Please wait..." : "Register"}
                  onPress={handleSubmit}
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "baseline",
                }}
              >
                <Text style={{ color: "#000" }}>Not yet registered?</Text>
                <Pressable
                  style={{ padding: 3.5 }}
                  onPress={() => {
                    resetForm()
                    navigation.dispatch(StackActions.pop())
                  }}
                >
                  <Text style={{ color: "#f87171" }}>Sign in</Text>
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
  },
})

export default Register
