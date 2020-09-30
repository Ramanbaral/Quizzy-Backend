const express = require('express')

                                                        // controllers
const categoryController = require('../controllers/category')
const subcategoryController = require('../controllers/subcategory')
const questionController = require('../controllers/questions')

const router = express.Router()

//___________------------------_________________---------------------_________________--------------------________________--------------------_________
//                                                                                           category - get

router.get('/getCategory',categoryController.getCategory)

//___________-----------------__________________--------------------_________________--------------------_________________-----------------___________
//                                                                                          Admin category - post,put,delete
router.post('/category/create', categoryController.createCategory)




//___________-----------------__________________--------------------_________________--------------------_________________-----------------___________
//                                                                                               Sub Category - get

router.get('/:catslug',subcategoryController.getSubcategory)

//___________-----------------__________________--------------------_________________--------------------_________________-----------------___________
//                                                                                                 Admin Sub Category  - post,put,delete
router.post("/subcategory/create" , subcategoryController.createSubcategory)





//___________-----------------__________________--------------------_________________--------------------_________________-----------------___________
//                                                                                                      Questions - get 

router.get('/:slug/:testtype',questionController.getQuestions)


//___________-----------------__________________--------------------_________________--------------------_________________-----------------___________
//                                                                                                         Admin Question - post,put,delete
router.post('/question/create', questionController.createQuestion)




module.exports = router;