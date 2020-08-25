import React, { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import AsyncStorage from "@react-native-community/async-storage";
import Images from "../components/Images";

const DetailsScreen = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [item, setItem] = useState(null);
  const [region, setRegion] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("weathers");
      var res = JSON.parse(value);
      //   console.log(res);
      //   debugger;
      setItem(res[1]);
      getRegion(res[1]);
      setLoaded(true);
    } catch (e) {
      //   AsyncStorage.setItem("weathers", "");
      console.error(e);
    }
  };
  const getRegion = (res) => {
    try {
      var newRegion = {};
      if (res !== null) {
        newRegion.latitude = res.coord.lat;
        newRegion.longitude = res.coord.lon;
        newRegion.latitudeDelta = 0.0922;
        newRegion.longitudeDelta = 0.0421;
      } else {
        newRegion = {
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };
      }
      setRegion(newRegion);
      // debugger;
      //   setItem(res);
    } catch (e) {
      console.error(e);
    }
  };
  // console.log(temp);
  if (!loaded) {
    getData();
  }
  if (item == null || item.size == 0) {
    return (
      <View>
        <Text>No data</Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.title}>{item.weather[0].main}</Text>
        <View style={styles.imgContainer}>
          <Image
            style={styles.img}
            source={Images.weather[item.weather[0].icon]}
          />
        </View>
        <View style={styles.labelWrapper}>
          <Text style={styles.label}>Temperature:</Text>
          <Text style={styles.rightLabel}>{item.main.temp}°F</Text>
        </View>

        <View style={styles.labelWrapper}>
          <Text style={styles.label}>Pressure:</Text>
          <Text style={styles.rightLabel}>{item.main.pressure}hPa</Text>
        </View>

        <View style={styles.labelWrapper}>
          <Text style={styles.label}>Humidity:</Text>
          <Text style={styles.rightLabel}>{item.main.humidity}%</Text>
        </View>

        <View style={styles.labelWrapper}>
          <Text style={styles.label}>Max temp:</Text>
          <Text style={styles.rightLabel}>{item.main.temp_max}°F</Text>
        </View>

        <View style={styles.labelWrapper}>
          <Text style={styles.label}>Min temp:</Text>
          <Text style={styles.rightLabel}>{item.main.temp_min}°F</Text>
        </View>
      </View>
      <MapView region={region} style={styles.map} provider={PROVIDER_GOOGLE}>
        <Marker
          coordinate={{ latitude: item.coord.lat, longitude: item.coord.lon }}
          title={item.name}
          //   description={marker.description}
        />
      </MapView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    width: "100%",
  },
  item: {
    padding: 20,
    marginVertical: 8,
    // marginHorizontal: 16,
    // alignItems: "stretch",
  },
  img: {
    width: 100,
    height: 100,
  },
  imgContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    textAlign: "center",
  },
  labelWrapper: {
    flexDirection: "row",
  },
  label: {
    fontSize: 20,
    // justifyContent: "space-between",
    // textAlign: "justify",
    // backgroundColor: "red",
    width: "50%",
  },
  rightLabel: {
    fontSize: 20,
    // justifyContent: "space-between",
    textAlign: "right",
    // backgroundColor: "red",
    width: "50%",
  },
  map: {
    flex: 1,
    // ...StyleSheet.absoluteFillObject,
  },
});

export default DetailsScreen;
