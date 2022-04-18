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
import { backgroundColor, textShadowColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

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
  LayoutAnimation.easeInEaseOut();
      return(
    
       
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
      
        <Image source={require("../assets/logo2.png")}
        style={{marginTop:12, marginLeft:60}}
        ></Image>
          
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
                  <Text style={{color:"#fff"}}> Entrar </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{alignSelf: "center", marginTop: 30}} 
                onPress={() => this.props.navigation.navigate("Cadastro")}>
                  <Text style={{color:"#fff"}}>Não tem uma conta?<Text style={{color:"#FB5A48"}}>{'\n      Crie uma nova!'}</Text> </Text>
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
            marginTop: 8,
            backgroundColor:"#000"
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
            marginBottom:32
          },
          erromsg:{
            height: 72,
            alignItems:"center",
            justifyContent:"center",
            marginHorizontal: 30
          },
          formulario:{
            marginTop: -10,
            marginBottom: 40,
            marginHorizontal: 30,
          },
          inputtext:{
            color: "#05A895B2",
            fontSize: 10,
            textTransform: "uppercase",
            textShadowColor: "yellow"
          },
          input:{
            borderBottomColor:"#05A895B2",
            borderBottomWidth: StyleSheet.hairlineWidth,
            height: 40,
            fontSize:15,
            color:"#fff",
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