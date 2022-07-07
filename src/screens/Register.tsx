import { StackActions, useNavigation } from "@react-navigation/native"
import * as Yup from "yup"
import React from "react"
import { Pressable, View, SafeAreaView, Text, StyleSheet } from "react-native"
import InputField from "../components/InputField"
import SubmitButton from "../components/SubmitButton"
import { Formik } from "formik"
import BackButton from "../components/BackButton"

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
            console.warn(values)
            resetForm()
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
          }) => (
            <>
              <InputField
                label="Full name"
                placeholder="John Doe"
                isEmail
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
                <SubmitButton text="Register" onPress={handleSubmit} />
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
