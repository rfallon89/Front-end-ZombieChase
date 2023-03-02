import {
  ImageBackground,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  TextInput,
  HelperText,
  Text,
  ActivityIndicator,
} from "react-native-paper";
import background from "../assets/zombie_run_design.png";
import React, { useContext } from "react";
import { userContext } from "../component/UserContext";
import { useState } from "react";
import { deleteUser, updateUser } from "../utils/api";

function EditProfile({ navigation }) {
  const { user, setUser, token } = useContext(userContext);
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [image, setImage] = useState(user.image);
  const [usernameFail, setUsernameFail] = useState(false);
  const [emailFail, setEmailFail] = useState(false);
  const [nameFail, setNameFail] = useState(false);
  const [imageFail, setImageFail] = useState(false);
  const [loading, setLoading] = useState(false);

  const confirmDeleteUser = () => {
    Alert.alert("Delete User", "Are you sure you want to delete this user?", [
      { text: "Cancel", onPress: () => {} },
      {
        text: "Yes",
        onPress: () => {
          deleteUser(token, user._id).then((res) => {
            navigation.push("Login");
          });
        },
      },
    ]);
  };

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
  };

  const attemptUpdateUser = () => {
    setLoading(true);
    if (!usernameFail & !emailFail & !nameFail & !imageFail) {
      const updatedUser = {
        _id: user._id,
        name: name.trim(),
        username: username.trim(),
        email: email.trim(),
        profile_image_url: image.trim(),
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
        <TouchableOpacity
          style={styles.changeAndDeleteBtn}
          onPress={() => navigation.push("ChangePassword")}
        >
          <Text style={styles.changeAndDeleteBtnText}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.changeAndDeleteBtn}
          onPress={confirmDeleteUser}
        >
          <Text style={styles.changeAndDeleteBtnText}>Delete User</Text>
        </TouchableOpacity>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            onBlur={() => validate("name", name)}
            label="Name"
          />
          {nameFail ? (
            <HelperText type="error" visible={nameFail}>
              Please enter a valid name
            </HelperText>
          ) : null}
          <TextInput
            style={styles.input}
            label="Username"
            value={username}
            onChangeText={setUsername}
            onBlur={() => validate("username", username)}
          />
          {usernameFail ? (
            <HelperText type="error" visible={usernameFail}>
              Please enter a valid username
            </HelperText>
          ) : null}
          <TextInput
            style={styles.input}
            label="Email"
            value={email}
            onChangeText={setEmail}
            onBlur={() => validate("email", email)}
          />
          {emailFail ? (
            <HelperText type="error" visible={emailFail}>
              Please enter a valid email
            </HelperText>
          ) : null}
          <TextInput
            style={styles.input}
            label="Image URL"
            value={image}
            onChangeText={setImage}
            onBlur={() => validate("image", image)}
          />
          {imageFail ? (
            <HelperText type="error" visible={imageFail}>
              Please enter a valid image url
            </HelperText>
          ) : null}
        </View>
        <View style={[styles.buttonsContainer, { marginTop: 20 }]}>
          <TouchableOpacity
            onPress={attemptUpdateUser}
            mode="contained"
            style={styles.button}
          >
            {loading ? (
              <ActivityIndicator animating={true} color={"white"} />
            ) : (
              <Text style={styles.buttonText}>Update</Text>
            )}
          </TouchableOpacity>
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
    top: "10%",
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
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  button: {
    backgroundColor: "rgba(103,80,164,1)",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: "100%",
  },
  changeAndDeleteBtn: {
    marginTop: 10,
  },
  changeAndDeleteBtnText: {
    color: "#1E90FF",
    fontSize: 18,
  },
  buttonsContainer: {
    width: 100,
  },
});

export default EditProfile;
