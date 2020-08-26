import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import DetailsScreen from "../screens/DetailsScreen";
import ListScreen from "../screens/ListScreen";
import SearchScreen from "../screens/SearchScreen";

const Stack = createStackNavigator();

const AppNavigator = (props) => {
  return (
    <NavigationContainer style={{ ...props.style }}>
      <Stack.Navigator>
        <Stack.Screen
          name="List"
          component={ListScreen}
          options={{ title: "Welcome" }}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{ title: "Weather finder" }}
        />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigator;
