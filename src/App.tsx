import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import Landing from "./screens/Landing"
import Signin from "./screens/Signin"
import Register from "./screens/Register"
import Homepage from "./screens/Homepage"
import AddTransaction from "./screens/AddTransaction"
import EditTransaction from "./screens/EditTransaction"
import TaxPay from "./screens/TaxPay"
import Profile from "./screens/Profile"

const Stack = createNativeStackNavigator()

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "fade_from_bottom",
        }}
      >
        <Stack.Screen name="landing_screen" component={Landing} />
        <Stack.Screen name="signin_screen" component={Signin} />
        <Stack.Screen name="register_screen" component={Register} />
        <Stack.Screen name="homepage_screen" component={Homepage} />
        <Stack.Screen name="add_screen" component={AddTransaction} />
        <Stack.Screen name="edit_screen" component={EditTransaction} />
        <Stack.Screen name="taxpay_screen" component={TaxPay} />
        <Stack.Screen name="profile_screen" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
