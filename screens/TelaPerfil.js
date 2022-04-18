import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image
} from "react-native";
import Fire from '../fire'
import {Ionicons} from "@expo/vector-icons"
import { color } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

export default class TelaPerfil extends React.Component{

 state ={
   user:{

   }
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

render(){
 
      return(
        <View style={styles.container}>
          <View style={{marginTop:64, alignItems:"center"}}>
            <View style={styles.avatarContainer}>
              <Image style={styles.avatar} source={ this.state.user.avatar ? {uri: this.state.user.avatar} : require("../assets/user.jpg") }/>
            
            </View>
            <Text style={styles.name}> {this.state.user.name}</Text>
          </View>
          <View style={styles.statoContainer}>
            <View style={styles.state}>
                <Text style={styles.statamont}>3</Text>
                <Text style={styles.stattitulo}>Posts</Text>
            </View>
            <View style={styles.state}>
                <Text style={styles.statamont}>6</Text>
                <Text style={styles.stattitulo}>seguidores</Text>
            </View>
            <View style={styles.state}>
                <Text style={styles.statamont}>9</Text>
                <Text style={styles.stattitulo}>seguindo</Text>
            </View>
          </View>
          
          <Ionicons name="exit"  size={35} style={{ 
            position:"absolute",
            top:60,
            left:360,
            width: 32,
            height:32,}}   onPress={() =>{Fire.shared.signOut()}} /> 
            
        
         <Text style={{marginTop: 20, left:180}}>sem posts</Text>
     </View>
      )

    }
  
}

 const styles= StyleSheet.create({
          container:{
            flex:1,
            backgroundColor:"#ff7f50"
           
          },
          avatarContainer:{
            shadowColor: "#151734",
            shadowRadius: 30, 
            shadowOpacity: 0.4

          },
          avatar:{
            width:136,
            height:136,
            borderRadius: 68,
          },
          name:{
            marginTop:40,
            fontSize:20,
            fontWeight: "600",
            color:"#000"
          },
          statoContainer:{
            flexDirection:"row",
            justifyContent:"space-between",
            margin: 32
          },
          state:{
            alignItems:"center",
            flex:1,
          },
          statamont:{
            color: "#000",
            fontSize:18,
            fontWeight: "300",
          },
          stattitulo:{
            color: "#fff",
            fontSize:12,
            fontWeight: "500",
            marginTop:4

          }
          
 })