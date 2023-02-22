import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import axios from "axios";
import background from "../assets/zombie_run_design.png";
import { Card, TextInput, Button, HelperText } from "react-native-paper";
import { styles } from "../component/styles";

export default function ({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginFail, setLoginFail] = useState(false);

  const attemptLogin = () => {
    axios
      .post("http://192.168.0.5:5000/login", {
        email: email,
        password: password,
      })
      .then(({ data }) => {
        setLoginFail(false);
        navigation.navigate("UserHome", {
          responseToken: data.token,
        });
      })
      .catch((err) => {
        setLoginFail(true);
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
          <HelperText type="error" visible={loginFail}>
            Email or password invalid!
          </HelperText>

          <TextInput
            onChangeText={setEmail}
            value={email}
            placeholder="email"
            label="email"
            style={styles.textInput}
          />
          <TextInput
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
            secureTextEntry={true}
            label="password"
            style={styles.textInput}
          />
        </Card>
        <View style={styles.buttonsContainer}>
          <Button onPress={attemptLogin} mode="contained" style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </Button>

          <Button
            onPress={() => navigation.navigate("Signup")}
            mode="contained"
          >
            <Text style={styles.buttonText}>Sign up</Text>
          </Button>
        </View>
      </ImageBackground>
    </View>
  );
}
