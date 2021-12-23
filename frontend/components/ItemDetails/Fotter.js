import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, Image, Text } from 'react-native'
import { COLORS, FONTS, icons, SIZES } from '../../constants'
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Fotter({ navigation, route }) {
    const [token, settoken] = useState(null)
    const [name, setname] = useState(null)
    const [admin, setadmin] = useState(null)
    let { itemInfo } = route.params;
    const dispatch = useDispatch()
    const selectItem = () => {
        dispatch({
            type: "ADD_ITEM",
            payload: {
                ...itemInfo
            }
        })
        navigation.push('Home')
    }
    useEffect(() => {
        AsyncStorage.getItem("token").then(token => settoken(token))
        AsyncStorage.getItem("Name").then(name => setname(name))
        AsyncStorage.getItem("admin").then(admin => setadmin(admin))
    }, [])
    return (
        <View style={{
            position: 'absolute',
            bottom: '5%',
            left: SIZES.padding,
            right: SIZES.padding,
            height: 70,
            backgroundColor: COLORS.white,
            borderRadius: 35
        }}>
            <View style={{
                flexDirection: 'row',
                alignItems: "center",
                justifyContent: "center",
                height: "90%"
            }}>
                <View style={{
                    flex: 2,
                    alignItems: "center",
                    justifyContent: 'center'
                }}>
                    <TouchableOpacity
                        onPress={() =>
                            (admin == "true")
                                ? navigation.navigate('User')
                                : navigation.navigate('Home')
                        }
                    >
                        <Image
                            source={icons.dashboard}
                            style={{
                                tintColor: COLORS.gray,
                                width: 25,
                                height: 25
                            }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <TouchableOpacity style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 50,
                        width: 50,
                        borderRadius: 10,
                        backgroundColor: COLORS.primary
                    }}
                        onPress={() =>
                            token
                                ? selectItem()
                                : navigation.navigate('Registration')
                        }
                    >
                        <Image
                            source={icons.plus}
                            style={{
                                tintColor: COLORS.white,
                                height: 20,
                                width: 20
                            }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{
                    flex: 2,
                    alignItems: 'center',
                    justifyContent: 'center',


                }}>
                    <TouchableOpacity
                        onPress={() =>
                            token
                                ? navigation.navigate('Home')
                                : navigation.navigate('Registration')
                        }
                    >
                        <Image
                            source={icons.user}
                            style={{
                                tintColor: token ? COLORS.primary : COLORS.gray,
                                width: 25,
                                height: 25
                            }}
                        />
                    </TouchableOpacity>

                </View>
            </View>
            <View style={{
                justifyContent: "flex-start",
                alignItems: "flex-end",
                position: "absolute",
                bottom: 2,
                width: "100%",
                paddingRight: 25,
            }}>
                {name &&
                    <Text style={{
                        ...FONTS.body4,
                        color: COLORS.blue
                    }}>Hi {name} </Text>
                }
            </View>
        </View>
    )
}
