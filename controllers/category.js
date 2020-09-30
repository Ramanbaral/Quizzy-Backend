const Category = require('../models/category')

exports.getCategory = (req,res,next) => {

    Category.find({})
    .then( cats => {
        res.status(200).send({categories : cats})
    })
    .catch( err => {
        const error= new Error("can't get categories")
        error.statuscode = 500;
        next(error)
        throw error;
    })

}

exports.createCategory = (req,res,next) => {
    //getting the datas from request
    const title = req.body.title;
    const shortDesc = req.body.shortDesc;
    const longDesc = req.body.longDesc;
    const image = req.file.path;
    const slug = req.body.slug;

    //creating category
    const sc = new Category({title:title,short_desc:shortDesc,long_desc:longDesc,image:image,slug:slug})
    sc.save()
    .then( () => {
        res.status(201).json({message:'Catagory created successfully'})
    })
    .catch(err => {
        const error = new Error('Error creating category ');
        error.statuscode = 500;
        next(error)
        throw error;
    })

}