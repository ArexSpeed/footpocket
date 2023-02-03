import { Text, StyleSheet } from "react-native";
import { colors } from "../constants/Colors";

type Prop = {
  children: string;
};

function Title({ children }: Prop) {
  return <Text style={styles.title}>{children}</Text>;
}

export default Title;

const styles = StyleSheet.create({
  title: {
    fontFamily: "baloo",
    fontSize: 24,
    color: colors.white,
  },
});
