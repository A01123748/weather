import React, { useState, useLayoutEffect, useEffect } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Images from "../components/Images";
import HeaderButton from "../components/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomRow from "../components/CustomRow";
import * as weatherActions from "../store/actions/weather";

Date.prototype.addHours = function (i) {
  this.setHours(this.getHours() + i);
  return this;
};

const DetailsScreen = (props) => {
  const { place } = props.route.params;
  const { isNew } = props.route.params;
  const [item, setItem] = useState(place);
  const [region, setRegion] = useState(null);
  const [loaded, setLoaded] = useState(false);
  // Expiration time in hours
  const expirationTime = 1;

  useEffect(() => {
    async function refreshData() {
      if (!isNew) {
        var date = new Date(item.dt * 1000).addHours(expirationTime);
        var now = new Date();
        // console.log("Now: " + now.toLocaleString());
        // console.log("Date: " + date.toLocaleString());
        if (date < now) {
          // console.log("expired");
          debugger;
          let updatedItem = await weatherActions.updateItem(item);
          setItem(updatedItem);
        } else {
          //do nothing
          // console.log("Not expired");
        }
      }
    }
    refreshData();
  }, []);

  const getRegion = (coord) => {
    try {
      var newRegion = {};
      if (coord !== null) {
        const oneDegreeOfLongitudeInMeters = 111.32 * 1000;
        const circumference = (40075 / 360) * 1000;
        const distance = 5000;
        const latDelta = distance * (1 / (Math.cos(coord.lat) * circumference));
        const lonDelta = distance / oneDegreeOfLongitudeInMeters;
        newRegion.latitude = coord.lat;
        newRegion.longitude = coord.lon;
        newRegion.latitudeDelta = Math.max(0, latDelta);
        newRegion.longitudeDelta = Math.max(0, lonDelta);
      } else {
        newRegion = {
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };
      }
      setRegion(newRegion);
      setLoaded(true);
    } catch (e) {
      console.error(e);
    }
  };

  const toggleFavorite = async () => {
    var weathers = await weatherActions.getData();
    place.isFavorite = !place.isFavorite;
    setItem(place);
    let index = weathers.findIndex((p) => p.id === item.id);
    weathers[index] = item;
    weatherActions.storeData(weathers);
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Favorite"
            iconName={item.isFavorite ? "ios-star" : "ios-star-outline"}
            onPress={() => toggleFavorite()}
          />
        </HeaderButtons>
      ),
    });
  };

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Favorite"
            iconName={item.isFavorite ? "ios-star" : "ios-star-outline"}
            onPress={() => toggleFavorite()}
          />
        </HeaderButtons>
      ),
    });
  }, [props.navigation, item, toggleFavorite]);

  if (!loaded && item !== null) {
    getRegion(item.coord);
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
        <CustomRow name="Temperature" value={`${item.main.temp}°C`} />
        <CustomRow name="Pressure" value={`${item.main.pressure} hPa`} />
        <CustomRow name="Humidity" value={`${item.main.humidity}%`} />
        <CustomRow name="Max temp" value={`${item.main.temp_max}°C`} />
        <CustomRow name="Min temp" value={`${item.main.temp_min}°C`} />
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
    backgroundColor: "white",
  },
  item: {
    flex: 1,
    padding: 20,
    marginVertical: 8,
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
    width: "50%",
  },
  rightLabel: {
    fontSize: 20,
    textAlign: "right",
    width: "50%",
  },
  map: {
    flex: 1,
  },
});

export default DetailsScreen;
