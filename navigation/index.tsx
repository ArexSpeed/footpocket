import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import Logout from "../components/Logout";

import { colors } from "../constants/Colors";
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
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.white,
          headerShown: true,
          headerRight: () => <Logout />,
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
        name="StatsRoot"
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

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
