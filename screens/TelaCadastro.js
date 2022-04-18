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
import Fire from '../fire'
import Icon from "react-native-vector-icons/Feather"
import * as firebase from 'firebase'
import * as ImagePicker from 'expo-image-picker'
import Contants from "expo-constants"
import Permicao from '../utils/Permicao'

export default class TelaCadastro extends React.Component{
  static navigationOptions={
    headerShown: null
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
 
  
  
    getPhotoPermision = async() =>{
      if (Contants.platform.ios){
        const { status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if(status!= "granted"){
          alert(" permite que o app acesse suas fotos");
        }
      }
    }
  handlerPickAvatar= async() =>{
    Permicao.getCammeraPermission()

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4,3]
    })
    if(!result.cancelled){
      this.setState({user: { ...this.state.user, avatar: result.uri}})
    }
  }

    



  cadastrar=()=>{
    Fire.shared.creaerUser(this.state.user)



   // firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
  //  .then(userCredential => {
    //  return userCredential.user.updateProfile({
     //   displayName: this.state.name
   //   })
   // })

   // .catch(error =>this.setState({errorMessage: error.message}))
  }
render(){
      return(
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
       
       
        <TouchableOpacity style={styles.voltar} onPress={() => this.props.navigation.goBack()}>
            <Icon name="chevron-left" size={32} color= "#ff4500"/>
        </TouchableOpacity>
        <View style={{position:"absolute", top: 64 ,alignItems:"center", width :"100%"}}>
        <TouchableOpacity style={styles.avatarplacrholder} onPress={this.handlerPickAvatar}>
          <Image source={{uri: this.state.user.avatar}} style={styles.avatar}></Image>
            <Icon name="plus" size={40} color= "#ff4500"  style={{marginTop: 6, marginLeft: 2}}/>
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
                   onChangeText={name=>this.setState({ user:{...this.state.user, name}})}
                   value={this.state.user.name}
                   
                 />
                </View>

                <View style={{marginTop: 40}}>
                  <Text style={styles.inputtext}>  Email</Text>
                  <TextInput
                   style={styles.input}
                   autoCapitalize="none"
                   onChangeText={email=>this.setState({ user: {...this.state.user, email}})}
                   value={this.state.user.email}
                 
                   
                 />
                </View>

                <View style={{marginTop:40}}>
                  <Text style={styles.inputtext}> Senha</Text>
                  <TextInput
                   style={styles.input}
                   autoCapitalize="none"
                   onChangeText={password=>this.setState({ user: {...this.state.user, password}})}
                   value={this.state.user.password}
                   secureTextEntry={true}
                 
                 />
                </View>
                <TouchableOpacity 
                style={styles.button} 
                onPress={this.cadastrar}>
                <Text style={{color:"#fff"}}> Cadastrar </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                style={{alignSelf: "center", marginTop: 30}}
                 onPress={()=> this.props.navigation.navigate("Login")}>
                  <Text style={{color:"#fff"}}> Já tem uma conta  <Text style={{color:"#FB5A48"}}>Faça login!</Text> </Text>
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
            backgroundColor:"#000"
            
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
            marginTop: 90,
            marginBottom: 10,
            marginHorizontal: 30,
          },
          inputtext:{
            color: "#05A895B2",
            fontSize: 10,
            textTransform: "uppercase"
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
            borderRadius: 20,
            marginTop: 20,
            backgroundColor:"#05A895B2",
           borderColor: "#05A895B2" ,
            alignItems:"center",
            justifyContent:"center",
            marginHorizontal: 40
          },
          voltar:{
            position:"absolute",
            top:60,
            left:16,
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
          avatarplacrholder:{
            width: 100,
            height: 100,
            backgroundColor:"#e1e2e6",
            borderRadius: 50,
            marginTop: 75,
            justifyContent: "center",
            alignItems:"center",
          }



 })