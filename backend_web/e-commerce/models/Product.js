const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide product name'],
            trim: true,
            maxlength: [100, 'Product name cannot exceed 100 characters'],
        },
        price: {
            type: Number,
            required: [true, 'Please provide product price'],
            maxlength: [5, 'Product name cannot exceed 5 characters'],
            default: 0.0,
        },
        description: {
            type: String,
            required: [true, 'Please provide product description'],
            trim: true,
            maxlength: [500, 'Product name cannot exceed 500 characters'],
        },
        images: {
            type: [String],
            default: [
                'https://res.cloudinary.com/dk-find-out/image/upload/q_80,w_1920,f_auto/DCTM_Penguin_UK_DK_AL432958_hyjz9o.jpg',
            ],
        },
        category: {
            type: String,
            required: [true, 'Please provide product category'],
            enum: {
                values: ['office', 'kitchen', 'bedroom'],
                message: '{VALUE} is not supported',
            }
        },
        company: {
            type: String,
            required: [true, 'Please provide company'],
            enum: {
                values: ['ikea', 'liddy', 'marcos'],
                message: '{VALUE} is not supported',
            },
        },
        colors: {
            type : [String],
            default: ['#222'],
            required: true,
        },
        featured: {
            type: Boolean,
            default: false,
        },
        freeShipping: {
            type: Boolean,
            default: false,
        },
        inventory: {
            type: Number,
            required: true,
            default: 15,
        },
        SKU: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            maxlength: [20, 'Product SKU cannot exceed 20 characters'],
        },
    });

// pre save generate SKU
ProductSchema.pre('save', function (next) {
        const productName = this.name.toLowerCase().replace(/\s/g, '');
        const categoryCode = this.category.slice(0, 2).toUpperCase();
        const companyCode = this.company.slice(0, 2).toUpperCase();
        const randomNum = Math.floor(Math.random() * 1000);
        const sku = `${productName}-${categoryCode}-${companyCode}-${randomNum}`;
        this.SKU = sku;
        next();
});
module.exports = mongoose.model('Product', ProductSchema);