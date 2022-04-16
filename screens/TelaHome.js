import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
LayoutAnimation,
  Keyboard,
  FlatList,
  Alert
} from "react-native";
import addPost from '../fire'
import {Ionicons} from "@expo/vector-icons"
import * as firebase from 'firebase'
import moment from 'moment'


posts = [

    {
      id: "1",
      name: "Rogerio Gomes",
      text: "Apresento a voces o meu novo personagem: wen-chan, Monge humano",
      timestamp: 15691092733726,
      avatar: require("../assets/user1.png"),
      image:  require('../assets/post1.jpg')

    },
    {
      id: "2",
      name: " Ana D.M",
      text: " Na minha época montar um ficha de personagem era assim",
      timestamp: 15691092733726,
      avatar: require("../assets/user2.png"),
      image:  require("../assets/post2.png")

    },
    {
      id: "3",
      name: "Karlos RaY",
      text: " umas Das classes homebrew mais bem construidas que eu ja vi",
      timestamp: 15691092733726,
      avatar: require("../assets/user3.png"),
      image:  require("../assets/post4.png")

    }


]


export default class TelaHome extends React.Component{
  
  renderPost = post=>{
    return(
        <View  style={styles.feeditem}>
          <Image source={post.avatar} style={styles.avatar}/>
          <View  style={{flex:1}}>
            <View  style={{flexDirection:"row", justifyContent:"space-between" , alignItems:"center"}}>
              <View>
                <Text  style={styles.name}> {post.name}</Text>
                <Text style={styles.timestamp}>{ moment(post.timestamp).fromNow()}</Text>
              </View>
              <Ionicons nome="more" size={24 } color="#FB5A48"/>
            </View>
            <Text style={styles.post}>{post.text}</Text>

            <Image source={post.image} style={styles.postimage} resizeMode= "cover"/>
            <View style={{flexDirection: "row"}}>
              <Ionicons name="heart-outline" size ={24}  color= "#37888" style={{marginRight:16}}/>
              <Ionicons name="chatbubbles" size ={24}  color= "#37888" />
            </View>
          </View>
        </View>

    )
  }
render(){
      
        return(

              <View style={styles.container}> 

                <View  style={styles.header}>
                      <Text style={styles.headertext}> Feed</Text>

                </View>
                <FlatList 
                style={styles.feed}
                 data={posts} 
                 renderItem={({item})=> this.renderPost(item)}
                 keyExtractor= {item => item.id }
                 showsVerticalScrollIndicator={false}
                 >

                </FlatList>
              </View>


        )

    }
  
}

 const styles= StyleSheet.create({
          container:{
            flex:1,
           backgroundColor:"#05A895B2"
          },
          header:{
            paddingTop: 20,
            alignItems:"center",
            paddingBottom: 16,
            backgroundColor: "#FB5A48",
            justifyContent:"center",
            borderBottomWidth:1,
            borderBottomColor: "#ebecf4",
            shadowColor: "#640C3F",
      
            shadowRadius: 15, 
            shadowOpacity: 0.2,
            zIndex:10
          },
        headertext:  {   
          fontSize: 25,
          fontWeight:"100"    
        },
        feed:{
          marginHorizontal: 10
        },
        feeditem:{
          backgroundColor: "#fff",
          borderRadius: 8,
          padding: 8,
          flexDirection:"row",
          marginVertical: 8
        },
        avatar:{
          width:36,
          height:36,
          borderRadius:16,
          marginRight: 16
        },
        name:{
          fontSize: 15,
           fontWeight: "500",
           color: "#454d65"

        },
        timestamp:{
          fontSize:11,
          color: "#A9A9A9",
          marginTop: 4
        },
        post:{
          marginTop: 16,
          fontSize: 14,
          color:"#838899"
        },
        postimage:{
          width: undefined,
          height: 250,
          borderRadius:5, 
          marginVertical: 15
        }

 })