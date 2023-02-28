import axios from "axios";
import { useState, useContext } from "react";
import { View, TouchableOpacity, ImageBackground } from "react-native";
import { styles } from "../component/styles";
import background from "../assets/zombie_run_design.png";
import { Card, TextInput, Button, HelperText, Text } from "react-native-paper";
import { login, signup, getUser } from "../utils/api";
import { userContext } from "../component/UserContext";

export default function Signup({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [profile_image_url, setProfileImageUrl] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [signupFail, setSignupFail] = useState(false);
  const [usernameFail, setUsernameFail] = useState(false);
  const [emailFail, setEmailFail] = useState(false);
  const [nameFail, setNameFail] = useState(false);
  const [passwordFail, setPasswordFail] = useState(false);
  const { setToken, setIsLoggedIn, setUser } = useContext(userContext);
  const [isLoading, setIsLoading] = useState(false);

  const validate = (type, value) => {
    setButtonDisabled(false);
    if (type === "username") {
      setUsernameFail(!value.length > 0);
    }
    if (type === "email") {
      setEmailFail(
        !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g.test(
          value
        )
      );
    }
    if (type === "name") {
      setNameFail(!value.length > 0);
    }
    if (type === "password") {
      setPasswordFail(!/^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,}$/.test(value));
    }
  };

  const attemptSignup = () => {
    setIsLoading(true);
    const user = {
      username,
      email,
      name,
      password,
      profile_image_url,
    };

    if (!usernameFail & !emailFail & !nameFail & !passwordFail) {
      signup(user)
        .then(() => {
          return login(email, password);
        })
        .then((data) => {
          setSignupFail(false);
          return getUser(data.token);
        })
        .then((data) => {
          setIsLoggedIn(true);
          setIsLoading(false);
          setToken(data.token);
          setUser(data.user);
          navigation.navigate("UserHome", {
            responseToken: data.token,
            user: data.user,
          });
        })
        .catch((err) => {
          setSignupFail(true);
        });
    } else {
      setSignupFail(true);
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
          <Text
            style={{
              color: "white",
              textAlign: "right",
              fontSize: 22,
              fontWeight: "600",
              marginTop: 8,
            }}
          >
            Sign up
          </Text>
          <HelperText type="error" visible={signupFail}>
            Please enter valid credentials
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
          <HelperText
            type="error"
            visible={passwordFail}
            style={styles.passwordHelperText}
          >
            Password must contain at least 7 letters and a special character
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
          <HelperText
            type="error"
            style={styles.passwordHelperText}
          ></HelperText>
          <TextInput
            onChangeText={setProfileImageUrl}
            value={profile_image_url}
            placeholder="profile image url"
            style={styles.textInput}
            label="profile image url"
          />
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            onPress={attemptSignup}
            disabled={buttonDisabled}
            mode="contained"
          >
            <Text style={styles.buttonText}>
              {isLoading ? "loading.." : "Sign up"}
            </Text>
          </Button>
        </View>
      </ImageBackground>
    </View>
  );
}
