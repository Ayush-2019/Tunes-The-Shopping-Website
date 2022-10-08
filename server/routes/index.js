const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./users.route');
const brandRoute = require('./brand.route');
const productRoute = require('./product.route')
const siteRoute = require('./site.route');
const transactionRoute = require('./transaction.route');
const router = express.Router();

const routeIndex = [
    {
        "path":'/auth',
        "route": authRoute
    },
    {
        "path":'/users',
        "route": userRoute
    },
    {
        "path":'/brands',
        "route":brandRoute
    },
    {
        "path":'/products',
        "route":productRoute
    },
    {
        "path":'/site',
        "route":siteRoute
    },
    {
        "path":'/transaction',
        "route":transactionRoute
    }
];

routeIndex.forEach((route) => {
    router.use(route.path, route.route);
})

module.exports = router;