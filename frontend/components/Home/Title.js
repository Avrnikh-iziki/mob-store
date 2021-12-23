import React from 'react'
import { View, Text } from 'react-native'
import { COLORS, FONTS, SIZES } from '../../constants'

export default function Title({ title }) {
    return (
        <View style={{
            marginTop: SIZES.padding,
            marginHorizontal: SIZES.padding
        }}>
            <Text style={{ color: COLORS.black, ...FONTS.largeTitle }}>Colection of</Text>
            <Text style={{ color: COLORS.black, ...FONTS.largeTitle }}>{title}</Text>
        </View>
    )
}
