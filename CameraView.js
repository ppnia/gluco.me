import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, ImageBackground } from 'react-native';
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
        console.log("xxxx");
        if(this.camera){
            let photo = await this.camera.takePictureAsync();
            if(photo){
                this.setState({ imageuri: photo.uri });
                console.log(photo.uri);
            }
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
                    <View style={styles.CameraView}>
                        {this.state.imageuri != "" ? ( 
                            <ImageBackground
                                source={{
                                    uri:this.state.imageuri
                                }}
                                resideMode="contain"
                                style={styles.uploadedImage}
                            >
                            <View 
                                style={styles.captureButtonView}>
                                <Button
                                    style={styles.cameraButtons}
                                    onPress={() =>
                                        this.props.navigation.navigate('GoogleEye', {urii:this.state.imageuri})
                                      }
                                      title="Help Me!"
                                />
                            </View>
                            </ImageBackground> 
                        ) : (
                            <Camera style={styles.camera} type={this.state.type} ref={ref=>{this.camera = ref;}}>
                            <View 
                                style={styles.captureButtonView}>
                                <TouchableOpacity
                                    style={styles.cameraButtons}
                                    onPress={
                                        this.snap
                                    }>
                                    <Text style={{ fontSize: 18, marginBottom: 5, color: 'white'}}>
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

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#1dd1a1",
      alignItems: "center",
      justifyContent: "flex-start"
    },
    switchview: {
      marginTop: 50,
      backgroundColor: "white",
      padding: 10,
      alignItems: "center",
      borderRadius: 5,
      marginBottom: 5
    },
    switch: {
      padding: 5
    },
    cameraview: {
      height: 400,
      width: "100%",
      backgroundColor: "white",
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center"
    },
    camera: {
      height: "100%",
      width: "100%",
      backgroundColor: "white",
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center"
    },
    camerabuttonview: {
      height: "20%",
      backgroundColor: "transparent"
    },
    cameraButtons: {
      borderColor: "#fff",
      borderWidth: 2,
      padding: 10,
      borderRadius: 5,
    },
    captureButtonView: {
      height: 200,
      marginBottom: -600,
    },
    buttonsView: {
      height: 200,
      width: "100%",
      flexDirection: "row",
      justifyContent: "center"
    },
    uploadedImage: {
      height: "100%",
      width: "100%",
      padding: 10
    }
  });