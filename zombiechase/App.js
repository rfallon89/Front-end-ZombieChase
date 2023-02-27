import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator, na } from "@react-navigation/native-stack";
import UserHome from "./screens/UserHome";
import StartRun from "./screens/StartRun";
import RunHistory from "./screens/RunHistory";
import ZombieChase from "./screens/ZombieChase";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import ViewRun from "./screens/ViewRun";
import ChaseSetup from "./screens/ChaseSetup";
import logo from "./assets/logo.png";
import { UserProvider } from "./component/UserContext";
import { Text, TouchableOpacity, Image } from "react-native";
import { Avatar } from "react-native-paper";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="UserHome"
            component={UserHome}
            options={({
              route: {
                params: { user },
              },
            }) => ({
              headerTransparent: true,
              headerLeft: () => (
                <TouchableOpacity style={{ flexDirection: "row" }}>
                  {user.image ? (
                    <Avatar.Image size={40} source={{ uri: user.image }} />
                  ) : (
                    <Avatar.Text
                      size={40}
                      label={user.username.slice(0, 1).toUpperCase()}
                    />
                  )}
                  <Text
                    style={{
                      color: "white",
                      fontSize: 18,
                      fontWeight: "600",
                      marginLeft: 7,
                      marginTop: 5,
                    }}
                  >
                    {user.username}
                  </Text>
                </TouchableOpacity>
              ),
              title: "",
            })}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={({ navigation }) => ({
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.pop()}>
                  <Image source={logo} />
                </TouchableOpacity>
              ),
              title: "",
              headerTransparent: true,
            })}
          />
          <Stack.Screen
            name="Run"
            component={StartRun}
            options={({
              route: {
                params: { user },
              },
              navigation,
            }) => ({
              headerTransparent: true,
              headerLeft: () => (
                <TouchableOpacity
                  style={{ flexDirection: "row" }}
                  onPress={() => navigation.pop()}
                >
                  {user.image ? (
                    <Avatar.Image size={40} source={{ uri: user.image }} />
                  ) : (
                    <Avatar.Text
                      size={40}
                      label={user.username.slice(0, 1).toUpperCase()}
                    />
                  )}
                  <Text
                    style={{
                      color: "white",
                      fontSize: 18,
                      fontWeight: "600",
                      marginLeft: 7,
                      marginTop: 5,
                    }}
                  >
                    {user.username}
                  </Text>
                </TouchableOpacity>
              ),
              title: "",
            })}
          />
          <Stack.Screen
            name="RunHistory"
            component={RunHistory}
            options={({
              route: {
                params: { user },
              },
              navigation,
            }) => ({
              headerTransparent: true,
              headerLeft: () => (
                <TouchableOpacity
                  style={{ flexDirection: "row" }}
                  onPress={() => navigation.pop()}
                >
                  {user.image ? (
                    <Avatar.Image size={40} source={{ uri: user.image }} />
                  ) : (
                    <Avatar.Text
                      size={40}
                      label={user.username.slice(0, 1).toUpperCase()}
                    />
                  )}
                  <Text
                    style={{
                      color: "white",
                      fontSize: 18,
                      fontWeight: "600",
                      marginLeft: 7,
                      marginTop: 5,
                    }}
                  >
                    {user.username}
                  </Text>
                </TouchableOpacity>
              ),
              title: "",
            })}
          />
          <Stack.Screen
            name="ZombieChase"
            component={ZombieChase}
            options={{ title: "" }}
          />
          <Stack.Screen
            name="ViewRun"
            component={ViewRun}
            options={{ title: "" }}
          />
          <Stack.Screen
            name="ChaseSetup"
            component={ChaseSetup}
            options={({
              route: {
                params: { user },
              },
              navigation,
            }) => ({
              headerTransparent: true,
              headerLeft: () => (
                <TouchableOpacity
                  style={{ flexDirection: "row" }}
                  onPress={() => navigation.pop()}
                >
                  {user.image ? (
                    <Avatar.Image size={40} source={{ uri: user.image }} />
                  ) : (
                    <Avatar.Text
                      size={40}
                      label={user.username.slice(0, 1).toUpperCase()}
                    />
                  )}
                  <Text
                    style={{
                      color: "white",
                      fontSize: 18,
                      fontWeight: "600",
                      marginLeft: 7,
                      marginTop: 5,
                    }}
                  >
                    {user.username}
                  </Text>
                </TouchableOpacity>
              ),
              title: "",
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
