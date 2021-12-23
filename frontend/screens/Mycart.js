import React from 'react'
import { SafeAreaView } from 'react-native'
import Header from '../components/Mycart/Header'
import Item from '../components/Mycart/Item'
import { COLORS } from '../constants'


export default function Mycart({ navigation }) {
    return (
        <SafeAreaView style={{
            backgroundColor: COLORS.lightGray3,
            flex: 1
        }}>
            <Header navigation={navigation} />
            <Item navigation={navigation} />
        </SafeAreaView>
    )
}
