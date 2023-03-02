import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    minHeight: 100,
    width: "90%",
  },
  textInput: {
    height: 50,
    borderRadius: 4,
  },
  buttonsContainer: {
    padding: 20,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "rgba(103,80,164,1)",
    // padding: ,
    borderRadius: 30,
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontFamily: "sans-serif-medium",
  },
  passwordHelperText: {
    fontSize: 9,
  },
});
