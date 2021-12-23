import React, { useState } from 'react'
import { View, Text } from 'react-native'
import Login from '../components/Registration/Login'
import Signin from '../components/Registration/Signin'

export default function Registration({ navigation }) {
    const [isRegistred, setIsRegistred] = useState(true)
    return (
        <View style={{ flex: 1 }}>
            {isRegistred && <Login setIsRegistred={setIsRegistred} navigation={navigation} />}
            {!isRegistred && <Signin setIsRegistred={setIsRegistred} navigation={navigation} />}
        </View>
    )
}
