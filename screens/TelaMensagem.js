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
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
export default class TelaMensagem extends React.Component{

 
  
render(){
  
      return(
        <View style={styles.container}>
         <Image source={require("../assets/20b2aa.png")} style={{justifyContent:"center"}}
       
        ></Image>
     </View>
      )

    }
  
}

 const styles= StyleSheet.create({
          container:{
            flex:1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor:"#20b2aa"
          }
 })