import React, { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  Button,
} from "react-native";
import * as weatherActions from "../store/actions/weather";

const SearchScreen = (props) => {
  const [message, setMessage] = useState("");
  const [value, setValue] = React.useState("");

  const search = async (text) => {
    let json = await weatherActions.search(text);
    setValue("");
    setMessage("");
    //404 means city not found
    if (json.cod !== "404") {
      const previousWeathers = await weatherActions.getData();
      //If is the first element
      if (previousWeathers == null || previousWeathers.length == 0) {
        weatherActions.storeData([json]);
        props.navigation.replace("Details", { place: json, isNew: true });
      }
      //If previous elements exist
      else {
        var output = previousWeathers;
        if (output.findIndex((p) => p.id === json.id) < 0) {
          //Allow maximum 5 elements
          if (output.length >= 5) {
            //Search for deletable elements by search, aka no favorites
            let indexToRemove = output.findIndex((p) => p.isFavorite === false);
            if (indexToRemove != -1) output.splice(indexToRemove, 1);
          }
          //Validate that one element was deleted or send error
          if (output.length >= 5) {
            setMessage(
              "Cities limit reached, remove them manually or remove from favorites"
            );
          } //Everything is fine, append element to list
          else {
            output = output.concat(json);
            weatherActions.storeData(output);
            props.navigation.replace("Details", { place: json, isNew: true });
          }
        } //Avoid duplicates
        else {
          setMessage("City already added");
        }
      }
    } else {
      setMessage(json.message);
      setValue("");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Type a city name:</Text>
      <TextInput
        style={styles.searchBar}
        onChangeText={(text) => setValue(text)}
        value={value}
        textAlign={"center"}
      />
      <Button title="Search" onPress={() => search(value)} />
      <Text style={styles.erroMessage}>{message}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginTop: StatusBar.currentHeight || 0,
    alignItems: "center",
    backgroundColor: "white",
  },
  item: {
    flex: 1,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 24,
  },
  searchBar: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: 300,
  },
  errorMessage: {
    color: "red",
    fontSize: 20,
  },
});

export default SearchScreen;
