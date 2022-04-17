import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image
} from "react-native";
import Fire from '../fire'

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
          <Button onPress={() =>{Fire.shared.signOut()}}
          title="sair"/>
     </View>
      )

    }
  
}

 const styles= StyleSheet.create({
          container:{
            flex:1,
           
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
            marginTop:24,
            fontSize:16,
            fontWeight: "600"
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
            color: "#05A895B2",
            fontSize:18,
            fontWeight: "300",
          },
          stattitulo:{
            color: "#c3c5cd",
            fontSize:12,
            fontWeight: "500",
            marginTop:4

          }
          
 })