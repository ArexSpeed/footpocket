import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import AuthContextProvider from "./context/auth-context";
import { store } from "./context/store";
import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <AuthContextProvider>
        <Provider store={store}>
          <SafeAreaProvider>
            <Navigation />
            <StatusBar style="light" />
          </SafeAreaProvider>
        </Provider>
      </AuthContextProvider>
    );
  }
}
