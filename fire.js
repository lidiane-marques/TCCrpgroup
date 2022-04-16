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
    const remoteUri = await this.uploadPhotoAsync(localUri)

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

  uploadPhotoAsync  = async uri=>{
    const path ='photos/${this.uid}/${Date.now()}.jpg';
    return new Promise(async(res,rej)=>{
      const response= await fetch(uri);
      const file = await response.blob();

      let upload = firebase.storage().ref(path).put(file);

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