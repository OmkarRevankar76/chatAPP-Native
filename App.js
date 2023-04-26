import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { StyleSheet, Text, View } from "react-native";
import SignUpScreen from "./Screens/SignUp";
import Login from "./Screens/Login";
import Allusers from "./Screens/Allusers";
import ChatScreen from "./Screens/Chat";
import { Provider } from "react-redux";
import { store } from "./Redux/Store";
// import Chat from "./screens/Chat";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="signup"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="login"
          component={Login}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="users"
          component={Allusers}
          options={{ title: "All Users" }}
        />   

        <Stack.Screen name="chat" component={ChatScreen} />

        {/* <Stack.Screen
          name="Chat"
          component={Chat}
          options={{
            title: "Chats",
            headerShown: false,
          }}   
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}
