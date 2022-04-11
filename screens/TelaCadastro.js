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

export default class TelaCadastro extends React.Component{
  state ={
    name: "",
    email:"",
    password:"",
    erromsg: null
  }

  cadastrar=()=>{
    

    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(userCredential => {
      return userCredential.user.updateProfile({
        displayName: this.state.name
      })
    })

    .catch(error =>this.setState({errorMessage: error.message}))
  }
render(){
      return(
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <Text styles={styles.titulo}>RPGROUP</Text>
          <View styles={styles.erromsg}>
          {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
          </View>
          <View style={styles.formulario}> 
               <View>
                  <Text style={styles.inputtext}>  Nome</Text>
                  <TextInput
                   style={styles.input}
                   autoCapitalize="none"
                   onChangeText={nome=>this.setState({ nome})}
                   value={this.state.nome}
                   
                 />
                </View>

                <View style={{marginTop: 40}}>
                  <Text style={styles.inputtext}>  Email</Text>
                  <TextInput
                   style={styles.input}
                   autoCapitalize="none"
                   onChangeText={email=>this.setState({ email})}
                   value={this.state.email}
                 
                   
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
                 
                 />
                </View>
                <TouchableOpacity 
                style={styles.button} 
                onPress={this.cadastrar}>
                <Text styles={{color:"#05A895B2"}}> Cadastrar </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                style={{alignSelf: "center", marginTop: 30}}
                 onPress={()=> this.props.navigation.navigate("Login")}>
                  <Text styles={{color:"#000"}}> Já tem uma conta<Text styles={{color:"##05A895B2"}}>Faça login!</Text> </Text>
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
            justifyContent:"center",
            
            
          },
          titulo:{
            marginTop: 32,
            marginLeft: 40,
            fontSize: 30,
            fontWeight: "400",
            justifyContent:"center",
            
            

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
            borderRadius: 20,
           borderColor: "#05A895B2" ,
            alignItems:"center",
            justifyContent:"center",
            marginHorizontal: 40
          }

 })