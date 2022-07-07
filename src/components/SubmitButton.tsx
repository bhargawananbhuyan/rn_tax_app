import React from "react"
import { Pressable, StyleSheet, Text } from "react-native"

type SubmitButtonProps = {
  text: string
  onPress: () => void
}

const SubmitButton = (props: SubmitButtonProps) => {
  return (
    <Pressable
      style={styles.submitButton}
      android_ripple={{ color: "#ffffff" }}
      onPress={props.onPress}
    >
      <Text style={{ color: "#ffffff", fontWeight: "500" }}>{props.text}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  submitButton: {
    backgroundColor: "#f87171",
    alignItems: "center",
    padding: 18,
    borderRadius: 5,
  },
})

export default SubmitButton
