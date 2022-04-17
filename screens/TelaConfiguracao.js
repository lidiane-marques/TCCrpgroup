import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button
} from "react-native";
export default class TelaConfiguracao extends React.Component{

 
  
render(){
 
      return(
        <View style={styles.container}>
          <Text>oi essa é tela de tela confih</Text> 
          <Button
  
        title="SAIR"
        titleStyle={styles.loginButtonText}
        buttonStyle={styles.loginButton}
        onPress={() => this.props.navigation.navigate('Cadastro')}
      />
     </View>
      )

    }
  
}

 const styles= StyleSheet.create({
          container:{
            flex:1,
            justifyContent: "center",
            alignItems: "center"
          },
          loginButton: {
            backgroundColor: "#05A895B2",
            paddingVertical: 10,
            borderRadius: 10,
            marginTop: 10,
            flex: 5,
            shadowColor: "#9C27B0",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 5,
          },
          loginButtonText: {
            color: "#fff",
            alignSelf: "center",
            fontSize: 18,
            
          },
 })