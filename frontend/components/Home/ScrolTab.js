import React, { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { SIZES, COLORS, FONTS } from '../../constants'

export default function ScrolTab({ tabList, setSelectedCat , selectedCat }) {
    return (
        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        >
            {
                tabList.map((item, index) => (
                    <TouchableOpacity
                        style={{ marginHorizontal: SIZES.padding, paddingBottom: SIZES.padding }}
                        onPress={() => {
                            setSelectedCat(item)
                        }}
                        key={index}
                    >
                        <Text style={{ color: COLORS.secondary, ...FONTS.body2 }}>{item}</Text>
                        {
                            selectedCat == item &&
                            <View style={{ alignItems: 'center', marginTop: SIZES.base }}>
                                <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.blue }}></View>
                            </View>
                        }
                    </TouchableOpacity>
                ))
            }

        </ScrollView>
    )
}
