import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Button,
  View,
  Text,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import Card from "../components/Card";
import { SwipeListView } from "react-native-swipe-list-view";

const ListScreen = (props) => {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  // debugger;
  const getData = async (props) => {
    try {
      const value = await AsyncStorage.getItem("weathers");
      var res = JSON.parse(value);
      setData(res);
      setLoaded(true);
      return res;
    } catch (e) {
      console.error(e);
    }
  };
  const removeItem = async (item, index) => {
    try {
      let res = data.filter((city) => city.id != item.item.id);
      setData(res);
      res = JSON.stringify(res);
      AsyncStorage.setItem("weathers", res);
      setLoaded(true);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    getData();
  });
  // console.log(temp);
  if (loaded) {
    if (data == null || data.length === 0) {
      // props.navigation.navigate("Search");
    }
  }
  const renderItem = ({ item }) => {
    return (
      <Card
        item={item}
        name={item.name}
        value={`${item.main.temp}°C`}
        onPress={() => {
          navigation.navigate("Details", { place: item });
        }}
        style={styles.item}
      />
    );
  };
  const renderHiddenItem = (item, index) => (
    <TouchableOpacity
      style={styles.rowBack}
      onPressOut={() => removeItem(item, index)}
    >
      <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
        <Text style={styles.backTextWhite}>Delete</Text>
      </View>
    </TouchableOpacity>
  );
  // debugger;
  const navigation = props.navigation;
  return (
    <SafeAreaView style={styles.container}>
      <SwipeListView
        useFlatList={true}
        contentContainerStyle={styles.contentContainer}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        data={data}
        renderItem={renderItem}
        renderHiddenItem={(item, index) => renderHiddenItem(item, index)}
        // leftOpenValue={0}
        rightOpenValue={-75}
        keyExtractor={(item) => item.id + ""}
        // onRowOpen={(rowKey, rowMap) => {
        //   setTimeout(() => {
        //     rowMap[rowKey].closeRow();
        //   }, 2000);
        // }}
      />
      <Button
        title="Add a new place"
        onPress={() => navigation.navigate("Search")}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "white",
    justifyContent: "space-between",
    padding: 10,
    marginBottom: 40,
  },
  item: {
    // padding: 20,
    // marginVertical: 8,
    // marginHorizontal: 16,
    height: 60,
    backgroundColor: "#8A004F",
  },
  contentContainer: {
    flex: 1,
    // justifyContent: "space-evenly",
    padding: 10,
    marginBottom: 40,
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
  },
  backRightBtnRight: {
    backgroundColor: "red",
    right: 0,
  },
  backTextWhite: {
    color: "#FFF",
    fontSize: 20,
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "red",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    // paddingLeft: 0,
    borderRadius: 10,
  },
  rowFront: {
    alignItems: "center",
    backgroundColor: "#CCC",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    justifyContent: "center",
    height: 50,
  },
});

export default ListScreen;
