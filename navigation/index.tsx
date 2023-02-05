/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable } from "react-native";

import Colors, { colors } from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import HomeScreen from "../screens/HomeScreen";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import SimulatorGameScreen from "../screens/SimulatorGameScreen";
import SimulatorListScreen from "../screens/SimulatorListScreen";
import SimulatorScreen from "../screens/SimulatorScreen";
import StatsScreen from "../screens/StatsScreen";
import StatsTableScreen from "../screens/StatsTableScreen";
import TyperLeagueScreen from "../screens/TyperLeagueScreen";
import TyperScreen from "../screens/TyperScreen";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
  SimulatorTabParamList,
  StatsTabParamList,
  TyperTabParamList,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";

export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const SimulatorStack = createNativeStackNavigator<SimulatorTabParamList>();

function SimulatorStackScreen() {
  return (
    <SimulatorStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.white,
      }}
    >
      <SimulatorStack.Screen name="Simulator" component={SimulatorScreen} />
      <SimulatorStack.Screen
        name="SimulatorList"
        component={SimulatorListScreen}
      />
      <SimulatorStack.Screen
        name="SimulatorGame"
        component={SimulatorGameScreen}
      />
    </SimulatorStack.Navigator>
  );
}

const TyperStack = createNativeStackNavigator<TyperTabParamList>();

function TyperStackScreen() {
  return (
    <TyperStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.white,
      }}
    >
      <TyperStack.Screen name="TyperMain" component={TyperScreen} />
      <TyperStack.Screen name="TyperLeague" component={TyperLeagueScreen} />
    </TyperStack.Navigator>
  );
}

const StatsStack = createNativeStackNavigator<StatsTabParamList>();

function StatsStackScreen() {
  return (
    <StatsStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.white,
      }}
    >
      <StatsStack.Screen name="Stats" component={StatsScreen} />
      <StatsStack.Screen name="StatsTable" component={StatsTableScreen} />
    </StatsStack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: colors.black },
        tabBarActiveTintColor: colors.lightblue,
        tabBarInactiveTintColor: colors.white,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<"Home">) => ({
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerShown: true,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("Modal")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="SimulatorRoot"
        component={SimulatorStackScreen}
        options={{
          title: "Simulator",
          tabBarIcon: ({ color }) => <TabBarIcon name="tasks" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="TyperRoot"
        component={TyperStackScreen}
        options={{
          title: "Typer",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="crosshairs" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Stats"
        component={StatsStackScreen}
        options={{
          title: "Stats",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="area-chart" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
