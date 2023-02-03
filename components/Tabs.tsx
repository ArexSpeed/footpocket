import { LinearGradient } from "expo-linear-gradient";
import { View, Pressable, Text, StyleSheet } from "react-native";
import { colors } from "../constants/Colors";

interface Props {
  tab1: string;
  tab2: string;
  activeTab: string;
  onPress: (tab: string) => void;
}

function Tabs({ tab1, tab2, activeTab, onPress }: Props) {
  return (
    <LinearGradient
      colors={colors.primaryGradient}
      style={styles.tabsContainer}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
    >
      <Pressable
        style={[styles.tab, activeTab === tab1 && styles.tabActive]}
        onPress={() => onPress(tab1)}
      >
        <Text style={styles.tabText}>{tab1.toUpperCase()}</Text>
      </Pressable>
      <Pressable
        style={[styles.tab, activeTab === tab2 && styles.tabActive]}
        onPress={() => onPress(tab2)}
      >
        <Text style={styles.tabText}>{tab2.toUpperCase()}</Text>
      </Pressable>
    </LinearGradient>
  );
}

export default Tabs;

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "80%",
    marginVertical: 16,
    backgroundColor: colors.primary,
    borderRadius: 4,
    padding: 2,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    margin: 4,
    borderRadius: 4,
    backgroundColor: "transparent",
  },
  tabActive: {
    backgroundColor: colors.secondary,
  },
  tabText: {
    fontFamily: "baloo",
    color: colors.white,
    fontSize: 24,
  },
});
