import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { icons, COLORS, SIZES, FONTS } from '../../constants'
export default function Header({ navigation }) {
    return (
        <View>
            <View style={{
                height: 20,
                margin: 10,
                paddingLeft: 20
            }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        source={icons.arrow}
                        style={{
                            tintColor: COLORS.blue,
                            width: 25,
                            height: 25,
                        }}
                    />
                </TouchableOpacity>
            </View>
            <View style={{
                marginTop: SIZES.padding,
                marginHorizontal: SIZES.padding,
                justifyContent: "center",
                alignItems: "center",
                borderBottomColor: COLORS.blue,
                borderBottomWidth: 1
            }}>
                <Text style={{ color: COLORS.black, ...FONTS.largeTitle }}>Your Cart</Text>
            </View>
        </View>
    )
}
