import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, BORDERRADIUS, FONTFAMILY, FONTSIZE } from '../theme/theme';
import Customicon from './Customicon';

const InputHeader = (props:any) => {
    const [searchText, setSearchText] = useState('');
    return (
        <View style={styles.inputBox}>
            <TextInput style={styles.textInput}
                onChangeText={(text) => setSearchText(text)}
                placeholder='Search your Movies...'
                placeholderTextColor={COLORS.WhiteRGBA32}
                value={searchText}
            />
            <TouchableOpacity style={styles.searchIcon} onPress={()=> props.searchFunction(searchText)}>
                <Customicon name='search' color={COLORS.Orange} size={FONTSIZE.size_20} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    inputBox: {
        display: 'flex',
        paddingVertical: SPACING.space_8,
        paddingHorizontal: SPACING.space_24,
        borderWidth: 2,
        borderColor: COLORS.WhiteRGBA15,
        borderRadius: BORDERRADIUS.radius_25,
        flexDirection: 'row'
    },
    textInput: {
        width: '90%',
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_14,
        color: COLORS.White,
    },
    searchIcon:{
        justifyContent:'center',
        alignItems:'center',
        padding:SPACING.space_10,
    }
});
export default InputHeader;
