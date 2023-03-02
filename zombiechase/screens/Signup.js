import { useState, useContext } from "react";
import { View, ImageBackground } from "react-native";
import { styles } from "../utils/styles";
import background from "../assets/zombie_run_design.png";
import { TextInput, Button, HelperText, Text } from "react-native-paper";
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
          setIsLoading(false);
        });
    } else {
      setSignupFail(true);
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={background}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={[styles.card, { marginTop: "20%" }]}>
          {signupFail ? (
            <HelperText type="error" visible={signupFail}>
              Please enter valid credentials
            </HelperText>
          ) : null}
          {usernameFail ? (
            <HelperText type="error" visible={usernameFail}>
              Please enter a valid username
            </HelperText>
          ) : null}
          <TextInput
            onChangeText={setUsername}
            value={username}
            placeholder="Username"
            style={styles.textInput}
            label="username"
            mode={"outlined"}
            onBlur={() => validate("username", username)}
          />
          {emailFail ? (
            <HelperText type="error" visible={emailFail}>
              Please enter a valid email
            </HelperText>
          ) : null}
          <TextInput
            onChangeText={setEmail}
            value={email}
            placeholder="email"
            style={styles.textInput}
            label="email"
            mode={"outlined"}
            onBlur={() => validate("email", email)}
          />
          {nameFail ? (
            <HelperText type="error" visible={nameFail}>
              Please enter a valid name
            </HelperText>
          ) : null}
          <TextInput
            onChangeText={setName}
            value={name}
            placeholder="name"
            style={styles.textInput}
            label="name"
            mode={"outlined"}
            onBlur={() => validate("name", name)}
          />
          {passwordFail ? (
            <HelperText
              type="error"
              visible={passwordFail}
              style={styles.passwordHelperText}
            >
              Password must contain at least 7 letters and a special character
            </HelperText>
          ) : null}
          <TextInput
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
            style={styles.textInput}
            label="password"
            mode={"outlined"}
            secureTextEntry={true}
            onBlur={() => validate("password", password)}
          />
          <TextInput
            onChangeText={setProfileImageUrl}
            value={profile_image_url}
            placeholder="profile image url"
            style={styles.textInput}
            mode={"outlined"}
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
