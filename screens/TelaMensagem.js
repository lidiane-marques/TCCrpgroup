import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
LayoutAnimation,
  Keyboard,
} from "react-native";
import * as firebase from 'firebase'
export default class TelaMensagem extends React.Component{

  state={
    email:"",
    displayName: ""
  }
  componentDidMount(){
    const {email, displayName} = firebase.auth().currentUser
    this.setState({email, displayName})
  }
  
render(){
  LayoutAnimation.easeInEaseOut()
  console.log(this.state.displayName) 
      return(
        <View style={styles.container}>
          <Text>oi essa é tela de msg</Text> 
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