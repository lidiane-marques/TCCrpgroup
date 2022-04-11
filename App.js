import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import { View, StyleSheet, Button, Alert } from "react-native";
import TelaCadastro from './screens/TelaCadastro'
import TelaHome from './screens/TelaHome'
import TelaLogin from './screens/TelaLogin'
import Caregando from './screens/Caregando'


import * as firebase from 'firebase'


// npm istall firebase react-native-handler@~1.3.0 react-navigation react-navigation-stack
var firebaseConfig = {
  apiKey: "AIzaSyBwDC0t3Ztv-uwv0o40NiJ0XlmfCcYk6sQ",
 authDomain: "meu-tcc1.firebaseapp.com",
 projectId: "meu-tcc1",
 storageBucket: "meu-tcc1.appspot.com",
messagingSenderId: "597425340066",
 appId: "1:597425340066:web:628b1e5d25f6dfeb7ea1fb"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const AppStack = createStackNavigator({
   Home: TelaHome
})

const AuthStack= createStackNavigator({
  Login: TelaLogin,
  Cadastro: TelaCadastro
})
 export default createAppContainer(
   createSwitchNavigator(
     {
       loading: Caregando,
       App:  AppStack,
       Auth: AuthStack
     },
     {
       initialRouteName: "loading"
     }
   )
 )