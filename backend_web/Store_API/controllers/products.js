// create the controller functions 
// 1. get all products
const asyncWrapper = require("../middleware/async");
const Product = require("../models/product")
const getAllProductsStatic = asyncWrapper(async (req, res) => {
    const products = await Product.find({}).sort("name").select("name price");
    res.status(200).json({products, nbHits: products.length})
}
);
// 2. get single product
const getAllProducts = asyncWrapper(async (req, res) => {
    // select the fields that we want to return
    const {featured, company, name, sort, fields, numericFilters,page,limit} = req.query;
    const queryObject = {};
    if(featured){
        queryObject.featured = featured === "true" ? true : false;
    }
    if(company){
        queryObject.company = company;
    }
    if(name)
    {
        // set the name to any search term that contains the name
        queryObject.name = {$regex: name, $options: "i"};
    }
    if (numericFilters) {
        const operatorMap = {
          '>': '$gt',
          '>=': '$gte',
          '=': '$eq',
          '<': '$lt',
          '<=': '$lte',
        };
        const regEx = /\b(<|>|>=|=|<|<=)\b/g;
        let filters = numericFilters.replace(
          regEx,
          (match) => `-${operatorMap[match]}-`
        );
        const options = ['price', 'rating'];
        filters = filters.split(',').forEach((item) => {
          const [field, operator, value] = item.split('-');
          if (options.includes(field)) {
            queryObject[field] = { [operator]: Number(value) };
          }
        });
    }
    let result =Product.find(queryObject);
    if(sort)
    {
        const sortList = sort.split(",").join(" ");
        result = result.sort(sortList);
    }
    else{
        result = result.sort("createdAt");
    }
    if(fields)
    // select the fields that we want to return
    {
        const fieldsList = fields.split(",").join(" ");
        result = result.select(fieldsList);
    }
    else 
    {
        result = result.select("-__v");
    }
    if(page){
        const pageValue =  page * 1 || 1;
        const limitValue = limit * 1 || 10;
        const skipValue = (pageValue - 1) * limitValue;
        result = result.skip(skipValue).limit(limitValue);
    }

       
        
    const products = await result;
    res.status(200).json({products, nbHits: products.length});


});



module.exports = {
    getAllProductsStatic,
    getAllProducts,
}