import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Image, Text } from 'react-native'
import { COLORS, icons, SIZES } from '../../constants'
import { useSelector } from 'react-redux';

export default function Header({ navigation }) {
    const { items } = useSelector(state => state.cartReducer)
    const [order, setorders] = useState(0)
    useEffect(() => {
        setorders(items.length)
    }, [items])
    return (
        <View style={{ paddingHorizontal: SIZES.padding }}>
            <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1, alignItems: "flex-start" }}>
                    <TouchableOpacity
                        onPress={() => console.log("Menu Cliked")}
                    >
                        <Image
                            source={icons.menu}
                            resizeMethod="contain"
                            style={{
                                width: 25,
                                height: 25
                            }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{
                    flex: 1,
                    alignItems: "flex-end",
                }}>
                    <View style={{
                        flexDirection: "row",
                    }}>
                        {
                            order != 0 &&
                            <View style={{
                                backgroundColor: "red",
                                justifyContent: "center",
                                alignItems: "center",
                                padding: 5,
                                height: 20,
                                minWidth: 30,
                                borderRadius: 50,
                                position: "absolute",
                                right: 14
                            }}>
                                <Text style={{
                                    fontWeight: "bold",
                                    color: COLORS.white
                                }}>{order}</Text>
                            </View>
                        }
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Mycart')}
                        >
                            <Image
                                source={icons.cart}
                                resizeMethod="contain"
                                style={{
                                    width: 25,
                                    height: 25
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}
