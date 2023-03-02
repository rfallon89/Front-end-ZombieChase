import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground,
  Animated,
} from "react-native";
import { IconButton, ActivityIndicator } from "react-native-paper";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../component/UserContext";
import { getRuns } from "../utils/api";
import zombie from "../assets/zombie-larger.png";
import runner from "../assets/runner-larger.png";
import Background from "../assets/Background.png";
import { format } from "date-fns";
import { deleteRun } from "../utils/api";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";

export default function RunHistory({ navigation }) {
  const {
    user: { _id },
    token,
  } = useContext(userContext);

  const [runs, setRuns] = useState([]);
  useEffect(() => {
    getRuns(_id, token)
      .then((res) => {
        res ? setRuns(res.reverse()) : setRuns(undefined);
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteRunItem = (id) => {
    alert("Run deleted");
    const update = runs.filter((run) => run._id !== id);
    setRuns(update);
    deleteRun(id, token);
  };

  const renderRightActions = (progess, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-50, 0.5],
      outputRange: [1, 0.1],
    });

    const Style = {
      transform: [{ scale }],
    };

    return (
      <Animated.View
        style={[
          Style,
          {
            alignContent: "center",
            justifyContent: "center",
            width: "30%",
            elevation: 20,
            shadowColor: "white",
            marginVertical: 1,
            borderRadius: 10,
          },
        ]}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "#A60000",
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton
            icon="delete-forever-outline"
            size={20}
            iconColor={"white"}
          />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const RenderItem = ({ item, index, deleteRun }) => {
    return (
      <GestureHandlerRootView>
        <Swipeable
          renderRightActions={renderRightActions}
          onSwipeableOpen={() => deleteRunItem(item._id)}
          useNativeAnimations
          leftThreshold={"200%"}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              backgroundColor: "#522C79",
              marginVertical: 1,
              borderRadius: 10,
              elevation: 20,
              shadowColor: "white",
              padding: 7,
            }}
          >
            <Image
              style={{ marginTop: 7, height: 64, width: 64 }}
              source={item.run_data.zombieRoute ? zombie : runner}
            />
            <View style={{ marginLeft: 13, paddingVertical: 10 }}>
              <Text style={{ fontSize: 14, fontWeight: "500", color: "white" }}>
                {item.created_at
                  ? format(new Date(item.created_at), "MMM dd, yyyy")
                  : null}
              </Text>
              <Text style={{ color: "white" }}>
                {item.created_at
                  ? format(new Date(item.created_at), "hh:mm aaaaa'm'")
                  : null}
              </Text>
              <Text style={{ color: "white" }}>{`${
                item.run_data.runData.distance / 1000
              } km`}</Text>
            </View>
            <IconButton
              icon="chevron-double-right"
              size={30}
              iconColor={"white"}
              style={{ position: "absolute", right: 5, top: 15 }}
              onPress={() =>
                navigation.navigate("ViewRun", {
                  run_data: item.run_data,
                  created_at: item.created_at,
                })
              }
            />
          </View>
        </Swipeable>
      </GestureHandlerRootView>
    );
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ImageBackground
        source={Background}
        resizeMode="cover"
        style={{ flex: 1, alignItems: "center", paddingTop: 80 }}
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
        {!runs ? (
          <View style={{ justifyContent: "center", height: "70%" }}>
            <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>
              No runs recorded
            </Text>
          </View>
        ) : runs.length > 0 ? (
          <View style={{ width: "100%" }}>
            <FlatList
              ListEmptyComponent={() => (
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <Text>No runs to display</Text>
                </View>
              )}
              data={runs}
              renderItem={({ item, index }) => (
                <RenderItem
                  item={item}
                  index={index}
                  deleteRunItem={deleteRunItem}
                />
              )}
            />
          </View>
        ) : (
          <View style={{ justifyContent: "center", height: "70%" }}>
            <ActivityIndicator animating={true} color={"white"} size={50} />
          </View>
        )}
      </ImageBackground>
    </View>
  );
}
