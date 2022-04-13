import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
 StatusBar,
  Keyboard,
} from "react-native";
import Icon from "react-native-vector-icons/Feather"
import * as firebase from 'firebase'
import * as pickImage from 'expo-image-picker'
import  usePermissions from '../screens/a';

export default class TelaCadastro extends React.Component{
  static navigationOptions={
    header: null
  }
  state ={
    user:{
      name: "",
      email:"",
      password:"",
      avatar: null
    },
  
    erromsg: null
  }
  headerPickAvatar= async() =>{
    usePermissions.getCammeraPermission()
  }

    handlerPickAvatar = async() =>{
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.images,
        allowsEditing: true,
        aspect:[4,3]
      })
        if(!result.cancelled){
          this.setState({user: { ...this.state.user, avatar:result.uri  }})
        }
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
        <StatusBar barStyle="light-content"></StatusBar>
        <Image source={require("../assets/logo2.png")}
        styles={{marginTop:5, marginLeft:60}}
        ></Image>
        <TouchableOpacity style={styles.voltar} onPress={() => this.props.navigation.goBack()}>
            <Icon name=" arrow-round-back" size={32} color= "#ff4500"/>
        </TouchableOpacity>
        <View style={{position:"absolute", top: 64 ,alignItems:"center", width :"100%"}}>
        <TouchableOpacity style={styles.avatarplacrholder}>
          <Image source={{uri: this.state.user.avatar}} style={styles.avatar}></Image>
            <Icon name="add" size={40} color= "#ff4500"  style={{marginTop: 6, marginLeft: 2}}/>
        </TouchableOpacity>
        </View>
          
          <View style={styles.erromsg}>
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
            marginBottom: -40,
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
          },
          voltar:{
            position:"absolute",
            top:40,
            left:32,
            width: 32,
            height:32,
            borderRadius: 16,
            backgroundColor: "rgba(21, 22,40,0.1)",
            alignItems:"center",
            justifyContent:"center",
          },
          avatar:{
            position:"absolute",
            width: 100,
            height: 100,
            borderRadius: 50, 
            backgroundColor: "#e1e2e6",
              marginTop: 180 ,
              justifyContent:"center",
              alignItems:"center",
          },
          Avatarplacrholder:{
            width: 100,
            height: 100,
            backgroundColor:"#e1e2e6",
            borderRadius: 50,
            marginTop: 48,
            justifyContent: "center",
            alignItems:"center",
          }



 })