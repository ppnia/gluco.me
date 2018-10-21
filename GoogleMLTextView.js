import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, ImageBackground } from 'react-native';
import AppNavigator from './AppNavigator';
import RNTesseractOcr from 'react-native-tesseract-ocr';
import GIPopup from './components/Gl-popup';

const tessOptions = {
    whitelist: null,
    blacklist: '1234567890\'!"#$%&/()={}[]+*-_:;<>'
};

export default class GoogleMLTextView extends React.Component {

    constructor() {
        super();
        this.state = {
            Dish: "",
            Ingredients: []
        }
    }

    goRecognize() {

        console.log(this.props.navigation.state.params.urii);
        this.setState({ Dish: 'lasagna', Ingredients: ['milk', 'spinach'] });
        // RNTesseractOcr.recognize(this.props.navigation.state.params.urii,
        //     'LANG_ENGLISH', tessOptions)
        //     .then((result) => {
        //         this.setState({ ocrResult: result });
        //         console.log("OCR Result: ", result);
        //     })
    }

    render() {
        let popup;

        if (this.state.Dish == "" || this.state.Ingredients.length == 0) {
            popup = <Text>none!</Text>
        } else {
            popup = <GIPopup Dish={this.state.Dish} Ingredients={this.state.Ingredients} />
        }

        return (
            <View style={{ flex: 1 }}>
                <Button onPress={this.goRecognize.bind(this)}
                    title="Help Me!"
                />
                {popup}

            </View>);
    }

}


