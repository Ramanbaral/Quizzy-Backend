const Subcategory = require('../models/subcategory')
const Category = require('../models/category')

exports.getSubcategory = (req,res,next) => {

    const slug = req.params.catslug 
    
    Category.findOne({slug:slug}).select("_id")
    .then( cat => {
        const id = cat._id

        return Subcategory.find({category_id :id})
    })
    .then( subcats => {
        res.status(200).json({subcategories : subcats})
    })
    .catch( err => {
        const error = new Error('problem during fetching sub category')
        error.statuscode = 500;
        next(error)
        throw error
    })

}


exports.createSubcategory = (req,res,next) => {
    //getting the datas from request
    const title = req.body.title;
    const desc = req.body.desc;
    const image = req.file.path;
    const slug = req.body.slug;
    const categorySlug = req.body.category_slug;
    let catId;

    Category.find({slug:categorySlug})

    .then( cat => {  
        if(cat.length == 0){
            res.status(404).json({'message':"category doesn't exists! "})
        }
        //creating subcategory
        catId = cat[0]._id;
        const sc = new Subcategory({title:title,desc:desc,image:image,slug:slug,category_id:cat[0]._id})
        sc.save()
    })

    .then( () => {
        res.status(201).json({message:'sub Catagory created successfully'})
        return  Category.findById(catId)
    })

    .then( cat => {
        cat.subcategory_count += 1;
        cat.save()
    })

    .catch(err => {
        const error = new Error('Error creating subcategory ');
        error.statuscode = 500;
        next(error)
        throw error;
    })

}