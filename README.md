Tunes-The Shopping website is an e-commerce website that has various guitars as the product to be sold and purchased by customers. This project is a full-stack project developed using MERN Stack. The server side code is written using ExpressJS Framework. MongoDB is used to store the required data, retreive it and modify it as per user operations. The following Models are created on MongoDB:- 

-> User model to store User data like firstname, lastname, email, password, user cart containing items, purchase history and user role(general user or admin) that has rules for each field
-> Product model to store product details like Model, Brand name, Price, details of images of products etc that has rules for each field 
-> Brand model that stores various brand names that has rules for each field.
-> Site Vars model that stores details like address, office timings, contact no. etc. for the organistion and has rules for each field.

Various routes are created that creates end-points to perform various operations, being it registering new user, signing in previous user, adding, updating and deleting of previous products, and updating user details.

Nodemailer and Mailgen are used in order to generate a mail for authenticating user email address, whenever the user registers, or updates the email address. The link sent via mail is used to authenticate the mail and update the change on database.

The password is encrypted using bcrypt library, so that encrypted password that has salt is stored on database, and the same is retreived and verified when signing in.

josnwebtoken is used to generate a token and store it as a cookie when the user sign in.

Site vars like address, office timings, contact no. etc. can also be added and updated using the routes created for the same.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
