const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const multer = require('multer')

const quizappRoutes = require('./routes/quizapp')

const app = express()

//parsing the json body
app.use(bodyparser.json())

app.use('/images',express.static('images'))

const fileStorage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,'images/category and subcategory images')
    },
    filename:(req,file,cb) => {
        cb(null,Date.now().toString()+"-"+ file.originalname)
    }
})

const filterFile = (req,file,cb) => {
    if(file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg'){
        cb(null,true);
    }
    else{
        cb(null,false);
    }
}

app.use(multer({storage:fileStorage,fileFilter:filterFile}).single('image'))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

//--------------------          routes here               --------------------------
app.use(quizappRoutes)



//error handler
app.use((err,req,res,next) => {
    const message = err.message;
    const statuscode = err.statuscode || 500;
    res.status(statuscode).json({message:message,error:true})
})

mongoose.connect('mongodb://localhost/quiz',{useUnifiedTopology:true,useNewUrlParser:true})
.then( result => {
    console.log('connected')
    app.listen(8000)
})
.catch( err => {
    const error = new Error("problem connecting with database.")
    error.statuscode = 500
    throw error;
})



