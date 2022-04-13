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
import contants from "expo-constants"
import * as Permissions from 'expo-permissions'
import Fire from "../fire"
import * as ImagePicker from 'expo-image-picker'
const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");


//<script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
//<script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js"></script>


export default class TelaPost extends React.Component{

 state={
    text:"",
    image: null
 }

componentDidMount(){
  this.getPhotoPermision();
}


  getPhotoPermision = async() =>{
    if (contants.platform.ios){
      const { status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if(status!= "granted"){
        alert(" permite que o app acesse suas fotos");
      }
    }

  };
    handlerPost=()=>{
      Fire.shared.addPost({text: this.state.text.trim(), localUri: this.state.image})
      .then(ref=>{this.setState({
        text: "",
       image: null
      })
      console.log(image)
    this.props.navigation.goBack()
    }).catch(error=>{
      alert(error)
    } )
    }


  pickImage = async() =>{
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [2,1]
      })
      if (!result.cancelled){
        this.setState({image: result.uri})
      }
  }
  
render(){
 
      return(
        <SafeAreaView style={styles.container}>
          <View stile={styles.header}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Ionicons name="md-arrow-back" size={24} color ="#ff4500"/>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.handlerPost}>
              <Text style={{fontWeight:"400"}}>Post</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputcontainer}>
            <Image source={require("../assets/user4.png")} style={styles.avatar}></Image>
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
          <View style={{marginHorizontal:10, marginTop:10,height:10}}>
            <Image source={{uri: this.state.image}} style={{width:"100%", height: "100%" }}></Image>
          </View>
          <Ionicons  name= "md-camera" size={32} color= "#ff4500"></Ionicons>

          </TouchableOpacity>
          
     </SafeAreaView>

      )

    }
  
}

 const styles= StyleSheet.create({
          container:{
            flex:1,
           
          },
          header:{
            flexDirection:"row",
            justifyContent:"space-between",
            paddingHorizontal:32,
            paddingVertical:17,
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