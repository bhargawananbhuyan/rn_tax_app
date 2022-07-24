import { useNavigation } from "@react-navigation/native"
import React, { useState } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"

const Menu = ({ user }: any) => {
  const [open, setOpen] = useState(false)
  const menuPressHandler = () => setOpen(!open)

  const navigation = useNavigation()

  return (
    <>
      <View style={{ position: "absolute", right: 16, top: 20, zIndex: 100 }}>
        <Pressable
          android_ripple={{ color: "#fff" }}
          onPress={menuPressHandler}
        >
          <Icon name="keyboard-control" size={32} color="#000" />
        </Pressable>
      </View>
      {open && (
        <View style={styles.root}>
          <Pressable
            style={styles.link}
            onPress={() => {
              setOpen(false)
              navigation.navigate(
                "profile_screen" as never,
                {
                  user,
                } as never
              )
            }}
          >
            <Text>User profile</Text>
          </Pressable>
        </View>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  root: {
    position: "absolute",
    top: "7.5%",
    right: 12,
    backgroundColor: "#fff",
    elevation: 5,
    zIndex: 1,
  },
  link: {
    paddingHorizontal: 21,
    paddingVertical: 12,
  },
})

export default Menu
