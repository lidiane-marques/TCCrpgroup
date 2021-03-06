import React from 'react'
import {  StyleSheet, Text,  View,  ActivityIndicator} from "react-native";
import * as firebase from 'firebase'

import Fire from '../fire'


export default class Caregando extends React.Component{
componentDidMount(){
firebase.auth().onAuthStateChanged(user =>{
  this.props.navigation.navigate(user ? "App": "Auth" )
})

}

render(){
      return(
        <View style={styles.container}>
          <Text>caregando</Text>
          <ActivityIndicator size="large"></ActivityIndicator>

        </View>
      )

    }
  
}

 const styles= StyleSheet.create({
          container:{
            flex:1,
            justifyContent: "center",
            alignItems: "center"
          }
 })


