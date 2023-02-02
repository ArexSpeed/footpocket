import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
// import { useFonts } from "expo-font";
import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";

export default function App() {
  const isLoadingComplete = useCachedResources();
  // const [fontsLoaded] = useFonts({
  //   baloo: require("./assets/fonts/Baloo2-VariableFont_whgt.ttf"),
  // });

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation />
        <StatusBar style="light" />
      </SafeAreaProvider>
    );
  }
}
