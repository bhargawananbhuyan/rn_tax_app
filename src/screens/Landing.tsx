import { StackActions, useNavigation } from "@react-navigation/native"
import React from "react"
import { SafeAreaView, StyleSheet, Text, View } from "react-native"
import SubmitButton from "../components/SubmitButton"
import { colors } from "../utils/constants"

const Landing = () => {
  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.root}>
      <View>
        <View style={styles.title}>
          <Text style={styles.titleText}>tax</Text>
          <Text style={[styles.titleText, styles.titleSub]}>calc.</Text>
        </View>

        <Text style={styles.subtitle}>your taxes, simplified.</Text>
      </View>
      <View>
        <SubmitButton
          text="Get started"
          onPress={() =>
            navigation.dispatch(StackActions.replace("signin_screen"))
          }
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#fbfbfb",
    flex: 1,
    padding: 20,
    justifyContent: "space-evenly",
  },
  title: {
    flexDirection: "row",
  },
  titleText: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#000",
  },
  titleSub: {
    color: colors.primary,
  },
  subtitle: {
    fontSize: 21,
  },
})

export default Landing
