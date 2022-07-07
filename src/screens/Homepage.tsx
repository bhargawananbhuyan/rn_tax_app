import React from "react"
import { SafeAreaView, StyleSheet, Text } from "react-native"

const Homepage = () => {
  return (
    <SafeAreaView style={styles.root}>
      <Text>Hello, world!</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#fbfbfb",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
})

export default Homepage
