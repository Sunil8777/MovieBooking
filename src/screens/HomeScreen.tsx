import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  StatusBar,
  FlatList
} from 'react-native';
import { COLORS, SPACING } from '../theme/theme'
import { upcomingMovies, nowPlayingMovies, popularMovies, baseImagePath, searchMovies } from '../api/apicalls';
import InputHeader from '../components/InputHeader';
import CategoryHeader from '../components/CategoryHeader';
import SubMoviecard from '../components/SubMovieCard';
import MovieCard from '../components/MovieCard';

const { width, height } = Dimensions.get('window');

const getnowPlayingMoviesList = async () => {
  try {
    let response = await fetch(nowPlayingMovies);
    let json = await response.json();
    return json;
  } catch (error) {
    console.error("Something went wrong in getnowPlayingMovieList function", error);
  }
};

const getupcomingMoviesList = async () => {
  try {
    let response = await fetch(upcomingMovies);
    let json = await response.json();
    return json;
  } catch (error) {
    console.error("Something went wrong in getupcomingMoviesList function", error);
  }
};

const getpopularMoviesList = async () => {
  try {
    let response = await fetch(popularMovies);
    let json = await response.json();
    return json;
  } catch (error) {
    console.error("Something went wrong in getpopularMoviesList function", error);
  }
};
const HomeScreen = ({ navigation }: any) => {
  const [nowPlayingMoviesList, setnowPlayingMoviesList] = useState(undefined);
  const [popularMoviesList, setpopularMoviesList] = useState(undefined);
  const [upcomingMoviesList, setupcomingMoviesList] = useState(undefined);

  useEffect(() => {
    (async () => {
      let tempnowPlaying = await getnowPlayingMoviesList();
      setnowPlayingMoviesList([{ id: 'dummy1' }, ...tempnowPlaying.results, { id: 'dummy2' }]);

      let temppopular = await getpopularMoviesList();
      setpopularMoviesList(temppopular.results);

      let tempupcoming = await getupcomingMoviesList();
      setupcomingMoviesList(tempupcoming.results);

    })();
  }, [])

  console.log(nowPlayingMoviesList)
  const searchMoviesFunction = () => {
    navigation.navigate('Search');
  };
  if (nowPlayingMoviesList == undefined && nowPlayingMoviesList == null && popularMoviesList == undefined && popularMoviesList == null && upcomingMoviesList == undefined && upcomingMoviesList == null) {
    return (
      <ScrollView style={styles.container} bounces={false}
        contentContainerStyle={styles.scrollViewContainer}
        >
        <View style={styles.inputHeaderContainer}>
          <InputHeader searchFunction={searchMoviesFunction} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={COLORS.Orange} />
        </View>
        <StatusBar hidden />
      </ScrollView>
    );
  }
  return (
    <ScrollView style={styles.container} bounces={false}
    >
      <StatusBar hidden />
      <View style={styles.inputHeaderContainer}>
        <InputHeader searchFunction={searchMoviesFunction} />
      </View>

      <CategoryHeader title={"NowPlaying"} />

      <FlatList horizontal
        data={nowPlayingMoviesList}
        keyExtractor={(item: any) => item.id}
        snapToInterval={width * 0.7 + SPACING.space_36}
        contentContainerStyle={styles.containerGap36}
        decelerationRate={0}
        renderItem={({ item, index }) => {
          if (!item.original_title) {
            return (
              <View style={{
                width: (width - (width * 0.7 + SPACING.space_36 * 2)) / 2
              }}>
              </View>
            )
          }
          return (
            <MovieCard
              shouldMarginatedAtEnd={true}
              cardFunction={() => {
                navigation.push('MovieDetails', { movieid: item.id });
              }}
              cardWidth={width * 0.7}
              isFirst={index == 0 ? true : false}
              isLast={index == nowPlayingMoviesList.length - 1 ? true : false}
              movietitle={item.original_title}
              imagePath={baseImagePath('w342', item.poster_path)}
              movievote_avg={item.vote_average}
              movievote_count={item.vote_count}
              genre={item.genre_ids}
            />
          )
        }}
      />
      <CategoryHeader title={"Popular"} />

      <FlatList horizontal
        data={popularMoviesList}
        keyExtractor={(item: any) => item.id}
        contentContainerStyle={styles.containerGap36}
        renderItem={({ item, index }) => (
          <SubMoviecard
            shouldMarginatedAtEnd={true}
            cardFunction={() => {
              navigation.push('MovieDetails', { movieid: item.imdbID });
            }}
            cardWidth={width / 3}
            isFirst={index == 0 ? true : false}
            isLast={index == popularMoviesList.length - 1 ? true : false}
            title={item.original_title}
            imagePath={baseImagePath('w342', item.poster_path)}
          />
        )}
      />
      <CategoryHeader title={'Upcoming'} />

      <FlatList horizontal
        data={upcomingMoviesList}
        keyExtractor={(item: any) => item.id}
        contentContainerStyle={styles.containerGap36}
        renderItem={({ item, index }) => (
          <SubMoviecard
            shouldMarginatedAtEnd={true}
            cardFunction={() => {
              navigation.push('MovieDetails', { movieid: item.id });
            }}
            cardWidth={width / 3}
            isFirst={index == 0 ? true : false}
            isLast={index == upcomingMoviesList.length - 1 ? true : false}
            title={item.original_title}
            imagePath={baseImagePath('w342', item.poster_path)}
          />
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: COLORS.Black,
  },
  scrollViewContainer: {
    flex: 1,
    height: 100
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_28,
  },
  containerGap36: {
    gap: SPACING.space_36,
  }
});
export default HomeScreen;
