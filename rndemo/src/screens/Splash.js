import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { CommonActions } from "@react-navigation/native"
import { getItem, setItem } from "../utils/Async"
import { jwtVerifyAsync } from "../utils/jwt"
export default function Splash({ navigation }) {


    useEffect(() => {
        async function getToken() {

            const token = await getItem("TOKEN");

            if (token) {
                try {
                    const data = await jwtVerifyAsync(token);
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 1,
                            routes: [{ name: "Home" }]
                        })
                    )
                }
                catch (e) {

                    navigation.dispatch(
                        CommonActions.reset({
                            index: 1,
                            routes: [{ name: "Login" }]
                        })
                    )


                }
                return
            }
            navigation.dispatch(
                CommonActions.reset({
                    index: 1,
                    routes: [{ name: "Login" }]
                })
            )
        }
        getToken()
    }, [])
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }} >
            <Text style={{ fontWeight: "bold", fontSize: 22 }}>Demo</Text>
        </View>
    )
}
