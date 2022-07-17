import React, { useState } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"

type DropdownOptions = {
  options: string[]
  defaultValue: string
  onChange: (option: string) => void
}

const Dropdown: React.FC<DropdownOptions> = (props) => {
  const [open, setOpen] = useState(false)

  return (
    <View style={{ position: "relative", zIndex: 1 }}>
      <Text style={{ color: "#000", marginBottom: 8 }}>Transaction type</Text>
      <View style={styles.dropdown}>
        <Text>{props.defaultValue}</Text>
        <Pressable onPress={() => setOpen(!open)}>
          <Icon name="keyboard-arrow-down" size={21} color="#000" />
        </Pressable>
      </View>

      <View
        style={{
          display: open ? "flex" : "none",
          position: "absolute",
          top: "100%",
          backgroundColor: "#fff",
          width: "100%",
          borderRadius: 5,
          elevation: 10,
        }}
      >
        {props.options.map((option, i) => (
          <Pressable
            key={i}
            style={{ padding: 16 }}
            onPress={() => {
              props.onChange(option)
              setOpen(false)
            }}
          >
            <Text>{option}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  dropdown: {
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderColor: "#dbdbdb",
    borderRadius: 5,
    color: "#000",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
})

export default Dropdown
