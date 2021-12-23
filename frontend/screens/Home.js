import React, { useState, useEffect } from 'react'
import { View, SafeAreaView, StyleSheet } from 'react-native'
import { COLORS } from '../constants'
import Header from '../components/Home/Header'
import Title from '../components/Home/Title'
import ScrolTab from '../components/Home/ScrolTab'
import ScrolCard from '../components/Home/ScrolCard'
import Footer from '../components/Home/Footer'
import Axios from 'axios'

export default function Home({ navigation }) {
    const tabList = ["chairs", 'cupboards', "tables", 'accessories']
    const [products, setproduct] = useState([])
    const [selectedCat, setSelectedCat] = useState(tabList[0])
    useEffect(() => {
        Axios.get('https://mobileshopeapp.herokuapp.com/products')
            .then(res => {
                if (res.data?.products) setproduct(res.data.products)
            })
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} />
            <Title title={selectedCat} />
            <View>
                <ScrolTab tabList={tabList} setSelectedCat={setSelectedCat} selectedCat={selectedCat} />
            </View>
            <View style={{ flex: 1 }}>
                <ScrolCard
                    navigation={navigation}
                    productList={products}
                    selectedCat={selectedCat}

                />
            </View>
            <View style={{ height: "19%", justifyContent: 'center' }}>
                <Footer setSelectedCat={setSelectedCat} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingTop: 5
    }
})
