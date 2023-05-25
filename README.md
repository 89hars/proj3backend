# FinestDeal.

# MVP
* eCommerce for selling and buying art related products.
* A page to display all the art products on sale.
* A page to create a especific product and upload an image of it.
* A page with the details of the created product.
* A shopping wagon connected to a payment system and linked to a session.
* A user profile to display the products linked to the especific session.

# About
* Backend running using ExpressJs.
* Middleware Functions to secure routes and conect with cloud services to store images.
* Bycrypt to hash the password
* Possibility of storing images using Claudinary
* Payment system habilitated via credit card or PayPal
* Project deployed on Adaptable

# Backlog
* Adding a mechanism for users to interact between them.
* Adding a favorites functionality to the profile. 
* Incoporating a comment model.
* Incoporating a model for Stores and a clear way of handle revenews, taxes and shippings. 

# Data Structure
```
├── Config
│   └── index.js
├── db
│   └── index.js
├── error-handling
│   └── index.js
│   
├── middleware
│   └── cloudinary.config.js
│   └── jwt.middleware.js
├── models
│   │   └── Cart.Model.js
│   │   └── Media.models.js
│   │   └── Order.model.js
│   │   └── Product.model.js
│   │   └── User.model.js
├── node_modules
│   │   ├── CartContext.jsx
│   │   ├── SearchContext.jsx
│   │   └── SessionContext.jsx
├── Routes
│   │   ├── auth.routes.js
│   │   ├── cart.routes.js
│   │   ├── details.routes.js
│   │   ├── index.routes.js
│   │   ├── other.routes.js
│   │   ├── product.routess.js
│   │
├── .env
├── package-lock.json
├── package.json
├── server.js

```




