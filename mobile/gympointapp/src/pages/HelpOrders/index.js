import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';

export default function HelpOrders() {
  return <Background />;
}

HelpOrders.navigationOptions = {
  tabBarLabel: 'Pedir ajuda',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="person" size={20} color={tintColor} />
  ),
};
