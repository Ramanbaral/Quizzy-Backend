const mongoose = require('mongoose')
const schema = mongoose.Schema 

const Category = require('./category')
const subcategorySchema = schema({
    title:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        unique:true,
        required:true
    },
    question_count:{
        type:Number,
        default:0
    },
    category_id:{
        type:schema.Types.ObjectId,
        ref:Category,
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model('Subcategory',subcategorySchema)