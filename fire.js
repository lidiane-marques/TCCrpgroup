import * as firebase from "firebase"
import "firebase/firestore";
var firebaseConfig = {
  apiKey: "AIzaSyBwDC0t3Ztv-uwv0o40NiJ0XlmfCcYk6sQ",
 authDomain: "meu-tcc1.firebaseapp.com",
 projectId: "meu-tcc1",
 storageBucket: "meu-tcc1.appspot.com",
messagingSenderId: "597425340066",
 appId: "1:597425340066:web:628b1e5d25f6dfeb7ea1fb"
};


class Fire{
  constructor(){
    firebase.initializeApp(firebaseConfig)
  }

  addPost = async ({text,localUri}) =>{
    const remoteUri = await this.uploadPhotoAsync(localUri, 'photos/${this.uid}/${Date.now()}')

    return new Promise((res, rej) => {
      this.firestore.collection("posts")
      .add({
          text,
          uid:this.uid,
          timestamp: this.timestamp,
          image: remoteUri
      })
      .then(ref=>{
         res(ref)
      })
      .catch(error => {
        rej(error)
      })
    })
  }

  uploadPhotoAsync  = async (uri, filename) => {
    //const path =;
    return new Promise(async(res,rej)=>{
      const response= await fetch(uri);
      const file = await response.blob();

      let upload = firebase
      .storage()
      .ref(filename)
      .put(file);

      upload.on(
        "state_changed",
        snapshot=> {},
        err=>{
          rej(err)
        },
        async() =>{
          const url = await upload.snapshot.ref.getDownloadURL()
          res(url);
        }
      )
    }
    )

  }
    creaerUser = async user =>{
      let remoteUri = null
      try{
        await firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        let db= this.firestore.collection("users").doc(this.uid)
        db.set({
          name: user.name,
          email: user.email, 
          avatar: null
        })
        if(user.avatar){
          remoteUri= await this.uploadPhotoAsync(user.avatar,'avatar/${this.uid}')
          db.set({avatar: remoteUri}, {marge: true})
        }
      } catch(error){
        alert("Error: " , error)
      }
    }


   signOut=()=>{
      firebase.auth().signOut()
    }
  get firestore() {
    return firebase.firestore()
  }
  get uid(){
    return(firebase.auth().currentUser || {}).uid
  }
  get timestamp(){
    return Date.now()
  }
}

Fire.shared= new Fire();
export default Fire