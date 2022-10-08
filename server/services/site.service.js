const httpStatus = require('http-status');
const { ApiError } = require('../middleware/apiError');
const {Site} = require('../models/site');

const postSiteArgs = async(req) =>{

    try{
        const site = new Site({
            ...req.body
        });

        await site.save();
        return site;
    }catch(err){
        throw err;
    }
}

const getSiteArgs = async(req) =>{

    try{
        const site = await Site.find({});

        if(!site) throw new ApiError(httpStatus.NOT_FOUND,'Site not found');

        return site[0];

    }catch(err){
        throw err;
    }
}

const updateSiteArgs = async(req) =>{

    try{
        const site = await Site.findOneAndUpdate({_id:req.body._id},
            
                {
                    "$set":req.body
                },
                {new:true}
            );

        if(!site) throw new ApiError(httpStatus.NOT_FOUND,'Site not found');

        return site;

    }catch(err){
        throw err;
    }
}

module.exports = {
    postSiteArgs,
    getSiteArgs,
    updateSiteArgs
}