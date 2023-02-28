import React, { useContext, useEffect } from "react";
import background from "../assets/zombie_run_design.png";
import { Card, TextInput, HelperText, Text, Avatar } from "react-native-paper";
import {
  ImageBackground,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { userContext } from "../component/UserContext";
import { getUser } from "../utils/api";

export default function Profile({ navigation }) {
  const { user, setUser, token } = useContext(userContext);

  const Edit = () => {
    navigation.navigate("EditProfile");
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
            <Avatar.Image size={150} source={{ uri: user.image }} />
          ) : (
            <Avatar.Text
              size={150}
              label={user.username.slice(0, 1).toUpperCase()}
            />
          )}
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.usernameAndEmail}>{user.username}</Text>
          <Text style={styles.usernameAndEmail}>{user.email}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.changeAvatarButton} onPress={Edit}>
            <Text style={styles.editProfileButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  container: {
    width: "100%",
    alignItems: "center",
  },
  avatarContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 5,
    borderColor: "white",
  },
  name: {
    marginTop: 15,
    fontSize: 25,
    fontWeight: "bold",
  },
  usernameAndEmail: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "normal",
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  editProfileButtonText: {
    color: "#1E90FF",
    fontSize: 18,
  },
});
