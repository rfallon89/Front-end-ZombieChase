import axios from "axios";
import { useState } from "react";
import { View, TouchableOpacity, ImageBackground } from "react-native";
import { styles } from "../component/styles";
import background from "../assets/zombie_run_design.png";
import { Card, TextInput, Button, HelperText, Text } from "react-native-paper";
import { signup } from "../utils/api";

export default function Signup({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [profile_image_url, setProfileImageUrl] = useState("");
  const [signupFail, setSignupFail] = useState(false);
  const [usernameFail, setUsernameFail] = useState(false);
  const [emailFail, setEmailFail] = useState(false);
  const [nameFail, setNameFail] = useState(false);
  const [passwordFail, setPasswordFail] = useState(false);

  const validate = (type, value) => {
    if (type === "username") {
      setUsernameFail(!value.length > 0);
    }
    if (type === "email") {
      setEmailFail(!/[@(),.?":{}|<>]/g.test(value));
    }
    if (type === "name") {
      setNameFail(!value.length > 0);
    }
    if (type === "password") {
      setPasswordFail(!value.length > 0);
    }
  };

  const attemptSignup = () => {
    const user = {
      username,
      email,
      name,
      password,
      profile_image_url,
    };
    if (!(usernameFail & emailFail & nameFail & passwordFail)) {
      signup(user)
        .then((data) => {
          navigation.navigate("Login");
        })
        .catch((err) => {
          setSignupFail(true);
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
        <View style={styles.card}>
          <Text variant="headlineLarge" style={{ color: "white" }}>
            Sign up
          </Text>
          <HelperText type="error" visible={signupFail}>
            Please enter a valid username
          </HelperText>
          <HelperText type="error" visible={usernameFail}>
            Please enter a valid username
          </HelperText>
          <TextInput
            onChangeText={setUsername}
            value={username}
            placeholder="Username"
            style={styles.textInput}
            label="username"
            onBlur={() => validate("username", username)}
          />
          <HelperText type="error" visible={emailFail}>
            Please enter a valid email
          </HelperText>
          <TextInput
            onChangeText={setEmail}
            value={email}
            placeholder="email"
            style={styles.textInput}
            label="email"
            onBlur={() => validate("email", email)}
          />
          <HelperText type="error" visible={nameFail}>
            Please enter a valid name
          </HelperText>
          <TextInput
            onChangeText={setName}
            value={name}
            placeholder="name"
            style={styles.textInput}
            label="name"
            onBlur={() => validate("name", name)}
          />
          <HelperText type="error" visible={passwordFail}>
            Please enter a valid password
          </HelperText>
          <TextInput
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
            style={styles.textInput}
            label="password"
            secureTextEntry={true}
            onBlur={() => validate("password", password)}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <Button onPress={attemptSignup} mode="contained">
            <Text style={styles.buttonText}>Sign up</Text>
          </Button>
        </View>
      </ImageBackground>
    </View>
  );
}
