import {
  View,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import background from "../assets/zombie_run_design.png";
import { Card, TextInput, Button, HelperText, Text } from "react-native-paper";
import { styles } from "../component/styles";
import { userContext } from "../component/UserContext";
import { useIsFocused } from "@react-navigation/native";
import { login } from "../utils/api";

export default function ({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginFail, setLoginFail] = useState(false);
  const [emailFail, setEmailFail] = useState(false);
  const [passwordFail, setPasswordFail] = useState(false);
  const { token, isLoggedIn } = useContext(userContext);
  const focus = useIsFocused();

  useEffect(() => {
    if (isLoggedIn === true) {
      navigation.navigate("UserHome", {
        responseToken: token,
      });
    }
  }, [focus]);

  const validate = (type, value) => {
    if (type === "email") {
      setEmailFail(
        !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g.test(
          value
        )
      );
    }
    if (type === "password") {
      setPasswordFail(!value.length > 0);
    }
  };

  const attemptLogin = () => {
    if (!passwordFail && !emailFail) {
      axios;
      login(email, password)
        .then((data) => {
          setLoginFail(false);
          console.log("login passed");
          navigation.navigate("UserHome", {
            responseToken: data.token,
          });
        })
        .catch((err) => {
          setLoginFail(true);
          console.log(err);
        });
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={background}
        resizeMode="cover"
        style={styles.image}
      >
        <HelperText type="error" visible={loginFail}>
          Email or password invalid!
        </HelperText>

        <View style={styles.card}>
          <Text style={{ color: "white" }} variant="headlineLarge">
            Login
          </Text>

          <HelperText type="error" visible={emailFail}>
            Please enter a valid email
          </HelperText>
          <TextInput
            onChangeText={setEmail}
            value={email}
            placeholder="email"
            label="email"
            onBlur={() => validate("email", email)}
            style={styles.textInput}
          />
          <HelperText type="error" visible={passwordFail}>
            Please enter a valid password
          </HelperText>
          <TextInput
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
            secureTextEntry={true}
            label="password"
            textColor="fffff"
            onBlur={() => validate("password", password)}
            style={styles.textInput}
          />
        </View>
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
