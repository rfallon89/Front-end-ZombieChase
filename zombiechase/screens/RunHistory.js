import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../component/UserContext";
import { getRuns } from "../utils/api";
import zombie from "../assets/zombieRunner.png";
import runner from "../assets/runner.png";
import Background from "../assets/Background.png";
import { format } from "date-fns";

export default function RunHistory({ navigation }) {
  const {
    user: { _id },
    token,
  } = useContext(userContext);
  const [runs, setRuns] = useState([]);

  useEffect(() => {
    getRuns(_id, token).then((res) => setRuns(res.reverse()));
  }, []);

  return runs.length > 0 ? (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ImageBackground
        source={Background}
        resizeMode="cover"
        style={{ flex: 1, justifyContent: "center", paddingTop: 80 }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontSize: 24,
            fontWeight: "500",
            paddingBottom: 15,
            textShadowRadius: 3,
            textShadowColor: "white",
          }}
        >
          Run History
        </Text>
        <FlatList
          data={runs}
          renderItem={({ item: { run_data, created_at } }) => {
            return (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  backgroundColor: "#a599ad",
                  width: 200,
                  margin: 7,
                  elevation: 20,
                  shadowColor: "white",
                  padding: 7,
                  borderRadius: 10,
                  marginLeft: 61,
                }}
                onPress={() =>
                  navigation.navigate("ViewRun", {
                    run_data: run_data,
                    created_at: created_at,
                  })
                }
              >
                <Image source={run_data.zombieRoute ? zombie : runner} />
                <View style={{ marginLeft: 15, paddingTop: 10 }}>
                  <Text style={{ fontSize: 14, fontWeight: "500" }}>
                    {created_at
                      ? format(new Date(created_at), "MMM dd, yyyy")
                      : null}
                  </Text>
                  <Text>
                    {created_at
                      ? format(new Date(created_at), "hh:mm aaaaa'm'")
                      : null}
                  </Text>
                  <Text>{`${run_data.runData.distance / 1000} km`}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </ImageBackground>
    </View>
  ) : (
    <Text>Loading.....</Text>
  );
}
