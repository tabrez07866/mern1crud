const express = require("express");
const app=express();
const mongoose=require("mongoose")
const dotenv=require("dotenv")
dotenv.config()
const cors=require("cors")
app.use(cors())

const userRoute=require("./routes/useRoute.js")

app.use(express.json())

app.get('/favicon.ico', (req, res) => {
    res.sendFile(path.join(__dirname, ));
  });
  
  // Your other routes and middleware
  const userRoutes = require('./routes/useRoute');
  app.use('/users', userRoutes);
  
  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

mongoose.connect(process.env.URI)
.then(()=>{
        console.log("connected successfully");
        app.listen(process.env.PORT || 8000 ,(err)=>{
            if(err)console.log(err);
            console.log("running successfully at",process.env.PORT)
        });
    })
    .catch((error)=>{
        console.log("error: ",error);
    });

    //create API
    app.use(userRoute)