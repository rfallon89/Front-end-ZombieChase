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
          contentContainerStyle={{
            alignItems: "stretch",
          }}
          renderItem={({ item: { run_data, created_at } }) => {
            return (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  backgroundColor: "#a599ad",
                  width: "80%",
                  elevation: 20,
                  padding: 7,
                  margin: 4,
                  borderRadius: 10,
                  alignSelf: "center",
                }}
                onPress={() =>
                  navigation.navigate("ViewRun", {
                    run_data: run_data,
                    created_at: created_at,
                  })
                }
                // onLongPress={}
              >
                <Image
                  style={{ marginTop: 7, zIndex: 1 }}
                  source={run_data.zombieRoute ? zombie : runner}
                />
                <View
                  style={{ marginLeft: 13, paddingVertical: 10, zIndex: 1 }}
                >
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
