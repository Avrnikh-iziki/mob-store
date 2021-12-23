import React, { useState } from 'react'
import { Image, View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { Formik } from 'formik'
import Validator from 'email-validator'
import { COLORS, images, icons } from '../../constants'
import Axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'


export default function Login({ navigation, setIsRegistred }) {
    const [err, seterr] = useState(null)
    const storage = (key, token) => AsyncStorage.setItem(key, token)
    const login = (values) => {
        const data = {
            Email: values.email,
            Password: values.password
        }
        Axios.post('https://mobileshopeapp.herokuapp.com/user/login', data)
            .then(res => {
                const { message, token, Name, id, Email, admin } = res.data
                if (message !== undefined) seterr(message.err)
                if (token) {
                    storage('token', token)
                    storage('Name', Name)
                    storage('userid', id)
                    storage('emai', Email)
                    storage('admin', admin)
                    navigation.navigate('Home')
                } else {
                    setTimeout(() => {
                        seterr(null)
                    }, 2000)
                }
            })
    }
    return (
        <View style={Styles.warper}>
            <View style={{
                height: 20,
                margin: 10,
                paddingLeft: 20
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
            <View style={Styles.logo}>
                <Image
                    source={images.fa}
                    style={Styles.logimage}
                />
            </View>
            <View style={Styles.input}>
                <Formik
                    initialValues={{ email: "", password: "" }}
                    onSubmit={values => login(values)}
                >
                    {({
                        handleBlur,
                        handleChange,
                        handleSubmit,
                        values,
                        errors,
                        isValid
                    }) => (
                        <>
                            <View style={[
                                Styles.inputFaild,
                                {
                                    borderColor: values.email.length < 1 || Validator.validate(values.email)
                                        ? "#ccc"
                                        : "red"
                                }
                            ]}>
                                <TextInput
                                    placeholderTextColor="#444"
                                    placeholder="Email"
                                    autoFocus={true}
                                    placeholderTextColor="rgba(0,0,0,0.4)"
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                    textContentType="email-address"
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                />
                            </View>
                            <View style={[
                                Styles.inputFaild,
                                {
                                    borderColor: (values.password.length < 1 || values.password.length > 8)
                                        ? "#ccc"
                                        : "red"
                                }
                            ]}>
                                <TextInput
                                    placeholderTextColor="#444"
                                    placeholder="Password"
                                    placeholderTextColor="rgba(0,0,0,0.4)"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    secureTextEntry={true}
                                    textContentType="password"
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                />
                            </View>

                            <Pressable
                                titleSize={20}
                                style={buttonstyle(isValid)}
                                onPress={handleSubmit}
                            >
                                <Text style={{ color: COLORS.white, fontWeight: "700" }}>Log in</Text>
                            </Pressable>
                            <View style={Styles.singupContainer}>
                                <Text
                                    style={{ color: COLORS.black }}>
                                    Don't have an account?
                                </Text>
                                <TouchableOpacity
                                    onPress={() => setIsRegistred(false)}
                                >
                                    <Text style={{ color: "#6BB0F5" }}> Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </Formik>
                <>
                    {
                        err &&
                        <View style={Styles.errResponse}>
                            <Text style={{ color: COLORS.blue }}>{err}</Text>
                        </View>
                    }
                </>
            </View>
        </View>
    )
}


const Styles = StyleSheet.create({
    warper: {
        backgroundColor: COLORS.lightGray3,
        flex: 1
    },
    inputFaild: {
        borderRadius: 4,
        padding: 12,
        backgroundColor: "#FAFAFA",
        marginTop: 3,
        borderWidth: 1,

    },
    input: {
        marginTop: 10,
        padding: 15,
        flex: 4
    },

    singupContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",
        marginTop: 30
    },
    logo: {
        flex: 2,
        alignItems: "center",
        justifyContent: "center",
    },
    logimage: {
        width: 100,
        height: 100
    },
    errResponse: {
        marginTop: 70,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.darkRed,
        height: 30,
        borderRadius: 5,
    },
})

const buttonstyle = (isvalid = false) => {
    return {
        backgroundColor: isvalid ? '#9ACAF7' : '#8896F6',
        alignItems: "center",
        justifyContent: "center",
        minHeight: 40,
        borderRadius: 4,
        marginTop: 60
    }
}



