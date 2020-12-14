const express=require('express');
const BodyParser=require('body-parser');
const app=express();
const Route=require('./Routes/route');

const {mongoose} = require('./Database/Connection');  

    app.use(BodyParser.json());

    app.use(BodyParser.urlencoded({extended:true}));

    app.use(express.static('public'));
     

      app.use('/ticket',Route);  
      
      let port=process.env.PORT;
      if(port==null ||port=="")
      {
        port=9000;
      }
      
     

      
      app.listen(port,() => {
        console.log('listening at port 9000');
      });

