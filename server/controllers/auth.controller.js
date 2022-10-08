const {authService, emailService} = require('../services');
const httpStatus = require('http-status');

authController = {

    async register(req, res, next){
        try{

            const{email, password} = req.body;
            const user = await authService.createUser(email, password);
            const token = await authService.genAuthToken(user);

            await emailService.registerEmail(email, user);

            res.cookie('x-access_token', token).status(httpStatus.CREATED).send({
                user,
                token
            })
        } catch(error){
            console.log(error);
            next(error);
        }
    },
    async sign_in(req, res, next){
        try{
            const {email, password} = req.body;
            const user = await authService.signInWithEmailndPswd(email, password);
            const token = await authService.genAuthToken(user);

            res.cookie('x-access_token', token).send({
                user,
                token
            })
            

            } catch(error){
                next(error);
            }
    },
    async isauth(req, res, next){
        res.json(req.user)
    },
    async dog(req, res, next){
        res.json({'ok':true})
    }
}

module.exports = authController;