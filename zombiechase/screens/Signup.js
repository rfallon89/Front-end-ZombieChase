import axios from "axios";
import { useState } from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { styles } from "../component/styles";
import background from "../assets/zombie_run_design.png";
import { Card, TextInput, Button } from "react-native-paper";

export default function Signup({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [profile_image_url, setProfileImageUrl] = useState("");

  const attemptSignup = () => {
    axios
      .post("http://192.168.0.5:5000/signup", {
        username: username,
        email: email,
        name: name,
        password: password,
        profile_image_url: profile_image_url,
      })
      .then(({ data }) => {
        console.log(data);
        navigation.navigate("login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={background}
        resizeMode="cover"
        style={styles.image}
      >
        <Card style={styles.card}>
          <TextInput
            onChangeText={setUsername}
            value={username}
            placeholder="Username"
            style={styles.textInput}
            label="username"
          />
          <TextInput
            onChangeText={setEmail}
            value={email}
            placeholder="email"
            style={styles.textInput}
            label="email"
          />
          <TextInput
            onChangeText={setName}
            value={name}
            placeholder="name"
            style={styles.textInput}
            label="name"
          />
          <TextInput
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
            style={styles.textInput}
            label="password"
            secureTextEntry={true}
          />
        </Card>
        <View style={styles.buttonsContainer}>
          <Button onPress={attemptSignup} mode="contained">
            <Text>Sign up</Text>
          </Button>
        </View>
      </ImageBackground>
    </View>
  );
}
