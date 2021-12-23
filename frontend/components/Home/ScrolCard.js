import React from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import { COLORS, FONTS, SIZES } from '../../constants'

export default function ScrolCard({ navigation, productList, selectedCat }) {
    return (
        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        >
            {
                productList.filter(item => item.category ==selectedCat ).map((item, index) => (
                   <TouchableOpacity
                        style={{
                            marginRight: SIZES.padding,
                            marginLeft: index == 0 ? SIZES.padding : 0,
                        }}
                        onPress={() => navigation.navigate('ItemDetail', { itemInfo: item })}
                        key={index}
                    >
                        <View style={{
                            width: SIZES.width / 2,
                            flex: 1
                        }}>
                            <Image
                                source={item.image}
                                resizeMethod="cover"
                                style={{ width: '100%', height: "100%", borderRadius: SIZES.radius * 2 }}
                            />
                            <View
                                style={{
                                    position: "absolute",
                                    top: 15,
                                    left: "10%",
                                    right: "10%"
                                }}>
                                <Text
                                    style={{
                                        color: COLORS.lightGray2,
                                        ...FONTS.h3
                                    }}>
                                    Furniture
                                </Text>
                                <Text style={{
                                    marginTop: SIZES.base,
                                    color: COLORS.white,
                                    ...FONTS.h2
                                }}>
                                    {item.productName}
                                </Text>
                            </View>
                            <View style={{
                                position: "absolute",
                                bottom: 20,
                                left: 30,
                                borderRadius: 15,
                                paddingVertical: 10,
                                paddingHorizontal: 15,
                                backgroundColor: COLORS.transparentLightGray
                            }}>
                                <Text
                                    style={{
                                        ...FONTS.h2
                                    }}>
                                    ${item.price}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))
            }
        </ ScrollView>
    )
}
