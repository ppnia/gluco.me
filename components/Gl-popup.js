import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TextInput } from 'react-native';
import { InstantSearch, Index, connectInfiniteHits, connectSearchBox, RefinementList } from 'react-instantsearch-native';
import algoliasearch from 'algoliasearch';

export default class GIPopup extends Component {

    constructor(props) {
        super(props);
        // var c = algoliasearch('8DX0VZ97Y0', 'ac3472f8d20d6ffb3b94b745a4aa728a');
        this.state = {
            Dish: "",
            Ingredients: [],
            GlycemicIndexMap: [],
            // Client: c,
            // Index: c.initIndex('glycemic_index')
        };

        // this.state = {
        //     ,
        //     Index: Client.initIndex('glycemic_index')
        // }

        this.client = algoliasearch('8DX0VZ97Y0', 'ac3472f8d20d6ffb3b94b745a4aa728a');
        this.index = this.client.initIndex('glycemic_index');
        // this.updateMap = this.updateMap.bind(this);
    }

    componentDidMount() {
        this.setState({
            ... this.state,
            Dish: this.props.Dish,
            Ingredients: this.props.Ingredients
        });


    }

    componentDidUpdate(prevProps, prevState) {
        console.log(' test');
        // console.log(this.state);
        console.log(prevProps);
        console.log(this.props);

        if (prevProps.Ingredients.length != this.props.Ingredients.length || this.state.GlycemicIndexMap.length == 0) {
            console.log('change');
    
        for (let i = 0; i < this.state.Ingredients.length; i++) {
            // console.log('loop');

            var ingredient = this.state.Ingredients[i];
            var glyMap = this.state.GlycemicIndexMap;
            this.index.search({
                query: this.state.Ingredients[i]
            }, (err, content) => {
                    if (err) throw err;

                    // console.log(content.hits[0].GI);
                    // console.log(this.state);
                    // 
                    // console.log(hi);
                    glyMap = glyMap.concat(content.hits[0].GI);
                    // console.log(glyMap);

                    this.setState({GlycemicIndexMap: glyMap});

                    // console.log(This.GlycemicIndexMap)
                    // this.updateState(ingredient, content.hits[0].GI);

                    return;

                });

        }
    }
    }

    // static getDerivedStateFromProps(props, state){
    //     newState = { ... state,
    //                 Dish: props.Dish,
    //                 Ingredients: props.Ingredients}

    //                 for (let i = 0; i < props.Ingredients.length; i++) {
    //                     console.log('hi');

    //                     //                     var glyMap = []
    //                                         var ingredient = props.Ingredients[i];
    //                                         state.Index.search({
    //                                             query: props.Ingredients[i]
    //                                         },
    //                                             function searchDone(err, content) {
    //                                                 if (err) throw err;

    //                                                 // console.log(this.state);
    //                                                 // 
    //                                                 // console.log(hi);
    //                                                 // glyMap = glyMap.concat(content.hits[0].GI);
    //                                                 // console.log(glyMap);

    //                                                 // console.log(This.GlycemicIndexMap)
    //                                                 // this.updateState(ingredient, content.hits[0].GI);

    //                                                 return;

    //                                             })

    //                     //                         this.setState({
    //                     //                             GlycemicIndexMap: glyMap
    //                     //                         })

    //                     //                         console.log(this.state.GlycemicIndexMap);
    //                     //                 }

    //                 }
    //     return newState;
    // }



    render() {
        // this.updateMap();


        // this.index.search({
        //     query: this.state.Ingredients[i]
        // }).then(res => {
        //     // console.log(res);
        //     var glyMap = [... this.state.GlycemicIndexMap]
        //     glyMap.push({ingredient: res.hits[0].GI});
        //     this.setState({
        //         GlycemicIndexMap: glyMap
        //     })
        return (
            <View style={styles.container} >
                <Text>Hello!</Text>
                <Text>
                    This is the popup for {this.props.Dish} 🎉! </Text>
                <Text>The ingredients are ... {JSON.stringify(this.props.Ingredients)}</Text>
                <Text>{JSON.stringify(this.state.GlycemicIndexMap)}</Text>
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

const SearchBox = connectSearchBox(({ refine, currentRefinement }) => {

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