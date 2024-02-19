import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { checkIfLogin } from "../utils/sessionManagement";
import Main from "../screens/Main"; // Replace with your home screen component
import LoginScreen from "../screens/Login"; // Replace with your login screen component

const Stack = createNativeStackNavigator();

const AuthRoutes = () => {
  // Replace with your actual root reducer state
  //   const userLoginData = useSelector((state) => state.userLoginData);

  return (
    <NavigationContainer>
      {checkIfLogin() ? (
        <Stack.Navigator>
          <Stack.Screen name="Main" component={Main} />
          {/* Add more screens as needed */}
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default AuthRoutes;
