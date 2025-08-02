import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({

     firstname : {
          type : String,
          required : true
       
     },
     lastname:{
          type :String,
          required: true
         
     },

     username :{
           type:String,
           required : true,
           unique : true
     },

     password :{
           type:String,
           required : true
     },

     email:{
          type : String,
          required : true
     },
     phonenumber : {
          type : String,
          required : true
     },
     address :{
          type :String,
          required : true
     },
     pincode:{
          type : String,
          required : true
     }
},{
     timestamps : true 
});

const Data = mongoose.model("Data", dataSchema);

export default Data;