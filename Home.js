import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import GIPopup from './components/Gl-popup';

export default class Home extends React.Component {

  // async componentWillMount()
  // {
  //   const{ status } = await Permissions.askAsync(Permissions.CAMERA);
  //   this.setState({hasCameraPermission: status === 'granted'});
  // }

  render() {
    // const { hasCameraPermission } = this.state;
    // if (hasCameraPermission === null) {
    //   return <View />;
    // } else if (hasCameraPermission === false) {
    //   return <Text>No access to camera</Text>;
    // } else {
      return (
        <View style={{ flex: 1 }}>
        <GIPopup Dish="Lasagna" Ingredients={["Spinach", "Milk"]}/>
        </View>
      );
  //   }
  }
}

