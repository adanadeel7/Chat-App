import mongoose from "mongoose";
import { boolean, string } from "zod";

interface userInterface { 
    
    name : string, 
    email : string, 
    password : string, 
    profilePic : string, 
    bio : string,
    tokenVersion : number;
    
}

const userSchema = new mongoose.Schema<userInterface>({
    name : { 
        type : String, 
        required : true, 
    },

    email : { 
        type : String, 
        required : true, 
        unique : true
    },

    password : { 
        type : String, 
        required : true, 
    },

    profilePic : { 
        type : String, 
    },

    bio : { 
        type : String, 

    },
    tokenVersion : {
       type : Number, 
        default : 0 

    },

    

}, {
    timestamps : true
})


const User = mongoose.model<userInterface>("User",userSchema)

export {User, userInterface}