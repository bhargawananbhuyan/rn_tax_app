import React from "react"
import { Pressable, StyleSheet, Text } from "react-native"

type SubmitButtonProps = {
  text: string
  onPress: () => void
  color?: string
}

const SubmitButton = (props: SubmitButtonProps) => {
  return (
    <Pressable
      style={[
        styles.submitButton,
        { backgroundColor: props.color ?? "#f87171" },
      ]}
      android_ripple={{ color: "#ffffff" }}
      onPress={props.onPress}
    >
      <Text style={{ color: "#ffffff", fontWeight: "500" }}>{props.text}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  submitButton: {
    alignItems: "center",
    padding: 18,
    borderRadius: 5,
  },
})

export default SubmitButton
