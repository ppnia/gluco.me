import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TextInput } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import { InstantSearch, connectInfiniteHits, connectSearchBox } from 'react-instantsearch-native';

import glycoReducer from './glyco-reducer';

const client = axios.create({
  baseURL: 'https://api.github.com',
  responseType: 'json'
});

const store = createStore(glycoReducer, applyMiddleware(axiosMiddleware(client)));

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>

          <Text>Hello!</Text>
          <InstantSearch
          appId="8DX0VZ97Y0"
          apiKey="ac3472f8d20d6ffb3b94b745a4aa728a"
          indexName="glycemic_index"
        >
          <Text>
            Congrats 🎉! Your application is now connected to Algolia!
          </Text>
          {/* <View> */}
     <SearchBox/>
        {/* </View> */}
        <Hits/>
        </InstantSearch>
 
  </View>
      </Provider>
    );
  }
}



const Hits = connectInfiniteHits(({ hits, hasMore, refine }) => {

  /* if there are still results, you can
  call the refine function to load more */
  const onEndReached = function() {
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
            {/* <Image
              style={{ height: 100, width: 100 }}
              source={{ uri: item.image }}
            /> */}
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