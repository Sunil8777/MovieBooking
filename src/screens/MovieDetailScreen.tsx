import * as React from 'react';
import { Text, View, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { movieCastDetails, movieDetails } from '../api/apicalls'
import { SPACING,COLORS } from '../theme/theme';

const getMovieDetails = async (movieid: number) => {
  try {
    let response = await fetch(movieDetails(movieid))
    let json = await response.json();
    return json;
  } catch (error) {
    console.error("Something went wrong in getmoviesDetails", error)
  }
};

const getMovieCastDetails = async (movieid: number) => {
  try {
    let response = await fetch(movieCastDetails(movieid))
    let json = await response.json();
    return json;
  } catch (error) {
    console.error("Something went wrong in getmoviesCastDetails", error)
  }
};

const MovieDetailScreen = ({ navigation, route }: any) => {

  const [movieData, setMovieData] = useState(undefined);
  const [movieCastData, setmovieCastData] = useState<any>(undefined);

  useEffect(() => {
    (async () => {
      const tempmovieData = await getMovieDetails(route.params.movieid);
      setMovieData(tempmovieData);
    })();

    (async () => {
      const tempmovieCastData = await getMovieCastDetails(route.params.movieid);
      setmovieCastData(tempmovieCastData);
    })();
  }, [])

  if (movieData == undefined && movieData == null && movieCastData == undefined && movieCastData == null){
    return(
      <ScrollView style={styles.container} bounces={false}
        contentContainerStyle={styles.scrollViewContainer}
      >
        <View>
          
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={COLORS.Orange} />
        </View>
      </ScrollView>
    )
  }
    return (
      <View style={styles.container}>
        <Text></Text>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    display:'flex',
    flex:1,
    backgroundColor:COLORS.Black
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollViewContainer: {
    flex: 1
  },
});
export default MovieDetailScreen;
