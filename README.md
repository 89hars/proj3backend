# Title

#MVP
* eCommerce for selling and buying art related products.
* A page to display all the art products on sale.
* A page to create a especific product and upload an image of it.
* A page with the details of the created product.
* A shopping wagon connected to a payment system and linked to a session.
* A user profile to display the products linked to the especific session.

# Backlog
* Adding a way for users to interact between them.
* Adding a favorites functionality to the profile. 

# Data Structure
```
├── middleware
│   └── PrivateRoute.jsx
├── node_modules
├── public
│   ├── Images
│   └── _redirects
├── src
│   ├── assets
│   │   └── react.svg
│   ├── components
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Layouts.jsx
│   │   ├── Search.jsx
│   │   └── TableOfProducts.jsx
│   ├── context
│   │   ├── CartContext.jsx
│   │   ├── SearchContext.jsx
│   │   └── SessionContext.jsx
│   ├── pages
│   │   ├── About.jsx
│   │   ├── Products.jsx
│   │   ├── Cart.jsx
│   │   ├── Contact.jsx
│   │   ├── Create.jsx
│   │   ├── Details.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Privacy.jsx
│   │   ├── Profile.jsx
│   │   ├── Search.jsx
│   │   └── Signup.jsx
├── app.jsx
├── index.css
├── main.jsx
├── .env
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── package-loc.json
└── vite.config.js
```

# Data Structure
* Backend running using ExpressJs and MongoDb.
* Middleware Functions to secure routes and conect with cloud services to store images.
* Bycrypt to hash the password
* Possibility of storing images using Claudinary
* Five models to communicate with the DB, and handle the differents functionalitys of the app.
* Payment system habilitated via credit card or PayPal
* Project deployed on Adaptable

