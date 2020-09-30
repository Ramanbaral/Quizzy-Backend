const mongoose = require('mongoose')

const Category = require('../models/category')
const Question = require('../models/questions')
const Subcategory = require('../models/subcategory')

exports.createQuestion = (req,res,next) => {

    //getting data from 
    console.log(req.body)
    const question = req.body.question;
    const options = req.body.options;
    const  answer = req.body.answer;
    const soln = req.body.solution;
    const subcategorySlug = req.body.subcategory_slug
    let subcatId;

    Subcategory.find({slug:subcategorySlug})
    .then( subcat => {
        if(subcat.length == 0){
            res.status(404).json({message:"sub Category doesn't exists!"})
        }
        //creating the question
        subcatId = subcat[0]._id;
        const que = new Question({question:question, options:options, answer:answer ,solution:soln, subcategory_id:subcatId})
        return que.save()
    })

    .then( () => {
        res.status(201).json({message:'Question created successfully '})
        return Subcategory.findById(subcatId)
    })

    .then( subcat => {
        subcat.question_count += 1;
        subcat.save()
        return Category.findById(subcat.category_id)
    })

    .then( cat => {
        cat.question_count += 1;
        cat.save()
    })

    .catch( err => {
        console.log(err)
        const error = new Error('Problem creating question');
        error.statuscode = 500;
        next(error);
        throw error;
    })
}

exports.getQuestions = (req,res,next) => {
    //get datas from url 
    const slug = req.params.slug;
    const testtype = req.params.testtype;

    Subcategory.find({slug:slug})
    .then( subcat => {
        const id = subcat[0]._id;

       return Question.find({subcategory_id:id})
    } )
    .then( ques => {
        res.status(200).json({message:"successfully fetched questions" , questions:ques})
    })
    .catch( err => {
        const e = new Error("Problems fetching questions!");
        next(e);
        throw e;
    })

}