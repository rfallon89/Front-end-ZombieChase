import { View, ImageBackground, Image } from "react-native";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import background from "../assets/zombie_run_design.png";
import { TextInput, Button, HelperText, Text } from "react-native-paper";
import { styles } from "../component/styles";
import { userContext } from "../component/UserContext";
import { useIsFocused } from "@react-navigation/native";
import { login, getUser } from "../utils/api";
import logo from "../assets/logo.png";

export default function ({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loginFail, setLoginFail] = useState(null);
  const [emailFail, setEmailFail] = useState(null);
  const [passwordFail, setPasswordFail] = useState(false);
  const { setToken, setIsLoggedIn, setUser } = useContext(userContext);
  const [isLoading, setIsLoading] = useState(false);

  const validate = (type, value) => {
    setButtonDisabled(false);
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
    setIsLoading(true);
    if (!passwordFail && !emailFail) {
      login(email, password)
        .then((data) => {
          setLoginFail(false);
          getUser(data.token).then((data) => {
            setIsLoading(false);
            setIsLoggedIn(true);
            setToken(data.token);
            setUser(data.user);
            navigation.navigate("UserHome", {
              responseToken: data.token,
              user: data.user,
            });
          });
        })
        .catch((err) => {
          console.log(err);
          setLoginFail(true);
        });
    } else {
      setLoginFail(true);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={background}
        resizeMode="cover"
        style={styles.image}
      >
        <Image source={logo} style={{ marginLeft: "6%" }} />
        <HelperText type="error" visible={loginFail}>
          Email or password invalid!
        </HelperText>

        <View style={styles.card}>
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
          <Button
            onPress={attemptLogin}
            mode="contained"
            disabled={buttonDisabled}
            style={styles.button}
          >
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
