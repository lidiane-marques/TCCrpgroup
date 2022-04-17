import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'



class Permicao{
  getCammeraPermission= async() =>{
  if(Constants.platform.ios){
      const { status} = await Permissions.askAsync(Permissions.CAMERA)

      if (status!="granted"){
        alert(" permite que o app acesse suas  fotos")
      }
  }
}
}

export default new Permicao();