

import React, { useRef } from 'react';
import { Button } from "react-native"
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, CommonActions } from '@react-navigation/native';
import { setItem } from "./src/utils/Async"

import Splash from './src/screens/Splash';

import Login from './src/screens/Login';
import Home from './src/screens/Home';

const Stack = createStackNavigator()

const App: () => React$Node = () => {
  const navRef = useRef(null)







  return (
    <NavigationContainer ref={navRef}>

      <Stack.Navigator initialRouteName="splash" >
        <Stack.Screen name="splash" component={Splash} options={{ headerShown: false }} ></Stack.Screen>

        <Stack.Screen name="Login" component={Login} ></Stack.Screen>

        <Stack.Screen name="Home" component={Home}
          options={{
            title: 'My home',
            headerTintColor: '#000',
            headerTitleStyle: {
              fontWeight: 'bold',
            },

            headerLeft: false,
            headerRight: () => (
              <Button
                onPress={() => {
                  setItem("TOKEN", '')
                  navRef.current.dispatch(
                    CommonActions.reset({
                      index: 1,
                      routes: [{ name: "Login" }]
                    })
                  )

                }}
                title="Sign out"
                color="#000"
              />
            ),
          }}
        ></Stack.Screen>


      </Stack.Navigator>




    </NavigationContainer>
  );
};



export default App;
