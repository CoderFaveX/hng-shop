import { StyleSheet } from "react-native";
import { Platform } from "react-native";

export const HomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    paddingHorizontal: 15,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    alignSelf: "center",
    padding: 15,
    borderRadius: 15,
    margin: 10,
    width: 270,
    ...Platform.select({
      ios: {
        shadowColor: "#BBB",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
      },
      android: {
        shadowColor: "#999",
        elevation: 5,
      },
    }),
  },
  errorIcon: {
    marginRight: 10,
    color: "#FFF",
    backgroundColor: "#FF7F7D",
    borderRadius: 50,
    padding: 3,
  },
  errorText: {
    color: "#FF7F7D",
    fontFamily: "MontSemi",
    fontSize: 16,
  },
  networkErrorContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  networkErrorImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  networkErrorText: {
    fontSize: 18,
    fontFamily: "MontSemi",
    marginBottom: 10,
  },
  networkErrorSteps: {
    alignItems: "flex-start",
  },
  networkErrorStepText: {
    fontSize: 14,
    marginBottom: 5,
    fontFamily: "Mont"
  },
});
