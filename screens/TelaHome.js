import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Keyboard,
} from "react-native";
import * as firebase from 'firebase'
export default class TelaHome extends React.Component{

  state={
    email:"",
    displayName: ""
  }
  componentDidMount(){
    const {email, displayName} = firebase.auth().currentUser
    this.setState({email, displayName})
  }

  signOutUser = () => {
    firebase.auth().signOut()
  }
  
render(){
      return(
        <View style={styles.container}>
          <Text>oi {this.state.email}</Text>
          <TouchableOpacity style={{marginTop:32}} onPress={this.signOutUser}>
            <Text>sair</Text>
          </TouchableOpacity>
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