import React, { useContext } from "react";
import { userContext } from "../component/UserContext";
import background from "../assets/zombie_run_design.png";
import { useState } from "react";
import { ImageBackground, View, StyleSheet } from "react-native";
import { TextInput, Button, HelperText, Text } from "react-native-paper";
import { updateUser } from "../utils/api";

function ChangePassword({ navigation }) {
  const { user, token } = useContext(userContext);
  const [passwordFail, setPasswordFail] = useState(false);
  const [password, setPassword] = useState("");

  const validate = (value) => {
    setPasswordFail(!/^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,}$/.test(value));
    if (!passwordNotSet) {
      const updatedUser = {
        _id: user._id,
        password: password,
      };
      updateUser(token, updatedUser).then(() => {
        navigation.push("UserHome", {
          responseToken: token,
          user: user,
        });
      });
    }
  };

  const passwordNotSet = !/^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,}$/.test(
    password
  );

  return (
    <ImageBackground
      source={background}
      resizeMode="cover"
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.text}>
            Password must contain at least 7 letters and a special character
          </Text>
          <TextInput
            style={styles.input}
            label="New Password"
            value={password}
            secureTextEntry={true}
            onChangeText={setPassword}
          />
          <HelperText type="error" visible={passwordFail}>
            Please enter a valid password
          </HelperText>
        </View>
        <View style={styles.buttonsContainer}>
          <Button onPress={() => validate(password)} mode="contained">
            <Text style={styles.buttonText}>Update</Text>
          </Button>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    top: 100,
  },
  form: {
    width: "80%",
    minWidth: "80%",
  },
  input: {
    marginTop: 20,
    height: 50,
    borderRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  buttonsContainer: {
    width: "80%",
  },
  text: {
    color: "white",
    textAlign: "center",
    maxWidth: "100%",
  },
});

export default ChangePassword;
