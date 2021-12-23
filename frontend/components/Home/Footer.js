import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { COLORS, FONTS, icons, images, SIZES } from '../../constants'

export default function Footer({ setSelectedCat }) {
    return (
        <View
            style={[styles.shadow, {
                flexDirection: 'row',
                marginHorizontal: SIZES.padding,
                padding: SIZES.radius,
                height: 100,
                borderRadius: 20,
                backgroundColor: COLORS.lightGray2
            }]}
        >
            <View style={{
                width: 50,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.lightGray2,
                borderRadius: 20
            }}>
                <Image
                    source={images.sofa}
                    resizeMethod='contain'
                    style={{
                        width: "60%",
                        height: "60%"
                    }}
                />
            </View>
            <View style={{
                flex: 1,
                marginLeft: SIZES.radius,
                justifyContent: "center"
            }}>
                <Text style={{ ...FONTS.h2 }}>Special Offer</Text>
                <Text style={{ ...FONTS.body3 }}>Adding to you Cart</Text>
            </View>
            <View style={{
                marginRight: SIZES.radius,
                alignItems: "center",
                justifyContent: "center"
            }}>
                <TouchableOpacity
                    style={{
                        backgroundColor: COLORS.primary,
                        justifyContent: "center",
                        alignItems: "center",
                        height: "70%",
                        width: 40,
                        borderRadius: 10
                    }}
                    onPress={() => setSelectedCat("Special Offre")}
                >
                    <Image
                        source={icons.chevron}
                        resizeMethod="contain"
                        style={{
                            height: "50%",
                            width: "50%"
                        }}
                    />
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
    }
})