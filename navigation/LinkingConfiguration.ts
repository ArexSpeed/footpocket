/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              HomeScreen: 'home',
            },
          },
          SimulatorRoot: {
            screens: {
              Simulator: 'simulator',
              SimulatorList: 'simulator list',
              SimulatorGame: 'simulator game',
            },
          },
          TyperRoot: {
            screens: {
              TyperMain: 'typer',
              TyperLeague: 'typer league',
            },
          },
          Stats: {
            screens: {
              Stats: 'stats',
            },
          },
        },
      },
      Modal: 'modal',
      NotFound: '*',
    },
  },
};

export default linking;
