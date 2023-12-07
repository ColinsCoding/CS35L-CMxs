# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Enviornmental Variables

Before running the program, create a file named ".env" with the following format in the `/backend` directory:
```
SECRET_TOKEN= {Your own secret string for generating tokens}
MONGODB_URL= {Your MongoDB URL}
```

## Install Modules

Please run: `npm install` in both the `/backend` and `/frontend` directories.\
This will install all needed modules.

## Available Scripts

In the backend directory, you can run:

### `node index.js`

Starts up the database in [http://localhost:5555](http://localhost:5555).\
Enter personal database details in `/backend/config.js`

### `npm start`
Runs the front endapp in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Sources Used

1. Carnes B. MERN Stack Crash Course – Build a Book Store App [Internet]. freeCodeCamp.org. 2023 [cited 2023 Dec 7]. Available from: [https://www.freecodecamp.org/news/mern-stack-crash-course/](https://www.freecodecamp.org/news/mern-stack-crash-course/)

2. Ninja N. MERN Auth Tutorial - YouTube [Internet]. www.youtube.com. 2022. Available from: [https://www.youtube.com/playlist?list=PL4cUxeGkcC9g8OhpOZxNdhXggFz2lOuCT](https://www.youtube.com/playlist?list=PL4cUxeGkcC9g8OhpOZxNdhXggFz2lOuCT)

3. Navbars - Official Tailwind CSS UI Components [Internet]. www.tailwindui.com. [cited 2023 Dec 7]. Available from: [https://tailwindui.com/components/application-ui/navigation/navbars](https://tailwindui.com/components/application-ui/navigation/navbars)

4. User login & Authentication: <br>
  "User Authentication in Node.js." MakeUseOf. Available at: https://www.makeuseof.com/user-authentication-in-nodejs/ <br>
  "Node.js Authentication using Passport.js and Passport-Local Mongoose." GeeksforGeeks. Available at: https://www.geeksforgeeks.org/node-js-authentication-using-passportjs-and-passport-local-mongoose/ <br>
  Express-MongoDB-Authentication Repository. LintangWisesa. GitHub. Available at: https://github.com/LintangWisesa/Express-MongoDB-Authentication/tree/master <br>

5. React JS - React Tutorial for Beginners. YouTube. 2022. Available from: [https://www.youtube.com/watch?v=IAD68la3An8](https://www.youtube.com/watch?v=IAD68la3An8)

6. Popovic, Aleksandar. "How to build a Pixel Art Drawing App in React." aleksandarpopovic.com. Available from: [https://aleksandarpopovic.com/How-to-build-a-Pixel-Art-Drawing-App-in-React/](https://aleksandarpopovic.com/How-to-build-a-Pixel-Art-Drawing-App-in-React/)

---

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
