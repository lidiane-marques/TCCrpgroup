import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import {createStackNavigator, } from 'react-navigation-stack'
import Icon from "react-native-vector-icons/Feather";
import { View, StyleSheet, Button, Alert } from "react-native";
import TelaCadastro from './screens/TelaCadastro'
import TelaHome from './screens/TelaHome'
import TelaLogin from './screens/TelaLogin'
import Caregando from './screens/Caregando'
import TelaPost from './screens/TelaPost'
import TelaMensagem from './screens/TelaMensagem'
import TelaConfiguracao from './screens/TelaConfiguracao'
import TelaPerfil from './screens/TelaPerfil'
import { createBottomTabNavigator } from 'react-navigation-tabs';


import * as firebase from "firebase"


// npm install react-native-reanimated react-navigation-tabs

// npm istall firebase react-native-handler@~1.3.0 react-navigation react-navigation-stack


// Initialize Firebase


const AppContainer = createStackNavigator(
  
  {
  
    default:createBottomTabNavigator(
      {
            Home: {
             screen: TelaHome,
              navigationOptions:{tabBarIcon: ({tintColor})  => <Icon name="home" size ={24} color ={tintColor}/> }   
            },
            Perfil: {
              screen: TelaPerfil,
              navigationOptions:{tabBarIcon: ({tintColor})  => <Icon name="user" size ={24} color ={tintColor}/> }   
            },
            
            Post: {
              screen: TelaPost,
              navigationOptions:{tabBarIcon: ({tintColor})  => (<Icon name="edit" size ={24} color ="#e9446a"
               style= {{
    
                 shadowColor: "#e9446a",
                shadowOffset: {width:0, height:0},
                shadowRadius: 10, shadowOpacity:0.3
    
                }} /> 
              )
              }   
            },
            Mensagem: {
              screen: TelaMensagem,
              navigationOptions:{tabBarIcon: ({tintColor})  => <Icon name="message-square" size ={24} color ={tintColor}/> }   
            },
            Configuracao: {
              screen: TelaConfiguracao, 
              navigationOptions:{tabBarIcon: ({tintColor})  => <Icon name="settings" size ={24} color ={tintColor}/> 
                   }   
              },
            } ,
        {
          defaultNavigationOptions:{
            headerShown: null,
            tabBarOnPress:({navigation, defaultHandler})=>{
              if(navigation.state.key === "Post"){
                navigation.navigate("postModal")
              } else{
                defaultHandler()
              }
              
            },
            
          },
          tabBarOptions:{
            activeTintColor: "#05A895B2",
            inactiveTintColor: "#8888c4",
            headerShown: false
          }
        }
     ),
        postModal:{
          screen: TelaPost
        },
        mode:"modal",
        headerMode:"false",
        initialRouteName:"PostModal"
        
        
   }
)




//const AppTabNavigator  
 

const AuthStack= createStackNavigator({
  Login: TelaLogin,
  Cadastro: TelaCadastro,
 
 
})
 export default createAppContainer(
   createSwitchNavigator(
     {
       loading: Caregando,
       App:  AppContainer,
       Auth: AuthStack
     },
     {
       initialRouteName: "loading"
     }
   )
 )
