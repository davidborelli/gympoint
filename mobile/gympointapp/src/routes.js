import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from './pages/SignIn';

import Dashboard from './pages/Dashboard';
import Header from '~/components/Header';
import List from './pages/HelpOrders';
import Detail from './pages/HelpOrders/Detail';
import New from './pages/HelpOrders/New';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
        }),
        App: createBottomTabNavigator(
          {
            Checkins: {
              screen: createStackNavigator(
                {
                  Dashboard,
                },
                {
                  navigationOptions: {
                    tabBarLabel: 'Checkins',
                    tabBarIcon: ({ tintColor }) => (
                      <Icon name="add-location" size={20} color={tintColor} />
                    ),
                  },
                  defaultNavigationOptions: {
                    headerBackground: <Header />,
                  },
                }
              ),
            },
            HelpOrder: {
              screen: createStackNavigator(
                {
                  List,
                  Detail,
                  New,
                },
                {
                  navigationOptions: {
                    tabBarLabel: 'Pedir Ajuda',
                    tabBarIcon: ({ tintColor }) => (
                      <Icon name="help-outline" size={20} color={tintColor} />
                    ),
                  },
                  defaultNavigationOptions: {
                    headerBackground: <Header />,
                    headerBackImage: () => (
                      <Icon name="chevron-left" size={22} color="#000" />
                    ),
                    headerBackTitle: null,
                  },
                  // initialRouteName: 'Dashboard',
                }
              ),
            },
          },
          {
            resetOnBlur: true,
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#EE4E62',
              inactiveTintColor: '#707070',
              style: {
                backgroundColor: '#FFFFFF',
              },
            },
            defaultNavigationOptions: {
              headerBackground: <Header />,
            },
          }
        ),
      },
      {
        initialRouteName: signedIn ? 'App' : 'Sign',
      }
    )
  );
