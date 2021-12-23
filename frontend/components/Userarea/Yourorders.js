import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import { COLORS, SIZES, FONTS, icons } from '../../constants'
import Axios from 'axios'

export default function Yourorders() {
    const total = (item) => {
        var somme = 0
        item.map(el => {
            somme += parseInt(el.price)
        })
        return somme;
    }
    const [removedIds, setRemovedIds] = useState([])
    const [orders, setorders] = useState([])
    const [loding, setloding] = useState(true)

    useEffect(() => {
        Axios.get('https://mobileshopeapp.herokuapp.com/orders')
            .then(res => {
                const { order, err } = res.data
                if (!err) {
                    setorders(order)
                    setloding(false)
                }
            })
    }, [])
    const deletOrder = (id) => {
        Axios.post('https://mobileshopeapp.herokuapp.com/delet', { id: id })
            .then(res => {
                const { message } = res.data
                if (message?.id) setRemovedIds(message.id)
            })
    }
    const item = (item, index) => (
        <View
            key={index}
            style={{
                flexDirection: 'row',
                width: "100%",
                height: 60,
                marginBottom: 2,
                justifyContent: "space-between"
            }}>
            <View style={{
                flex: .2
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
                flex: .8,
                backgroundColor: COLORS.primary,
                borderRadius: SIZES.radius,
                marginLeft: 2,
                flexDirection: "row"
            }}>
                <View
                    style={{
                        flex: 1,
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

            </View>
        </View>
    )
    const userOrders = (user, index) => (
        !removedIds.includes(user._id) && <View
            key={index}
            style={{
                backgroundColor: COLORS.black,
                marginBottom: 3,
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderRadius: SIZES.radius
            }}>
            <View style={{
                flexDirection: "row",
                justifyContent: "space-between"
            }}>
                <View style={{
                    flex: .8
                }}>
                    <Text style={{
                        color: COLORS.primary,
                        ...FONTS.body3,
                    }}>
                        Name : {user.Name}
                    </Text>
                    <Text style={{
                        color: COLORS.primary,
                        ...FONTS.body3,
                    }}>
                        Email : {user.Email}
                    </Text>
                    <Text style={{
                        color: COLORS.primary,
                        ...FONTS.body3,
                    }}>
                        Total  : {total(user.order)} $
                    </Text>
                </View>
                <View style={{
                    flex: .2
                }}>
                    <TouchableOpacity
                        style={{
                            justifyContent: "center",
                            alignItems: "flex-end",
                            flex: 1
                        }}
                        onPress={() => deletOrder(user.id)}
                    >
                        <Image
                            source={icons.dashboard}
                            resizeMethod="contain"
                            style={{
                                tintColor: COLORS.primary,
                                width: 20,
                                height: 20
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{
                marginTop: 20
            }}>
                {
                    user.order.map((el, index) => (
                        item(el, index)
                    ))
                }
            </View>
        </View>
    )
    return (
        <ScrollView style={{
            marginHorizontal: 15
        }}>
            {
                (orders.length == 0 && !loding)
                    ? <View style={{
                        alignItems: "center",
                        marginTop: 40,
                    }}>
                        <Text style={{
                            color: COLORS.lightGray
                        }}> You don't have any Orders </Text>
                    </View>

                    : orders.map((user, index) => (
                        userOrders(user, index)
                    ))



            }
        </ScrollView>
    )
}
