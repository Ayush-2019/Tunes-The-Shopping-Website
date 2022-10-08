const httpStatus = require("http-status");
const { default: mongoose } = require("mongoose");
const { ApiError } = require("../middleware/apiError");
const { Product } = require("../models/product");

const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name:'dhvur49nm',
    api_key:'999733435919631',
    api_secret:`${process.env.CN_SECRET_KEY}`
})


const addProduct = async(args) => {
    try{
        const product = new Product({
            ...args
        });
        await product.save();
        return product;
    }catch(err){
        throw err;
    }
};

const getProductById = async(_id) => {
    try{
        
        const product = await Product.findById(_id).populate('brand');
        if(!product) throw new ApiError(httpStatus.NOT_FOUND,'Product not found');

        return product;

    }catch(err){
        throw err;
    }
};

const updateProductById = async(_id, args) => {
    try{
        const product = await Product.findOneAndUpdate(
            {_id},

            {"$set" : args},
            {new:true}
        );

        if(!product) throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
        return product;
    }
    catch(err){
        throw err;
    }
}

const deleteProductById = async(_id) => {
    try{
        const product = await Product.findByIdAndRemove(_id);

        if(!product) throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
        return product;
    }
    catch(err){
        throw err;
    }
}

const allProducts = async(req) => {
    try{

        const limit = parseInt(req.query.limit) || 3;
        const order = req.query.order || "asc";
        const sortBy = req.query.sortBy || '_id';

        const product = await Product.find({}).populate('brand')
        .sort([
            [sortBy,order]
        ])
        .limit(limit);

        if(!product) throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
        return product;
    }
    catch(err){
        throw err;
    }
}

const paginateProducts = async(req) => {
    try{
        // const example = {
        //     "keywords":"elite",
        //     "lt":200,
        //     "gt":500,
        //     "frets":56
        // }

        let aggQueryArray = [];

        if(req.body.keywords && req.body.keywords!=''){
            const reg = new RegExp(`${req.body.keywords}`,'gi');

            aggQueryArray.push({
                $match:{model:{$regex:reg}}
            });
        }

        if(req.body.brand && req.body.brand.length>0){
            let newBrandsArray = req.body.brand.map((brand)=>(
                mongoose.Types.ObjectId(brand)
            ));

                aggQueryArray.push({
                    $match:{brand:{$in:newBrandsArray}}
                })

        }

        if(req.body.frets && req.body.frets.length>0){

                aggQueryArray.push({
                    $match:{frets:{$in:req.body.frets}}
                })

        }

        if(req.body.min && req.body.min>0 || req.body.max && req.body.max<5000 ){

            if(req.body.min){
                aggQueryArray.push({$match:{price:{$gt:req.body.min}}});
            }

            if(req.body.max){
                aggQueryArray.push({$match:{price:{$lt:req.body.max}}});

            }
            }

        aggQueryArray.push(
            {$lookup:
            
                {
                    from:"brands",
                    localField:"brand",
                    foreignField:"_id",
                    as:"brand"
                }
            },
            {$unwind:'$brand'}

        )

        let aggQuery = Product.aggregate(aggQueryArray);
        const options = {
            page:req.body.page,
            limit:5,
            sort:{date:'desc'}
        };
        const product = await Product.aggregatePaginate(aggQuery, options);

        return product;
    }catch(err){
        throw err;
    }
}

const uploadImage = async(req)=>{
    try{

        const upload = await cloudinary.uploader.upload(req.files.file.path,{
            public_id:`${Date.now()}`,
            folder:'tunes_images'
        });
        console.log(upload)
        return{
            public_id:upload.public_id,
            url:upload.url
        }
    }catch(err){
    throw err
    }
}



module.exports = {
    addProduct,
    getProductById,
    updateProductById,
    deleteProductById,
    allProducts,
    paginateProducts,
    uploadImage
}