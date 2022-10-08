const { User } = require("../models/user");
const httpStatus = require('http-status');
const {ApiError} = require('../middleware/apiError');
const userService = require('./user.service');

const createUser = async(email, password) => {
        try{

                if(await User.emailTaken(email)){
                        throw new ApiError(httpStatus.BAD_REQUEST, 'Sorry, email is already taken');
                }

                const user = new User({
                        email,
                        password
                });
                await user.save();
                return user;
        }
        catch(err){
                throw new ApiError(httpStatus.BAD_REQUEST, 'Sorry, email is already taken');
        }

}

const genAuthToken = (user) => {
        const token = user.generateAuthToken();
        return token;
}

const signInWithEmailndPswd = async(email, password) => {
        try{

                const user = await userService.findUserByEmail(email);

                if(!user){
                        throw new ApiError(httpStatus.UNAUTHORIZED, 'Sorry, email not found, please register');
                }

                if(!(await user.comparePswd(password))){
                        throw new ApiError(httpStatus.UNAUTHORIZED, 'Sorry, wrong password');
                }

                return user;
        } catch(error){
                 throw error;
        }
}

module.exports = {
    createUser,
    genAuthToken,
    signInWithEmailndPswd
}