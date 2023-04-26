import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';


function Login({ navigation }) {
  const [value, setvalue] = useState({
    email: "",
    password: "",
  });
  const handleChange = (key, value) => {
    setvalue((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  const handleLogin = (items) => {
    // TODO: Send sign-up data to API endpoint

    function apiIntegration() {
      axios
        .post("http://10.0.2.2:8000/api/login", items, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            //   "Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept"
          },
        })
        .then(async (response) => {
          console.log(response.data, "lllll");
          await AsyncStorage.setItem("key", String(response.data._id));
          response.data.email &&
            setTimeout(() => {
              navigation.replace("users");
            }, 500);

          // Do something with the response data, such as setting user data in state or navigating to a new screen
        })
        .catch((error) => console.error(error));
    }

    apiIntegration();
  };

  return (
    <View style={styles.cantainer}>
      <Text style={styles.headerTxt}>WELCOME</Text>
      <View style={styles.subView}>
        <Text style={styles.subTxt}>Login</Text>
        <TextInput
          style={styles.nameInput}
          placeholder="Email"
          onChangeText={(text) => handleChange("email", text)}
        />
        <TextInput
          style={styles.nameInput}
          placeholder="Password"
          onChangeText={(text) => handleChange("password", text)}
        />
        <TouchableOpacity style={styles.btn} onPress={() => handleLogin(value)}>
          <Text style={styles.btnTxt}>Login</Text>
        </TouchableOpacity>
        <View style={styles.endView}>
          <Text style={styles.endTxt}>Create an account?</Text>
          <TouchableOpacity style={styles.endBtn}>
            <Text
              style={styles.loginTxt}
              onPress={() => navigation.replace("signup")}
            >
              SignUp
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default Login;

const styles = StyleSheet.create({
  cantainer: {
    backgroundColor: "#521be3",
    height: "100%",
  },
  subView: {
    backgroundColor: "white",
    height: 430,
    marginTop: 240,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    borderBottomEndRadius: 40,
    borderBottomLeftRadius: 40,
  },
  headerTxt: {
    fontSize: 40,
    marginLeft: 40,
    fontWeight: "bold",
    color: "white",
    position: "absolute",
    marginTop: 140,
  },
  subTxt: {
    color: "black",
    marginTop: 20,
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: 40,
  },
  nameInput: {
    height: 40,
    width: 270,
    marginLeft: 40,
    borderBottomWidth: 1,
    marginTop: 30,
  },
  btn: {
    height: 50,
    width: 200,
    backgroundColor: "blue",
    borderRadius: 80,
    borderWidth: 2,
    marginLeft: 70,
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  btnTxt: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  endView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  endTxt: {
    fontSize: 15,
    marginTop: 30,
    marginLeft: 60,
    fontWeight: "bold",
  },
  endBtn: {
    marginRight: 80,
  },
  loginTxt: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 24,
  },
});
