const paypal = require('@paypal/checkout-server-sdk');
require('dotenv').config();

let clientId = process.env.PAYMENT_CLIENT_ID;
let secretCode = process.env.PAYPAL_SECRET_KEY;
let environment = new paypal.core.SandboxEnvironment(clientId, secretCode);
let client = new paypal.core.PayPalHttpClient(environment);

module.exports = {
    client
}