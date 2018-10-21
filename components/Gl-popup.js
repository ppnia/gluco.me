import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TextInput } from 'react-native';
import { InstantSearch, Index, connectInfiniteHits, connectSearchBox } from 'react-instantsearch-native';
import algoliasearch from 'algoliasearch';

export default class GIPopup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Dish: "",
            Ingredients: [],
            GlycemicIndexMap: [],
        };

        this.client = algoliasearch('8DX0VZ97Y0', 'ac3472f8d20d6ffb3b94b745a4aa728a');
        this.index = this.client.initIndex('glycemic_index');
    }

    componentDidMount() {
        this.setState({
            ... this.state,
            Dish: this.props.Dish,
            Ingredients: this.props.Ingredients
        });


    }

    componentDidUpdate(prevProps, prevState) {

        if (prevProps.Ingredients.length != this.props.Ingredients.length || this.state.GlycemicIndexMap.length == 0) {

            for (let i = 0; i < this.state.Ingredients.length; i++) {
                var ingredient = this.state.Ingredients[i];
                var glyMap = this.state.GlycemicIndexMap;
                this.index.search({
                    query: this.state.Ingredients[i]
                }, (err, content) => {
                    if (err) throw err;

                    glyMap = glyMap.concat(content.hits[0].GI);
                    this.setState({ GlycemicIndexMap: glyMap });
                    return;

                });
            }
        }
    }


    render() {
        return (
            <View style={styles.container} >
                <Text>
                    This is the popup for {this.props.Dish} 🎉! </Text>
                <Text>The ingredients for {this.props.Dish} are ... {JSON.stringify(this.props.Ingredients)}</Text>
                <Text>The Glycemic Indices are ... {JSON.stringify(this.state.GlycemicIndexMap)}</Text>

                <Text>Want to know other glycemic indices?</Text>

                <InstantSearch appId="8DX0VZ97Y0"
                    apiKey="ac3472f8d20d6ffb3b94b745a4aa728a"
                    indexName="glycemic_index">
                    <SearchBox />
                    <Hits />
                </InstantSearch>
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
                                {item.primary} ({item.GI})
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
        flex: 1
    },
    searchBox: {
        height: 60,
        borderWidth: 1,
        padding: 10,
        margin: 10,
        flex: 1,
    }
});