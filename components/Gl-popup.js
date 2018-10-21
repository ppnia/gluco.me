import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TextInput } from 'react-native';
import { InstantSearch, Index, connectInfiniteHits, connectSearchBox, RefinementList } from 'react-instantsearch-native';
import algoliasearch from 'algoliasearch';

export default class GIPopup extends Component {

    constructor(props){
        super(props);
           this.state={
                Dish:"",
                Ingredients:[],
                GlycemicIndexMap: {},
            };

        this.client = algoliasearch('8DX0VZ97Y0', 'ac3472f8d20d6ffb3b94b745a4aa728a');
        this.index = this.client.initIndex('glycemic_index');
         }

       componentDidMount(){
           this.setState({
               ... this.state,
               Dish: this.props.Dish,
               Ingredients: this.props.Ingredients
           });
       }


    render() {

        for (let i = 0; i < this.state.Ingredients.length; i++) {
            console.log(this.state.Ingredients.length);
            console.log(this.state.Ingredients[i]);
            var ingredient = this.state.Ingredients[i];
            this.index.search({
                query: this.state.Ingredients[i]
            },
                function searchDone(err, content) {
                    if (err) throw err;
                    //  this.glycemicIndexMap.ingredient = content.hits[0].GI;
                    // this.glycemicIndexMap = this.glycemicIndexMap.push('hi');
                    //  const object2 = Object.assign({c: 4, d: 5}, object1);
                    // this.setState({
                    //     ... this.state,
                    //     GlycemicIndexMap: { ...this.state.GlycemicIndexMap, ingredient: content.hits[0].GI },
                    // });
                });
        }

        // console.log(this.state.GlycemicIndexMap);
        return (
            <View style={styles.container}>
                <Text>Hello!!!!</Text>
                <Text>
                    This is the popup for {this.props.Dish} 🎉! </Text>
                <Text>The ingredients are ... {JSON.stringify(this.props.Ingredients)}</Text>
            </View>
        );
    }
}



const Hits = connectInfiniteHits(({ hits, hasMore, refine }) => {

    /* if there are still results, you can
    call the refine function to load more */
    const onEndReached = function () {
        if (hasMore) {
            refine();
        }
    };

    return (
        <FlatList
            data={hits}
            onEndReached={onEndReached}
            keyExtractor={(item, index) => item.objectID}
            renderItem={({ item }) => {
                return (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flex: 1 }}>
                            <Text>
                                {item.primary}
                            </Text>
                            <Text>
                                {item.GI}
                            </Text>
                        </View>
                    </View>
                );
            }}
        />
    );
});

const SearchBox = connectSearchBox(( { refine, currentRefinement }) => {

    return (
        <View>
            <Text>{text => refine(text)}</Text>
        <TextInput
            style={styles.searchBox}
            onChangeText={text => refine(text)}
            value={currentRefinement}
            placeholder={'Search a product...'}
            clearButtonMode={'always'}
            spellCheck={false}
            autoCorrect={false}
            autoCapitalize={'none'}
        />
        </View>
    );
});


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 50
    },
    searchBox: {
        height: 60,
        borderWidth: 1,
        padding: 10,
        margin: 10,
        flex: 1,
    }
});