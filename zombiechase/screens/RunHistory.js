import { View, Text, TouchableOpacity } from "react-native";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../component/UserContext";
import { getRuns } from "../utils/api";

export default function RunHistory({ navigation }) {
  const { user, token } = useContext(userContext);
  const [runs, setRuns] = useState([]);

  useEffect(() => {
    getRuns(user._id, token).then((res) => setRuns(res));
  }, []);

  return runs.length > 0 ? (
    <View>
      <Text>Run History</Text>
      <Text>{runs[0].user_id}</Text>
    </View>
  ) : (
    <Text>Loading.....</Text>
  );
}
