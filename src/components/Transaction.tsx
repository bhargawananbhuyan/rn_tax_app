import React from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import dateFormat from "../utils/dateFormat"

type TransactionProps = {
  title: string
  transactionType: string
  amount: number
  date: string
  handlePress: (params: object) => void
}

const Transaction: React.FC<TransactionProps> = (props) => {
  return (
    <Pressable style={styles.root} onPress={props.handlePress}>
      <View>
        <View style={styles.titleWrapper}>
          <View
            style={[
              styles.iconWrapper,
              {
                backgroundColor:
                  props.transactionType === "Earning" ? "#22c55e" : "#ef4444",
              },
            ]}
          >
            <Icon
              name={
                props.transactionType === "Earning"
                  ? "south-east"
                  : "north-east"
              }
              color="#fff"
              size={12}
            />
          </View>
          <Text style={styles.title}>{props.title}</Text>
        </View>
        <Text style={styles.date}>{dateFormat(props.date)}</Text>
      </View>
      <Text style={styles.amount}>${props.amount}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#f3f3f3",
    marginTop: 12,
    borderRadius: 5,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconWrapper: {
    height: 36,
    width: 36,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  titleWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  date: {
    fontSize: 12,
    marginTop: 8,
  },
  amount: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
})

export default Transaction
