import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { Camera, Permissions } from 'expo';

export default class CameraView extends React.Component{
    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.Back,
    };

    async componentWillMount()
    {
        const{ status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({hasCameraPermission: status === 'granted'});
    }

    render()
    {
        // const { hasCameraPermission } = this.state;
        // if (hasCameraPermission === null){
        //     return <View/>;
        // } else if (hasCameraPermission === false){
        //     return <Text>No access to camera</Text>;
        // } else {
        //     return (

        //     ); 
        // }
        

    }
}