import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import { COLORS, FONTS, icons, SIZES } from '../../constants'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Axios from 'axios'

export default function Item({navigation}) {
    const [name, setname] = useState(null)
    const [token, settoken] = useState(null)
    const [id, setid] = useState(null)
    const [email, setemail] = useState(null)

    useEffect(() => {
        AsyncStorage.getItem("token").then(token => settoken(token))
        AsyncStorage.getItem("Name").then(name => setname(name))
        AsyncStorage.getItem("userid").then(id => setid(id))
        AsyncStorage.getItem("emai").then(email => setemail(email))

    }, [])

    const { items } = useSelector(state => state.cartReducer)
    const dispatch = useDispatch()

    const order = (item) => {
        const data =
        {
            item: [...item],
            Name: name,
            id: id,
            Email: email
        }
        Axios.post('https://mobileshopeapp.herokuapp.com/neworder', data)
            .then(res => {
                reset()
                navigation.navigate('Home')
            })
    }

    const reset = () => {
        dispatch({
            type: "RESET"
        })
    }
    const delItem = (item) => {
        dispatch({
            type: "DEL_ITEM",
            payload: {
                ...item
            }
        })
    }

    var total = 0
    const item = (item, index) => (
        <View
            key={index}
            style={{
                flexDirection: 'row',
                width: "100%",
                height: 100,
                marginBottom: 2,
                justifyContent: "space-between"
            }}>
            <View style={{
                flex: .3
            }}>
                <TouchableOpacity style={{
                    flex: 1
                }}>
                    <Image
                        source={item.image}
                        resizeMethod="cover"
                        style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: SIZES.radius,
                        }}
                    />
                </TouchableOpacity>
            </View>
            <View style={{
                flex: .7,
                backgroundColor: COLORS.primary,
                borderRadius: SIZES.radius,
                marginLeft: 2,
                flexDirection: "row"
            }}>
                <View
                    style={{
                        flex: .7,
                        justifyContent: "space-between",
                        paddingVertical: 3,
                        paddingHorizontal: 4,
                        alignItems: "center",
                    }}>
                    <Text
                        numberOfLines={2}
                        style={{
                            ...FONTS.body2,
                            textAlign: "center",
                            color: COLORS.white
                        }}>
                        {item.productName}
                    </Text>
                    <Text style={{
                        ...FONTS.body3,
                        color: COLORS.white
                    }}>
                        $ {item.price}
                    </Text>
                </View>

                <View style={{
                    flex: 0.3,
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <TouchableOpacity
                        onPress={() => delItem(item)}>
                        <Image
                            source={icons.dashboard}
                            resizeMethod="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: "red",
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )

    return (
        <>
            {items?.length != 0
                ? <View style={{
                    flex: 1,
                }}>
                    <ScrollView style={{
                        marginTop: 5,
                        padding: SIZES.padding
                    }}>
                        {
                            items?.map((el, index) => {
                                { total += parseInt(el.price) }
                                return item(el, index)
                            })
                        }
                    </ScrollView>
                    <View style={{
                        height: 60,
                        alignItems: "center",
                        justifyContent: "flex-end",
                        margin: SIZES.padding,
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.lightGray2,
                        flexDirection: "row"
                    }}>
                        <View style={{
                            flex: .7,
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <Text style={{
                                ...FONTS.body2,
                                fontWeight: "bold",
                                color: COLORS.secondary,
                            }}>Total :  {total} $</Text>
                        </View>
                        <View style={{
                            flex: .3,
                        }}>
                            <TouchableOpacity
                                style={{
                                    alignItems: "center"
                                }}
                                onPress={() =>
                                    token 
                                    ?order(items)
                                    :navigation.navigate('Registration')
                                }
                            >
                                <Image
                                    source={icons.chevron}
                                    resizeMethod="contain"
                                    style={{
                                        tintColor: COLORS.secondary,
                                        width: 25,
                                        height: 25,
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                : <View style={{
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1
                }}>
                    <Text style={{
                        color: COLORS.secondary
                    }}>
                        Your Cart is Empty !!
                    </Text>
                </View>
            }
        </>
    )
}
