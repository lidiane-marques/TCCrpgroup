import React from 'react'
import {
  StyleSheet,
  Text,
  View,

} from "react-native";
export default class TelaConfiguracao extends React.Component{

 
  
render(){
 
      return(
        <View style={styles.container}>
          <Text>oi essa é tela de tela confih</Text> 
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