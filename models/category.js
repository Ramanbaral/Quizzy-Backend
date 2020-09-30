const mongoose = require('mongoose')
const schema = mongoose.Schema

const categorySchema = new schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    image:{
        type:String,
        required:true,
    },
    short_desc:{
        type:String,
        required:true
    },
    long_desc:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        unique:true,
        required:true
    },
    subcategory_count:{
        type:Number,
        default:0
    },
    question_count:{
        type:Number,
        default:0
    }
},{timestamps:true})

module.exports=mongoose.model('Category',categorySchema)