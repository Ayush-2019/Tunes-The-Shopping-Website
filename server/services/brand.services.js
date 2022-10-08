const httpStatus = require("http-status");
const { ApiError } = require("../middleware/apiError");
const { Brand } = require("../models/brand")

const addBrand = async(brandname) => {
    try{
        const brand = new Brand({
            name:brandname
        });
        await brand.save();

        return brand;
    }catch(err){
        throw err;
    }
}

const getBrandById = async(id) => {
    try{
        const brand = await Brand.findById(id);
        if(!brand) throw new ApiError(httpStatus.NOT_FOUND, 'No such Guitar Found');

        return brand;
    }catch(error){
        throw error;
    }
}

const deleteBrandById = async(id) => {
    try{
        const brand = await Brand.findByIdAndRemove(id);
        return brand;
    }catch(error){
        throw error;
    }
}

const getAllBrands = async(args) => {
    try{
        let order = args.order?args.order:"asc";
        let limit = args.limit?args.limit:10;

        const brands = await Brand
        .find({})
        .sort([
            ["id",order]
        ])
        .limit(limit);

        if(!brands) throw new ApiError(httpStatus.NOT_FOUND, 'No Brands Found');
        return brands;
    }catch(error){
        throw error;
    }
}

module.exports = {
    addBrand,
    getBrandById,
    deleteBrandById,
    getAllBrands
}