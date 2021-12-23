import React from 'react'
import { View, Text, StyleSheet, Pressable, Picker } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { Formik } from 'formik'
import { COLORS } from '../../constants'
import * as Yup from 'yup'
import Axios from 'axios'

export default function Newproduct({ navigation }) {
    const newProduct = (values) => {
        Axios.post('https://mobileshopeapp.herokuapp.com/newproduct', values)
            .then(res => {
                const { message } = res.data
                if (message?.sucs) navigation.navigate('Home')
            })
    }
    const field = ["ProductName", "Imageurl", "Price"]
    const genre = ["Special Offre", "chairs", 'cupboards', "tables", 'accessories']

    const NewBookSchema = Yup.object().shape({
        ProductName: Yup
            .string()
            .min(10, "Product Name hase to have at least 10 charcters")
            .required('Product Name is required'),
        Imageurl: Yup
            .string()
            .url()
            .required("Product Image is required"),
        Price: Yup
            .number()
            .required("Price is required"),
        categoryName: Yup
            .string()
            .required("category Name is required"),
    })

    return (
        <View style={Styles.input}>
            <Formik
                initialValues={{
                    ProductName: "",
                    Imageurl: "",
                    Price: "",
                    categoryName: "",
                }}
                onSubmit={(values) => newProduct(values)}
                validationSchema={NewBookSchema}
                validateOnMount={true}
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
                        {
                            field.map((field, index) => (
                                <View key={index}>
                                    {input(field, index, handleChange, handleBlur, errors, values)}
                                </View>
                            ))
                        }
                        <View style={[
                            Styles.inputFaild,
                            { borderColor: "#ccc" }
                        ]}>
                            <Picker
                                placeholder="categoryName"
                                onValueChange={handleChange("categoryName")}
                                selectedValue={values.categoryName}
                                enabled={true}
                                mode="dropdown"
                                style={{
                                    borderColor: "white",
                                    backgroundColor: "white",

                                }}
                            >
                                {
                                    genre.map((item, index) => (
                                        <Picker.Item
                                            label={item.toString()}
                                            value={item.toString()}
                                            key={index.toString()} />
                                    ))
                                }
                            </Picker>
                        </View>
                        <Pressable
                            titleSize={20}
                            style={buttonstyle(isValid)}
                            onPress={handleSubmit}
                        >
                            <Text style={{ color: COLORS.white, fontWeight: "700" }}>Add New Product</Text>
                        </Pressable>
                    </>
                )}
            </Formik>
        </View>
    )
}

const input = (variable, index, handleChange, handleBlur, errors, values) => {
    return <>
        <View style={[
            Styles.inputFaild,
            { borderColor: "#ccc" }
        ]}>
            <TextInput
                placeholderTextColor="#444"
                placeholder={variable}
                placeholderTextColor="rgba(0,0,0,0.4)"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="email-address"
                autoFocus={index == 0 && true}
                onChangeText={handleChange(variable)}
                onBlur={handleBlur(variable)}
                value={values[variable]}
            />
        </View>
        {
            errors[variable] &&
            <Text style={{ fontSize: 10, color: "red", marginBottom: 4 }}>
                {errors[variable]}
            </Text>
        }
    </>
}


const Styles = StyleSheet.create({
    warper: {
        backgroundColor: COLORS.black,
        flex: 1
    },
    inputFaild: {
        borderRadius: 4,
        padding: 6,
        backgroundColor: "#FAFAFA",
        marginTop: 3,
        borderWidth: 1,

    },
    input: {
        paddingHorizontal: 15,
        flex: 1,
        marginTop: 70,
    },

    singupContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",
        marginTop: 30
    }
})

const buttonstyle = (isvalid = false) => {
    return {
        backgroundColor: isvalid ? COLORS.primary : COLORS.secondary,
        alignItems: "center",
        justifyContent: "center",
        minHeight: 40,
        borderRadius: 4,
        marginTop: 70,

    }
}



