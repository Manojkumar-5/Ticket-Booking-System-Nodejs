var express = require('express')
var router = express.Router()
const mongoose=require('mongoose');
var nodemailer = require('nodemailer');
var db=mongoose.Connection;
mongoose.set('useFindAndModify', false);

const LoginSchema=require('../Schema/LoginSchema');

const TicketSchema=require('../Schema/TicketSchema');

const PassengerSchema=require('../Schema/PassengerSchema');


router.get('/',function(req,res)
{
  res.send('welcome to ticket booking application ');
});





    router.post('/user', async(req,res) =>{
        var Login=new LoginSchema({
        Name : req.body.Name,
        Email: req.body.Email,
        Password: req.body.Password
    });
    await Login.save();
    res.json(Login);
    }
    );


    router.post('/init', async(req,res) =>{
          
      var Ticket=new TicketSchema({
        Number : req.body.Number,
        Status: req.body.Status,
    });
    await Ticket.save();
    res.json(Ticket);
    }
    );


  router.get("/login", async(req,res) => {
      var logins = await LoginSchema.find();
      res.json(logins);
  })
  
  router.get("/open", async(req,res) => {
    var OpenTickets = await TicketSchema.find({"Status":"Open"});
    res.json(OpenTickets);
})

router.get("/close", async(req,res) => {
  var ClosedTickets = await TicketSchema.find({"Status":"Close"});
  res.json(ClosedTickets);
})


router.put("/updateTicket",async(req,res) => {
  var updatedTicket=await TicketSchema.updateOne({_id:req.body._id},{$set:{
    Number:req.body.Number,
    Status:req.body.Status
  }});

  res.json(updatedTicket);
})



router.put("/admin",async(req,res) => {
    var Name=req.body.Name;
    var Password=req.body.Password;

    if(Name!="admin" || Password!="admin")
    res.json("Enter valid admin credentials");


  var admin=await TicketSchema.updateMany({$set:{
    Status:"Open"
  }});

  res.json("Seats are open now - Admin");
})




router.post('/passenger', async(req,res) =>{
  var flag=0;

  if(req.body.Seatnumber>40 || req.body.Seatnumber<1)
  res.json("Enter a valid seat number");

  else
  {

  
  TicketSchema.find({Number:req.body.Seatnumber,Status:"Open" }, (err, doc) => {
    if (err) 
    {
      flag=1;
 
      res.json("Invalid Seatnumber");
         }
    if(doc && !doc.length)
    {
      flag=1;
      res.json("Seat already booked");
     
    }

})

  
if(flag!=1)
{
  var passenger=new PassengerSchema({
  Name : req.body.Name,
  Age: req.body.Age,
  Gender: req.body.Gender,
  From: req.body.From,
  To: req.body.To,
  Mobile: req.body.Mobile,
  Seatnumber: req.body.Seatnumber,
  Seattype: req.body.Seattype,

});

var update=await TicketSchema.findOneAndUpdate({Number:req.body.Seatnumber},{Status:"Close"},{
  new:true,
  upsert:true
});
await passenger.save();
res.json(passenger);
  }
}

}
);


router.put("/updatePassenger",async(req,res) => {
  var updatedPassenger=await PassengerSchema.updateOne({_id:req.body._id},{$set:{
  Name : req.body.Name,
  Age: req.body.Age,
  Gender: req.body.Gender,
 
  }});

  res.json(updatedPassenger);
})


router.get("/passengerdata", async(req,res) => {
  var pass = await PassengerSchema.find();
  res.json(pass);
})



router.post('/mail', function(request,response) {

    var email=request.body.email;    
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'ticketbookingmd@gmail.com',
        pass: 'inmyveins'
      }
    });
    
    var mailOptions = {
      from: 'ticketbookingmd@gmail.com',
      to: email,
      subject: 'Ticket booking done for '+request.body.name+' seat number '+request.body.seatnumber,
      text: 'Have a nice journey!'
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
        response.send('enter valid mail id');
      } else {
        console.log('Email sent: ' + info.response);
        response.send('email sent to '+request.body.email);
      }
    });
    
    });
    




    module.exports = router


