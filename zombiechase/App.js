import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "react-native";
import LogInScreen from "./screens/LogInScreen";
import UserHome from "./screens/UserHome";
import StartRun from "./screens/StartRun";
import RunHistory from "./screens/RunHistory";
import ZombieSetup from "./screens/ZombieSetup";
import ZombieChase from "./screens/ZombieChase";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import { UserProvider } from "./component/UserContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Login} options={{ title: "" }} />

          <Stack.Screen
            name="UserHome"
            component={UserHome}
            options={{ title: "" }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{ title: "" }}
          />
          <Stack.Screen name="Run" component={StartRun} />
          <Stack.Screen
            name="ZombieSetup"
            component={ZombieSetup}
            options={{ title: "" }}
          />
          <Stack.Screen
            name="RunHistory"
            component={RunHistory}
            options={{ title: "" }}
          />
          <Stack.Screen
            name="ZombieChase"
            component={ZombieChase}
            options={{ title: "" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
