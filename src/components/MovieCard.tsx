import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, Button } from 'react-native';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import Customicon from './Customicon';
const genres: any = {
    28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentry',
    18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystry', 10749: 'Rommance',
    878: 'Science Fiction', 10770: 'Tv Movie', 53: 'Thriller', 10752: 'War', 37: 'Western'
}
const x = (prop: any) => {
    return (
        console.warn(prop)
    )
}
const MovieCard = (props: any) => {
    let rating = (props.movievote_avg).toFixed(1);

    return (
        <TouchableOpacity onPress={() => props.cardFunction()}>
            <View style={[styles.container,
            props.shouldMarginatedAtEnd
                ? props.isFirst
                    ? { marginLeft: SPACING.space_36 }
                    : props.isLast
                        ? { marginRight: SPACING.space_36 }
                        : {}
                : {},
            props.shouldMarginatedAround ? { margin: SPACING.space_12 } : {},
            { maxWidth: props.cardWidth },
            ]}>
                <Image
                    style={[styles.cardImage, { width: props.cardWidth }]}
                    source={{ uri: props.imagePath }}
                />
                <View>
                    <View style={styles.rateContainer}>

                        <Customicon name="star" style={styles.starIcon} />
                        <Text style={styles.vote}>
                            {rating} ({props.movievote_count})
                        </Text>
                    </View>
                </View>
                <Text numberOfLines={1} style={styles.textTitle}>{props.movietitle}</Text>
                <View style={styles.genreContainer}>
                    {
                        props.genre.map((item: any) =>{
                            return (
                                <View key ={item} style={styles.genreBox}>
                                    <Text style={styles.genreText}>{genres[item]}</Text>
                                </View>
                                )
                        })
                    }
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: COLORS.Black,
    },
    cardImage: {
        aspectRatio: 2 / 3,
        borderRadius: BORDERRADIUS.radius_20
    },
    textTitle: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_24,
        color: COLORS.White,
        textAlign: 'center',
        paddingVertical: SPACING.space_10,
    },
    rateContainer: {
        flexDirection: 'row',
        gap: SPACING.space_10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: SPACING.space_10
    },
    starIcon: {
        fontSize: FONTSIZE.size_20,
        color: COLORS.Yellow
    },
    vote: {
        fontSize: FONTSIZE.size_14,
        color: COLORS.White,
    },
    genreContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap:'wrap',
        gap: SPACING.space_20
    },
    genreBox: {
        borderColor: COLORS.WhiteRGBA50,
        borderWidth: 1,
        paddingVertical: SPACING.space_4,
        paddingHorizontal: SPACING.space_10,
        borderRadius: BORDERRADIUS.radius_25
    },
    genreText: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_10,
        color: COLORS.WhiteRGBA75
    }
});
export default MovieCard;