import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, ImageBackground } from 'react-native';
import AppNavigator from './AppNavigator';
import RNTesseractOcr from 'react-native-tesseract-ocr';

const tessOptions = {
    whitelist: null,
    blacklist: '1234567890\'!"#$%&/()={}[]+*-_:;<>'
};

export default class GoogleMLTextView extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <View>
                <Button
                    onPress={
                        RNTesseractOcr.recognize(this.props.navigation.state.params.urii,
                            'LANG_ENGLISH', tessOptions)
                            .then((result) => {
                                this.setState({ ocrResult: result });
                                console.log("OCR Result: ", result);
                            })
                            .catch((err) => {
                                console.log("OCR Error: ", err);
                            })
                            .done()
                    }
                    title="Help Me!"
                />
            </View>);
    }

}


