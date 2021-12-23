import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native'
import { icons, COLORS, FONTS, SIZES } from '../../constants'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Divider = () => (
    <View style={{ width: 1, paddingVertical: 18 }}>
        <View style={{ flex: 1, borderLeftColor: COLORS.lightGray, borderLeftWidth: 1 }}>
        </View>
    </View>
)
export default function Header({ navigation, setSelectedComponent }) {
    const [name, setname] = useState(null)
    AsyncStorage.getItem("Name").then(name => setname(name))
    return (
        <View>
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 20
            }}>
                <View style={{
                    height: 20,
                    margin: 10,
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
                <View>
                    <Text style={{
                        color: COLORS.primary,
                        ...FONTS.body2
                    }}> Hi {name}</Text>
                </View>
            </View>
            <View style={{
                flex: 1,
                justifyContent: "center",
                padding: SIZES.padding,
            }}>
                <View style={{
                    flexDirection: "row",
                    height: 50,
                    backgroundColor: COLORS.secondary,
                    borderRadius: SIZES.radius
                }}>
                    <TouchableOpacity
                        style={{ flex: 1 }}
                        onPress={() => setSelectedComponent("Your Orders")}
                    >
                        <View style={{
                            flex: 1,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-evenly",
                        }}>
                            <Image
                                source={icons.dashboard}
                                resizeMode="contain"
                                style={{
                                    tintColor: COLORS.primary,
                                    width: 15,
                                    height: 15,
                                }}
                            />
                            <Text
                                style={{
                                    marginLeft: SIZES.base,
                                    ...FONTS.body3,
                                    color: COLORS.white,

                                }}>
                                Your Orders
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <Divider />
                    <TouchableOpacity
                        style={{ flex: 1 }}
                        onPress={() => setSelectedComponent("New Product")}
                    >
                        <View style={{
                            flex: 1,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-evenly",
                        }}>
                            <Image
                                source={icons.dashboard}
                                resizeMode="contain"
                                style={{
                                    tintColor: COLORS.primary,
                                    width: 15,
                                    height: 15,
                                }}
                            />
                            <Text
                                style={{
                                    marginLeft: SIZES.base,
                                    ...FONTS.body3,
                                    color: COLORS.white
                                }}>
                                New Product
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
