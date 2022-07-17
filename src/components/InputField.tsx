import React, { useState } from "react"
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"

type InputProps = {
  label: string
  placeholder: string
  isEmail?: boolean
  isPassword?: boolean
  value: string
  error: boolean
  errorMsg: string
  onChangeText: (value: string) => void
  onBlur: () => void
}

const InputField: React.FC<InputProps> = ({
  label,
  placeholder,
  isPassword,
  isEmail,
  value,
  error,
  errorMsg,
  onChangeText,
  onBlur,
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const toggleVisibility = () => setShowPassword(!showPassword)

  return (
    <>
      <View style={styles.root}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          style={styles.inputField}
          placeholder={placeholder}
          placeholderTextColor="#bcbcbc"
          secureTextEntry={isPassword && !showPassword}
          keyboardType={isEmail ? "email-address" : "ascii-capable"}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
        />
        {isPassword && (
          <Pressable style={styles.hideButton} onPress={toggleVisibility}>
            <Icon
              name={showPassword ? "visibility" : "visibility-off"}
              size={20}
              color="#757575"
            />
          </Pressable>
        )}
      </View>
      {error && <Text style={styles.error}>*{errorMsg}</Text>}
    </>
  )
}

const styles = StyleSheet.create({
  root: {
    position: "relative",
  },
  inputField: {
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderColor: "#dbdbdb",
    borderRadius: 5,
    color: "#000",
  },
  label: {
    marginBottom: 5,
    color: "#000",
  },
  hideButton: {
    position: "absolute",
    right: 8,
    bottom: 12.5,
    paddingHorizontal: 8,
    paddingVertical: 4.5,
  },
  error: {
    marginTop: 3.5,
    color: "#ef4444",
  },
})

export default InputField
