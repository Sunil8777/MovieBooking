import * as React from 'react';
import { Text, View, StyleSheet, Dimensions, StatusBar, FlatList, Button } from 'react-native';
import { COLORS } from '../theme/theme';
import { useState } from 'react';
import { searchMovies,baseImagePath } from '../api/apicalls';
import { SPACING } from '../theme/theme';
import InputHeader from '../components/InputHeader';
const { width, height } = Dimensions.get('screen');
import SubMoviecard from '../components/SubMovieCard';
const SearchScreen = ({navigation}:any) => {

  const [searchList, setsearchList] = useState([]);

  const x =()=>{
    console.warn(searchList)
  }

  const searchMoviesFunction = async (name: string) => {
    try {
      let response = await fetch(searchMovies(name));
      let json = await response.json();
      setsearchList(json.results);
      
    } catch (error) {
      console.error("Something went wrong in searchMoviesFunction ",error);
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      
      <View>
        <FlatList 
          data={searchList}
          keyExtractor={(item: any) => item.id}
          numColumns={2}
          ListHeaderComponent={
            <View style={styles.inputHeaderContainer}>
              <InputHeader searchFunction={searchMoviesFunction} />
            </View>
          }
          contentContainerStyle={styles.centerContainer}
          renderItem={({ item, index }) => (
            <SubMoviecard
              shouldMarginatedAtEnd={false}
              shouldMarginatedAround={true}
              cardFunction={() => {
                navigation.push('MovieDetails', { movieid: item.id });
              }}
              cardWidth={width /2 - SPACING.space_12*2}
              title={item.original_title}
              imagePath={baseImagePath('w342', item.poster_path)}
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.Black,
    width,
  },
  inputHeaderContainer: {
    display:'flex',
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_28,
    marginBottom:SPACING.space_28 - SPACING.space_12
  },
  centerContainer:{
    alignItems:'center'
  }
});
export default SearchScreen;
