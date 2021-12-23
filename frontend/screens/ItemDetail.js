import React from 'react'
import { View } from 'react-native'
import Fotter from '../components/ItemDetails/Fotter'
import Info from '../components/ItemDetails/Info'

export default function ItemDetail({ route, navigation }) {
    return (
        <View style={{ flex: 1 }}>
            <Info route={route} />
            <Fotter navigation={navigation} route={route}  />
        </View>
    )
}
