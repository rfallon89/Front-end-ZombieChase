import { StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

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
    width: "80%",
  },
  button: {
    margin: 20,
  },
  buttonText: {
    color: "white",
  },
  passwordHelperText: {
    fontSize: 9,
  },
});
