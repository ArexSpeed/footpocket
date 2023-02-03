import React from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "../constants/Colors";

interface Props {
  children: React.ReactNode;
}

function Container({ children }: Props) {
  return <View style={styles.container}>{children}</View>;
}

export default Container;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: colors.background,
    color: colors.white,
  },
});
