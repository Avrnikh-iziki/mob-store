import React, { useState, useEffect} from 'react'
import { SafeAreaView, ScrollView, View } from 'react-native'
import Header from '../components/Userarea/Header'
import Yourorders from '../components/Userarea/Yourorders'
import Newproduct from '../components/Userarea/Newproduct'

export default function Userarea({ navigation }) {
    const [selectedComponent, setSelectedComponent] = useState('Your Orders')
  
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: "black"
        }}>
            <Header navigation={navigation} setSelectedComponent={setSelectedComponent} />
            {(selectedComponent == "Your Orders" || selectedComponent == undefined) && <Yourorders />}
            {selectedComponent == "New Product" && <Newproduct navigation={navigation} />}

        </SafeAreaView>
    )
}
