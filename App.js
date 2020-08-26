import { Platform, StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AppNavigator from "./navigation/AppNavigator";

export default function App() {
  return (
    //Included ErrourBoundary class component to ease with the debugging
    <ErrorBoundary>
      {/* Style differences betwen os */}
      {Platform.OS === "ios" && <StatusBar barStyle="default" />}
      <View style={styles.screen}>
        <AppNavigator style={styles.container} />
      </View>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    marginTop: StatusBar.currentHeight || 0,
  },
  container: {
    flex: 1,
  },
});

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <Text>Something went wrong.</Text>;
    }

    return this.props.children;
  }
}
