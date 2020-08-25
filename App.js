import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import SearchScreen from "./screens/SearchScreen";
import DetailsScreen from "./screens/DetailsScreen";
import ListScreen from "./screens/ListScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <DetailsScreen />
      <Button
        title="Add a new place"
        onPress={() => navigator.navigate("SearchScreen")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
