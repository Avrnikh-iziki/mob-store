import React, { useState } from 'react'
import { Image, View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { Formik } from 'formik'
import Validator from 'email-validator'
import { COLORS, images, icons } from '../../constants'
import Axios from 'axios'

export default function Signin({ navigation, setIsRegistred }) {
    const [err, seterr] = useState(null)

    const signin = (values) => {
        const data = {
            Name: values.name,
            Email: values.email,
            Password: values.password,
        }
        Axios.post('https://mobileshopeapp.herokuapp.com/user/signin', data)
            .then(res => {
                const { message } = res.data
                if (message.faild !== undefined) seterr(message.faild)
                if (message.sucs !== undefined) setIsRegistred(true)
                else {
                    setTimeout(() => {
                        seterr(null)
                    }, 2000)
                }
            })
            .catch((err) => setErr(err));
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
                    initialValues={{ email: "", password: "", name: "" }}
                    onSubmit={values => signin(values)}
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
                                    borderColor: values.name.length < 1 || values.name.length > 3
                                        ? "#ccc"
                                        : "red"
                                }
                            ]}>
                                <TextInput
                                    placeholderTextColor="#444"
                                    placeholder="Name"
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                    textContentType="email-address"
                                    placeholderTextColor="rgba(0,0,0,0.4)"
                                    autoFocus={true}
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                    value={values.name}
                                />
                            </View>
                            {
                                errors.name &&
                                <Text style={{ fontSize: 10, color: "red", marginBottom: 10 }}>
                                    {errors.name}
                                </Text>
                            }
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
                                    autoCapitalize="none"
                                    placeholderTextColor="rgba(0,0,0,0.4)"
                                    keyboardType="email-address"
                                    textContentType="email-address"
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                />
                            </View>
                            {
                                errors.email &&
                                <Text style={{ fontSize: 10, color: "red", marginBottom: 10 }}>
                                    {errors.email}
                                </Text>
                            }
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
                            {
                                errors.password &&
                                <Text style={{ fontSize: 10, color: "red", marginBottom: 10 }}>
                                    {errors.password}
                                </Text>
                            }

                            <Pressable
                                titleSize={20}
                                style={buttonstyle(isValid)}
                                onPress={handleSubmit}
                            >
                                <Text style={{ color: COLORS.white, fontWeight: "700" }}>Sign In</Text>
                            </Pressable>
                            <View style={Styles.singupContainer}>
                                <Text
                                    style={{ color: COLORS.black }}>
                                    You have an account ?
                                </Text>
                                <TouchableOpacity
                                    onPress={() => setIsRegistred(true)}
                                >
                                    <Text style={{ color: "#6BB0F5" }}>  Loin</Text>
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
    sucessResponse: {
        marginTop: 70,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.darkGreen,
        height: 30,
        borderRadius: 5,
    }
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


