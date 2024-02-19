import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Main from "./screens/Main";
import ProductDetail from "./screens/ProductDetail";
import Login from "./screens/Login";
import Register from "./screens/Register";
import ImageUpload from "./screens/Register/ImageUpload";
import OTP from "./screens/OTP";
import ForgotPassword from "./screens/ForgotPassword";
import ServiceProviderDetail from "./screens/ServiceProviderDetail";
import More from "./screens/tabs/More";
import AdminOrder from "./screens/AdminOrder";
import MyOrders from "./screens/MyOrders";
import BookingScreen from "./screens/BookingScreen";
import { checkIfLogin } from "./utils/sessionManagement";
import Notifications from "./screens/Notifications";
import ContinueUs from "./screens/Register/ContinueUs";
import UserDetail from "./screens/MyOrders/UserDetail";
import { useDispatch, useSelector } from "react-redux";
import { apiFailureAction } from "./commonApiLogic.Js";
import { headerUtils, session } from "./utils";
import { loginAction } from "./screens/Login/logic";
import MyAvailability from "./screens/MyAvailability";
import Setting from "./screens/Setting";
import EditProfile from "./screens/EditProfile";
import BookingDetail from "./screens/BookingDetail";

const Stack = createNativeStackNavigator();

const AppNavigator = ({ setLoginState, loginState }) => {
  const { isError, error = { message: "Something went wrong" } } = useSelector(
    (state) => state.apiFailureError
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      const response = error.response;

      if (response) {
        if (response.status === 401) {
          session.clearSession();
          headerUtils.discardHeader();
          dispatch(loginAction.resetLogin());
        } else if (response.status === 504) {
          // Handle 504
        } else if (response.status === 400) {
          // Handle 400
        } else if (response.status === 404) {
          // Handle 404
        } else {
          // Handle other status codes
        }
      } else {
        // Handle no response
      }
      dispatch(apiFailureAction.resetApiFailure());
    }
  }, [isError, error, dispatch]);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const isLoggedIn = await checkIfLogin();
      setLoginState(isLoggedIn);
      return isLoggedIn;
    };
    checkLoginStatus();
  }, [setLoginState]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {loginState ? (
          <Stack.Screen
            name="Main"
            component={Main}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen name="Login" options={{ headerShown: false }}>
            {(props) => (
              <Login
                {...props}
                loginState={loginState}
                setLoginState={setLoginState}
              />
            )}
          </Stack.Screen>
        )}
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ContinueUs"
          component={ContinueUs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OTP"
          component={OTP}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Notifications"
          component={Notifications}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="serviceProviderDetail"
          component={ServiceProviderDetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserDetail"
          component={UserDetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="More"
          component={More}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AdminOrder"
          component={AdminOrder}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyOrders"
          component={MyOrders}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SettingScreen"
          component={Setting}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyAvailability"
          component={MyAvailability}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BookingScreen"
          component={BookingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={EditProfile}
          name="EditProfile"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={ImageUpload}
          name="ImageUpload"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={BookingDetail}
          name="BookingDetail"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetail}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
