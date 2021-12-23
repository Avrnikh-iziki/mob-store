import React from "react";
import { Home, ItemDetail, Registration, Mycart , Userarea } from "./screens";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./Redux/store";
const store = configureStore()

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        border: "transparent",
    }
}

const Stack = createStackNavigator();

export default function Navigation() {
    return (
        <ReduxProvider store={store}>
            <NavigationContainer theme={theme}>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}
                    initialRouteName={'Home'}
                >
                    <Stack.Screen name='Home' component={Home} />
                    <Stack.Screen name='ItemDetail' component={ItemDetail} />
                    <Stack.Screen name='Registration' component={Registration} />
                    <Stack.Screen name='Mycart' component={Mycart} />
                    <Stack.Screen name='User' component={Userarea} />
                </Stack.Navigator>
            </NavigationContainer>
        </ReduxProvider>
    )
}

