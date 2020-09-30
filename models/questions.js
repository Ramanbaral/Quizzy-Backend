const mongoose = require('mongoose')
const {Schema} = require('mongoose')
const subcategory = require('./subcategory')

const questionSchema = new Schema({
    question:{
        type:String,
        required:true
    },
    options:[
        {
            id:{
                type:Number,
                required:true
            },
            option:{
                type:String,
                required:true
            }
        }
    ],
    answer:{
        type:Number,
        required:true
    },
    solution:{
        type:String
    },
    subcategory_id:{
        type:Schema.Types.ObjectId,
        ref: subcategory,
        required:true
    }
    
},{timestamps:true})

module.exports = mongoose.model('Question',questionSchema)