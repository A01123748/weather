import React from "react";
import { View, StyleSheet, Text } from "react-native";

//Custom component for nicer presentation
const CustomRow = (props) => {
  return (
    <View style={styles.labelWrapper}>
      <Text style={styles.label}>{props.name}:</Text>
      <Text style={styles.rightLabel}>{props.value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
});
export default CustomRow;
