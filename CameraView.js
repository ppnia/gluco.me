import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { Camera, Permissions } from 'expo';

export default class CameraView extends React.Component{
    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.Back,
        imageuri:"",
    };

    async componentWillMount()
    {
        const{ status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({hasCameraPermission: status === 'granted'});
    }

    snap = async() => {
        if(this.camera){
            let photo = await this.camera.takePictureAsync();
            if(photo){
                this.setState({ imageuri: photo.uri });
                console.log(imageuri);
            }
            console.log("asdf");
        }
    };

    render()
    {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null){
            return <View/>;
        } else if (hasCameraPermission === false){
            return <Text>No access to camera</Text>;
        } else {
            return (
                    <View style={{ flex: 1 }}>
                        {this.state.imageuri != "" ? (
                            
                            <Image
                                source={{
                                    uri:this.state.imageuri
                                }}
                                resideMode="contain"
                            />
                        ) : (
                            <Camera style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center'}} type={this.state.type} ref={ref=>{this.camera = ref;}}>
                            <View 
                                style={{
                                    flex: 1,
                                    backgroundColor: 'transparent',
                                    flexDirection: 'row',
                                }}>
                                <TouchableOpacity
                                    style={{
                                        flex: 0.1, 
                                        alignSelf: 'flex-end',
                                        alignItems: 'center',
                                    }}
                                    onPress={() => {
                                        this.snap
                                    }}>
                                    <Text style={{ fontSize: 18, marginBottom: 10, color: 'white'}}>
                                    {' '}Capture{' '}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            </Camera>
                        )}
                    </View> 
            ); 
        }
        

    }
}