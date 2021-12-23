import React from 'react'
import { View, Text, ImageBackground } from 'react-native'
import { COLORS, FONTS, SIZES } from '../../constants';

export default function Info({ route }) {
    let { itemInfo } = route.params;
    return (
        <View style={{ flex: 1 }}>
            {
                itemInfo &&
                <ImageBackground
                    source={itemInfo.image}
                    resizeMethod="cover"
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <View style={{
                        position: "absolute",
                        top: "5%",
                        left: "15%",
                        borderRadius: 80,
                        backgroundColor: COLORS.transparentLightGray1,
                        height: 40,
                        width: 40,
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <View style={{
                            borderRadius: 20,
                            backgroundColor: COLORS.blue,
                            height: 10,
                            width: 10,
                        }}>
                        </View>
                    </View>
                    <View style={{
                        position: "absolute",
                        top: "3%",
                        left: "30%",
                        padding: SIZES.radius * 1.5,
                        backgroundColor: COLORS.transparentLightGray1,
                        width: '50%',
                        borderRadius: 10
                    }}>
                        <View style={{
                            flex: 2
                        }}>
                            <Text style={{ color: COLORS.darkGray, ...FONTS.h3 }}>
                                {itemInfo.productName}
                            </Text>
                        </View>
                        <View style={{
                            flex: 1.5,
                            alignItems: "flex-end",
                            justifyContent: "flex-end",

                        }}>
                            <Text style={{
                                color: COLORS.darkGreen,
                                ...FONTS.h3
                            }}>
                                ${itemInfo.price}
                            </Text>
                        </View>
                    </View>
                    <View style={{
                        position: 'absolute',
                        bottom: "20%",
                        left: SIZES.padding,
                        right: SIZES.padding
                    }}>
                        <Text style={{
                            color: COLORS.lightGray2,
                            ...FONTS.body2
                        }}>
                            Furniture
                        </Text>
                        <Text style={{
                            marginTop: SIZES.radius,
                            color: COLORS.white,
                            ...FONTS.h1
                        }}>
                            {itemInfo.productName}
                        </Text>
                    </View>
                </ImageBackground>
            }
        </View>
    )
}
