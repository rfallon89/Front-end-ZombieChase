import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LogInScreen from "./screens/LogInScreen";
import UserHome from "./screens/UserHome";
import StartRun from "./screens/StartRun";
import RunHistory from "./screens/RunHistory";
import ZombieChase from "./screens/ZombieChase";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={LogInScreen}
          options={{ title: "" }}
        />
        <Stack.Screen
          name="UserHome"
          component={UserHome}
          options={{ title: "" }}
        />
        <Stack.Screen name="Run" component={StartRun} />
        <Stack.Screen name="RunHistory" component={RunHistory} />
        <Stack.Screen name="ZombieChase" component={ZombieChase} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
