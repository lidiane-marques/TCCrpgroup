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
  StatusBar,
  LayoutAnimation,
  Keyboard,
} from "react-native";
import * as firebase from 'firebase'

export default class TelaLogin extends React.Component{
  static navigationOptions={
    headerShown: null
  }
  state ={
    email:"",
    password:"",
    erromsg: null
  }

  entrar=()=>{
    const {email, password} = this.state

    firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(error =>this.setState({errorMessage: error.message}))
  }
render(){
      return(
       
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
        <StatusBar barStyle='light-content'></StatusBar>
        <Image source={require("../assets/logo2.png")}
        style={{marginTop:50, marginLeft:60}}
        ></Image>
          <Text styles={styles.greeting}>{'Bem vindo a\nRPGROUP'}</Text>
          <View styles={styles.erromsg}>
          {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
          </View>
          <View style={styles.formulario}> 
                <View>
                  <Text style={styles.inputtext}>  Email</Text>
                  <TextInput
                   style={styles.input}
                   autoCapitalize="none"
                   onChangeText={email=>this.setState({ email})}
                   value={this.state.email}
                   keyboardType="email-address"
                   textContentType="emailAddress"
                 />
                </View>

                <View style={{marginTop:40}}>
                  <Text style={styles.inputtext}> Senha</Text>
                  <TextInput
                   style={styles.input}
                   autoCapitalize="none"
                   onChangeText={password=>this.setState({ password})}
                   value={this.state.password}
                   secureTextEntry={true}
                   textContentType="emailAddress"
                 />
                </View>
                <TouchableOpacity style={styles.button} onPress={this.entrar}>
                  <Text styles={{color:"#05A895B2"}}> Entrar </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{alignSelf: "center", marginTop: 30}} 
                onPress={() => this.props.navigation.navigate("Cadastro")}>
                  <Text styles={{color:"#000"}}>Não tem uma conta?<Text styles={{color:"blue"}}>{'\n      Crie uma nova!'}</Text> </Text>
                </TouchableOpacity>

          </View>
        </View>
        </TouchableWithoutFeedback>
      )

    }
  
}
 const styles= StyleSheet.create({
          container:{
            flex:1,
           
            
          },
          greeting:{
            marginTop: 32,
            fontSize: 20,
            fontWeight: "400",
            textAlign: "center"

          },
          error:{
            color: "#e9446a",
            fontWeight: "600",
            textAlign:"center",
          },
          erromsg:{
            height: 72,
            alignItems:"center",
            justifyContent:"center",
            marginHorizontal: 30
          },
          formulario:{
            marginTop: 32,
            marginBottom: 40,
            marginHorizontal: 30,
          },
          inputtext:{
            color: "#05A895B2",
            fontSize: 10,
            textTransform: "uppercase"
          },
          input:{
            borderBottomColor:"#FB5A48",
            borderBottomWidth: StyleSheet.hairlineWidth,
            height: 40,
            fontSize:15,
            color:"#161f3d",
          },
          button:{
            height: 52,
            marginTop: 32,
            backgroundColor:"#05A895B2",
            borderRadius: 20,
           borderColor: "#05A895B2" ,
            alignItems:"center",
            justifyContent:"center",
            marginHorizontal: 40
          }

 })