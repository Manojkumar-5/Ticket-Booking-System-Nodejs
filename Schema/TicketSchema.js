const mongoose = require("mongoose");
const TicketSchema = mongoose.Schema({
        Number:{
            type:Number,
            min:1,
            max:40,
        },
        Status:{
            type:String,
        },
}
)
module.exports=mongoose.model("ticket",TicketSchema);