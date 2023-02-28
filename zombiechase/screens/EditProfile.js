import {
  ImageBackground,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  Card,
  TextInput,
  Button,
  HelperText,
  Text,
  Avatar,
} from "react-native-paper";
import background from "../assets/zombie_run_design.png";
import React, { useContext, useEffect } from "react";
import { userContext } from "../component/UserContext";
import { useState } from "react";
import { getUser, updateUser } from "../utils/api";

function EditProfile({ navigation }) {
  const { user, setUser, token } = useContext(userContext);
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(user.image);
  const [updateUserFail, setUpdateUserFail] = useState(false);
  const [usernameFail, setUsernameFail] = useState(false);
  const [emailFail, setEmailFail] = useState(false);
  const [nameFail, setNameFail] = useState(false);
  const [passwordFail, setPasswordFail] = useState(false);
  const [imageFail, setImageFail] = useState(false);

  const validate = (type, value) => {
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
    if (type === "image") {
      setImageFail(!value.length > 0);
    }
    if (type === "password") {
      setPasswordFail(!/^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,}$/.test(value));
    }
  };

  const attemptUpdateUser = () => {
    if (!(usernameFail & emailFail & nameFail & passwordFail)) {
      const updatedUser = {
        _id: user._id,
        name: name,
        username: username,
        email: email,
        profile_image_url: image,
      };
      updateUser(token, updatedUser)
        .then((data) => {
          navigation.navigate("Profile");
          setUser({
            name: data.name,
            _id: data._id,
            username: data.username,
            email: data.email,
            image: data.profile_image_url,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <ImageBackground
      source={background}
      resizeMode="cover"
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          {user.image ? (
            <Avatar.Image source={{ uri: user.image }} size={100} />
          ) : (
            <Avatar.Text
              label={user.username.slice(0, 1).toUpperCase()}
              size={100}
            />
          )}
        </View>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            onBlur={() => validate("name", name)}
            label="name"
          />
          <HelperText type="error" visible={nameFail}>
            Please enter a valid name
          </HelperText>
          <TextInput
            style={styles.input}
            label="username"
            value={username}
            onChangeText={setUsername}
            onBlur={() => validate("username", username)}
          />
          <HelperText type="error" visible={usernameFail}>
            Please enter a valid username
          </HelperText>
          <TextInput
            style={styles.input}
            label="email"
            value={email}
            onChangeText={setEmail}
            onBlur={() => validate("email", email)}
          />
          <HelperText type="error" visible={emailFail}>
            Please enter a valid email
          </HelperText>
          <TextInput
            style={styles.input}
            label="image url"
            value={image}
            onChangeText={setImage}
            onBlur={() => validate("image", image)}
          />
          <HelperText type="error" visible={imageFail}>
            Please enter a valid image url
          </HelperText>
        </View>
        <View style={styles.buttonsContainer}>
          <Button onPress={attemptUpdateUser} mode="contained">
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
    top: 50,
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
  avatarContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  changeAvatarButton: {
    marginTop: 10,
  },
  changeAvatarButtonText: {
    color: "#1E90FF",
    fontSize: 18,
  },
  buttonsContainer: {
    padding: 20,
    width: "80%",
  },
});

export default EditProfile;
