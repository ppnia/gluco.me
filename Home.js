import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import GIPopup from './components/Gl-popup';

export default class Home extends React.Component {
  render() 
  {
    return(
      <View style={{ flex: 1 }}>
        <Button
          onPress={() =>
              this.props.navigation.navigate('Camera')
            }
          title="Help Me!"
          color="#841584"
          accessibilityLabel="Help me scan this menu."
        />
      </View>
    );
  }
}

