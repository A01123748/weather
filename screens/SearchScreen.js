import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

const DATA = [];
//q={City Name} or lat={lat}&lon={lon} or zip={zip code}
const baseURL =
  "https://api.openweathermap.org/data/2.5/weather?appid=a0b87be8c0814bd84d71455dd624c89b&units=metric";

const Item = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Text style={styles.title}>{item.title}</Text>
  </TouchableOpacity>
);

const SearchScreen = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [value, onChangeText] = React.useState("");
  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        style={{ backgroundColor }}
      />
    );
  };

  const search = async (text) => {
    console.log(text);
    var queryParams = "";
    if (text != null) {
      if (isNaN(text)) {
        queryParams = "&q=" + text;
      } else {
        queryParams = "&zip=" + text;
      }
      let response = await fetch(baseURL + queryParams, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      let json = await response.json();
      console.log(json);
      if (json.cod !== "404") {
        debugger;
        const previousWeathers = await getData();
        if (previousWeathers == null) storeData(JSON.stringify([json]));
        else {
          debugger;
          var output = JSON.parse(previousWeathers);
          output = output.concat(json);
          console.log(output);
          storeData(JSON.stringify(output));
        }
      }
    }
  };

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("weathers", value);
    } catch (e) {
      console.error(e);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("weathers");
      return value;
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Search for a place's weather</Text>
      <TextInput
        style={styles.searchBar}
        onChangeText={(text) => onChangeText(text)}
        value={value}
      />
      <Button title="Search" onPress={() => search(value)} />
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  searchBar: {
    alignSelf: "stretch",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: 300,
  },
});

export default SearchScreen;
