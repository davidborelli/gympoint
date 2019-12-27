import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';

export default function HelpOrders() {
  return <Background />;
}

HelpOrders.navigationOptions = ({ navigation }) => ({
  title: 'Selecione',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Dashboard');
      }}
    >
      <Icon name="chevron-left" size={20} color="#999" />
    </TouchableOpacity>
  ),
});
