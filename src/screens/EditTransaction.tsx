import firestore from "@react-native-firebase/firestore"
import { StackActions, useNavigation, useRoute } from "@react-navigation/native"
import React, { useState } from "react"
import { Text, ToastAndroid, View } from "react-native"
import BackButton from "../components/BackButton"
import Dropdown from "../components/Dropdown"
import InputField from "../components/InputField"
import SubmitButton from "../components/SubmitButton"
import auth from "@react-native-firebase/auth"

const options = ["Earning", "Expenditure"]

const EditTransaction: React.FC<any> = () => {
  const params: any = useRoute().params

  const [value, setValue] = useState(params.transactionType)
  const [title, setTitle] = useState(params.title)
  const [amount, setAmount] = useState(`${params.amount}`)
  const navigation = useNavigation()

  return (
    <View>
      <BackButton />

      <View style={{ paddingHorizontal: 20 }}>
        <Text
          style={{
            color: "#000",
            fontSize: 18,
            fontWeight: "bold",
            marginBottom: 16,
          }}
        >
          Edit transaction
        </Text>

        <Dropdown options={options} defaultValue={value} onChange={setValue} />
        <View style={{ marginTop: 12 }}>
          <InputField
            label="Title"
            placeholder="Enter title"
            value={title}
            onChangeText={(value) => setTitle(value)}
            onBlur={() => {}}
            error={false}
            errorMsg={""}
          />
        </View>

        <View style={{ marginVertical: 12 }}>
          <InputField
            label="Amount"
            placeholder="Enter amount"
            value={`${amount}`}
            onChangeText={(value) => setAmount(`${value}`)}
            onBlur={() => {}}
            error={false}
            errorMsg={""}
          />
        </View>

        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <SubmitButton
              text="Edit"
              onPress={async () => {
                if (title === "" || amount === "") {
                  ToastAndroid.show(
                    "All fields are required.",
                    ToastAndroid.SHORT
                  )
                  return
                }

                await firestore()
                  .collection("transactions")
                  .doc(params.id)
                  .update({
                    transactionType: value,
                    title,
                    amount: parseFloat(amount),
                  })
                  .then(() => {
                    ToastAndroid.show(
                      "Transaction updated successfully.",
                      ToastAndroid.SHORT
                    )
                    navigation.dispatch(StackActions.pop())
                  })
                  .catch((error) => {
                    ToastAndroid.show(error?.message, ToastAndroid.SHORT)
                  })
              }}
            />
          </View>

          <View style={{ flex: 1, marginLeft: 12 }}>
            <SubmitButton
              text="Delete"
              onPress={async () => {
                await firestore()
                  .collection("transactions")
                  .doc(params.id)
                  .delete()
                  .then(async () => {
                    if (value === options[0]) {
                      await firestore()
                        .collection("taxes")
                        .doc(auth().currentUser?.uid)
                        .update({
                          at: params.currentTotal - parseFloat(amount),
                        })
                    }
                    ToastAndroid.show(
                      "Transaction deleted successfully.",
                      ToastAndroid.SHORT
                    )
                    navigation.dispatch(StackActions.pop())
                  })
                  .catch((error) => {
                    ToastAndroid.show(error?.message, ToastAndroid.SHORT)
                  })
              }}
              color="#ef4444"
            />
          </View>
        </View>
      </View>
    </View>
  )
}

export default EditTransaction
