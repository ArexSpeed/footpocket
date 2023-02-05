/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
  //SimulatorList: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  Home: undefined;
  SimulatorRoot: SimulatorTabParamList;
  Simulator: undefined;
  SimulatorList:
    | {
        league: string;
      }
    | undefined;
  SimulatorGame: undefined;
  TyperRoot: TyperTabParamList;
  TyperMain: undefined;
  TyperLeague:
    | {
        league: string;
      }
    | undefined;
  Typer: undefined;
  Stats: undefined;
  StatsTable:
    | {
        league: string;
      }
    | undefined;
};

export type SimulatorTabParamList = {
  Simulator: undefined;
  SimulatorList: undefined;
  SimulatorGame: undefined;
};

export type TyperTabParamList = {
  TyperMain: undefined;
  TyperLeague: undefined;
};

export type StatsTabParamList = {
  Stats: undefined;
  StatsTable: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
