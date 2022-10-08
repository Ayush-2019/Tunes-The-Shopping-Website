const {siteService} = require('../services')

const siteController = {

    async postSiteArgs(req, res, next){
        try{

                const site = await siteService.postSiteArgs(req);

                res.json(site)
        }catch(err){
            next(err)
        }
    },

    async getSiteargs(req, res, next){
        try{

                const site = await siteService.getSiteArgs(req);

                res.json(site)
        }catch(err){
            next(err)
        }
    },

    async updateSiteArgs(req, res, next){
        try{

                const site = await siteService.updateSiteArgs(req);

                res.json(site)
        }catch(err){
            next(err)
        }
    }
};

module.exports =siteController;