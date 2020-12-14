const mongoose = require("mongoose");

const PassengerSchema = mongoose.Schema({
        Name:{
            type:String,
            required:true
        },
        Age:{
            type:Number,
            required:true
        },
        Gender:{
            type:String,
            required:true
        },
        From:{
            type:String,
            required:true
        },
        To:{
            type:String,
            required:true
        },
        Mobile:{
            type:String,
            required:true
        },
        Seatnumber:{
            type:Number,
            required:true
        },
        Seattype:{
            type:String,
            required:true
        },

}
)

module.exports=mongoose.model("passenger",PassengerSchema);