import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import io from "socket.io-client";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { messageAction } from "../Redux/Messages";

const ChatScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const [data, setData] = useState([]);

  const handleSignUp = async () => {
    // TODO: Send sign-up data to API endpoint
    // TODO: Send sign-up data to API endpoint

    await axios
      .get("http://10.0.2.2:8000/api/users")
      .then((response) => {
        response.data && setData(response.data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    handleSignUp();
  }, []);

  //   const [messages, setMessages] = useState([])
  const messages = useSelector((state) => state.messages.messages);
  const [inputValue, setInputValue] = useState("");
  const [chatId, setChatId] = useState("");
  const [filterMessages, setFilterMessages] = useState([]);
  const { item } = route.params;
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View>
          <Text style={styles.myName}>{item.name}</Text>
        </View>
      ),
    });
  }, []);

  useEffect(() => {
    setFilterMessages(messages.filter((msg) => msg.id === item.id));
    console.log(filterMessages, "logged");
  }, [messages.length]);

  useEffect(() => {
    const newSocket = io("http://10.0.2.2:8000"); // Replace with your server URL
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) {
      return;
    }

    dispatch(messageAction.addMessage(messages));

    socket.on("message", (newMessage) => {
      const jsonData = JSON.parse(newMessage);

      const oddMessages = {
        id: jsonData.id,
        message: jsonData.message,
      };

      dispatch(messageAction.addMessage(oddMessages));
    });

    return () => {
      socket.off("message");
    };
  }, [socket]);

  //   const handleSend = () => {
  //     if (inputValue) {
  //       setMessages((prevMessages) => [
  //         ...prevMessages,
  //         { text: inputValue, sender: "me" },
  //       ]);
  //       setInputValue("");
  //     }
  //   };

  const handleSend = () => {
    if (inputValue && socket) {
      setChatId(item.id);

      const newMessage = { text: inputValue, sender: "me", id: item.id };
      //   setMessages((prevMessages) => [...prevMessages, newMessage]);
      socket.emit("message", newMessage);
      dispatch(messageAction.addMessage(newMessage));
      setInputValue("");
    }
  };

  const renderItem = ({ item }) => (
    <View
      style={
        item.sender === "me"
          ? styles.sentMessageContainer
          : styles.receivedMessageContainer
      }
    >
      <Text style={styles.messageText}>
        {item.sender ? item.text : item.message}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filterMessages}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${index}`}
        inverted={false}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputValue}
          onChangeText={setInputValue}
          placeholder="Type a message..."
          placeholderTextColor="#666"
          multiline={true}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingTop: 40,
  },
  sentMessageContainer: {
    alignSelf: "flex-end",
    backgroundColor: "#521be3",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    maxWidth: "80%",
  },
  receivedMessageContainer: {
    alignSelf: "flex-start",
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    maxWidth: "80%",
  },
  messageText: {
    color: "#fff",
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f1f1f1",
    borderRadius: 20,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    paddingVertical: 5,
    paddingHorizontal: 10,
    maxHeight: 150,
    minHeight: 40,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: "#521be3",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  myName: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default ChatScreen;
