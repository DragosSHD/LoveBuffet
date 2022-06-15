let rootRouter = require('express').Router();

rootRouter.use('/product', require("./product.routes"));
rootRouter.use('/users', require("./user.routes"));
rootRouter.use('/address', require("./address.routes"));
rootRouter.use('/auth', require("./authentication.routes"));
rootRouter.use('/foodApi', require("./foodApi.routes"));
rootRouter.use('/recipes', require("./recipe.routes"));
rootRouter.use('/history', require("./history.routes"));
rootRouter.use('/favourites', require("./favourites.routes"));

module.exports = rootRouter;

