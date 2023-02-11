import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { store } from "./context/store";
import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <Navigation />
          <StatusBar style="light" />
        </SafeAreaProvider>
      </Provider>
    );
  }
}
