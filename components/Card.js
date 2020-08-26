import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

//Custom component for nicer presentation
const Card = (props) => {
  return (
    <TouchableOpacity
      style={{ ...styles.card, ...props.style }}
      onPress={props.onPress}
    >
      <View style={styles.labelWrapper}>
        <Text style={styles.label}>
          {props.name}
          {props.item.isFavorite ? (
            <Ionicons
              iconStyle={{ marginTop: 0, marginLeft: 20 }}
              name="ios-star"
            />
          ) : (
            ""
          )}
        </Text>
        <Text style={styles.rightLabel}>{props.value}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    width: "100%",
    color: "white",
  },
  label: {
    fontSize: 20,
    width: "50%",
    color: "white",
    textAlignVertical: "center",
  },
  rightLabel: {
    color: "white",
    fontSize: 20,
    textAlign: "right",
    textAlignVertical: "center",
    width: "50%",
  },
  labelWrapper: {
    flexDirection: "row",
    textAlignVertical: "center",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Card;
