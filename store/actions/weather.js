import AsyncStorage from "@react-native-community/async-storage";
import ENV from "../../data/env";
import CONSTANTS from "../../constants/Constants";
//append q={City Name} at the end to find the city by name
const baseURL =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=";
const authURL = baseURL + ENV.weatherApiKey;

export const search = async (searchParam) => {
  var queryParams = "";
  if (searchParam != null) {
    searchParam = searchParam.trim();
    if (isNaN(searchParam)) {
      queryParams = "&q=" + searchParam;
    } else {
      queryParams = "&id=" + searchParam;
    }
    let response = await fetch(authURL + queryParams, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    let json = await response.json();
    return json;
  }
  return null;
};

export const storeData = async (value) => {
  try {
    var res = JSON.stringify(value);
    await AsyncStorage.setItem(CONSTANTS.key, res);
  } catch (e) {
    console.error(e);
  }
};

export const getData = async () => {
  try {
    const value = await AsyncStorage.getItem(CONSTANTS.key);
    var res = JSON.parse(value);
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const updateItem = async (item) => {
  try {
    var updatedItem = await search(item.id);
    updatedItem.isFavorite = item.isFavorite;
    var weathers = await getData();
    let index = weathers.findIndex((p) => p.id === item.id);
    weathers[index] = updatedItem;
    storeData(weathers);
    return updatedItem;
  } catch (e) {
    console.error(e);
  }
};

export const clearData = async () => {
  try {
    AsyncStorage.removeItem(CONSTANTS.key);
  } catch (e) {
    console.error(e);
  }
};
