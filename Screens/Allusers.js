import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, View, Text, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Allusers({ navigation }) {
   
  const [data, setData] = useState([]);
  const [value,setValue]=useState("")

  const handleSignUp = async () => {
    // TODO: Send sign-up data to API endpoint
    // TODO: Send sign-up data to API endpoint

   console.log(data,"data")

    console.log("value",value)
    let valued
    await axios
      .get("http://10.0.2.2:8000/api/users")
      .then(async(response) => {
        response.data && setData(response.data);
        setValue ( await AsyncStorage.getItem('key'))
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    handleSignUp();
  }, []);

  const filteredArray =data.length && data.filter(obj => obj.id != value);

  

  return (
    <FlatList
      data={filteredArray}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => {
            navigation.navigate("chat", { item });
          }}
          style={({ pressed }) => pressed && Styles.pressed}
        >
          <View style={Styles.containerAlpha}>
            <View style={Styles.container}>
              <View style={Styles.flexed}>
                <Text style={Styles.textStyle}>{item.name}</Text>
                <Ionicons name="md-arrow-redo" size={32} color="white" />
              </View>
            </View>
          </View>
        </Pressable>
      )}
      keyExtractor={(item) => item.id}
    />
  );
}

export default Allusers;

const Styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  textStyle: {
    color: "white",
  },
  pressed: {
    opacity: 0.5,
    fontSize: 30,
  },
  flexed: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
    backgroundColor: "#521be3",
    elevation: 8,
    width: 350,
    padding: 20,
    borderRadius: 10,
  },
});
