import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image

} from "react-native";
import {Ionicons} from '@expo/vector-icons'
import Contants from "expo-constants"
import * as Permissions from 'expo-permissions'
import Fire from "../fire"
import * as ImagePicker from 'expo-image-picker'
import Permicao from '../utils/Permicao'
const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");


//<script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
//<script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js"></script>


export default class TelaPost extends React.Component{

 state={
   user:{

   },
    text:"",
    image: null
 }
 unsubscribe = null


 componentDidMount(){
     const user= this.props.uid || Fire.shared.uid
    this.unsubscribe= Fire.shared.firestore.collection("users").doc(user).onSnapshot(doc=>{
       this.setState({user: doc.data()})
     })
 }
 componentWillUnmount(){
   this.unsubscribe();
 }



 
    handlerPost=()=>{
      
      Fire.shared.addPost({text: this.state.text.trim(), localUri: this.state.image})
      .then(ref=>{this.setState({
        text: "",
       image: null
      })
      
    this.props.navigation.goBack()
    }).catch(error=>{
      alert(error)
    } )
    }


  pickImage = async() =>{
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4,3]
      })
      if (!result.cancelled){
        this.setState({image: result.uri})
      }
  }
  
render(){
 
      return(
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Ionicons name="md-arrow-back" size={32} color ="#ff4500"/>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.handlerPost}>
              <Text style={{fontWeight:"400"}}>Post</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputcontainer}>
            <Image source={ this.state.user.avatar ? {uri: this.state.user.avatar} : require("../assets/user.jpg") } style={styles.avatar}></Image>
            <TextInput 
            autoFocus={true} 
            multiline={true} 
            numberOfLines={4}
             styles={{flex:1}}
             placeholder="digite algo"
             onChangeText= {text=> this.setState({text})}
             value={this.state.text}
              > 

            </TextInput>
          </View>
          <TouchableOpacity  style={styles.fotos} onPress={this.pickImage}> 
         
          <Ionicons  name= "md-camera" size={32} color= "#ff4500"></Ionicons>

          </TouchableOpacity>
          <View style={{marginHorizontal:20, marginTop:80,height:300}}>
            <Image source={{uri: this.state.image}} style={{width:"100%", height: "100%" }}></Image>
          </View>
          
     </SafeAreaView>

      )

    }
  
}

 const styles= StyleSheet.create({
          container:{
            flex:1,
            marginTop:30
           
          },
          header:{
            flexDirection:"row",
            justifyContent:"space-between",
            paddingHorizontal:30,
            paddingVertical:12,
            borderBottomWidth:1,
            borderBottomColor: "#05A895B2"

          },
          inputcontainer:{
              margin: 32,
              flexDirection:"row",

          },
          avatar:{
            width:48,
            height:48,
            borderRadius: 24,
            marginRight:16
          },
          fotos:{
            alignItems:"flex-end",
            marginHorizontal: 32
          }




 })