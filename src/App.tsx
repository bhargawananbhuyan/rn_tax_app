import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import Landing from "./screens/Landing"
import Signin from "./screens/Signin"
import Register from "./screens/Register"
import Homepage from "./screens/Homepage"

const Stack = createNativeStackNavigator()

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="landing_screen" component={Landing} />
        <Stack.Screen name="signin_screen" component={Signin} />
        <Stack.Screen name="register_screen" component={Register} />
        <Stack.Screen name="homepage_screen" component={Homepage} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
