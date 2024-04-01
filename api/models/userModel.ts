import mongoose ,{Schema ,Model} from 'mongoose'
import { Iuser } from '../types/userEntity'

const userSchema:Schema<Iuser> = new mongoose.Schema({

    username:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required:true,
        unique:true,    

    },
    password:{
        type: String,
        required:true
    },
    isAvatarImageSet:{
        type:Boolean,
        default:false
    },
    avatarImage :{
        type:String,
        default:'',
    },

   
})


const userModel:Model<Iuser> = mongoose.model('user',userSchema)
export default userModel