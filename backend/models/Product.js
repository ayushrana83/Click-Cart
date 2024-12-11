const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique : true 
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: [0, "least price"],
  },
  discountPercentage: {
    type: Number,
    required: true,
    min: [0, "least discountt"],
    max: [100, "max discount"],
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  deleted: {
    type: Boolean,
    required: true,
    default: false,
  },
  images: {
    type: [String],
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: [1, "minimum rating"],
    max: [5, "maximum rating"],
  },
  stock: {
    type: Number,
    required: true,
    min: [0, "minimum stock"],
  },
  colors : {
    type : [mongoose.Schema.Types.Mixed]
  },
  sizes : {
    type : [mongoose.Schema.Types.Mixed]
  },
  highlights : {
    type : [String]
  },
  discountedPrice : {
    type : Number,
  }
}, {timestamps : true});

const virtual = ProductSchema.virtual('id');
virtual.get(function(){
  return this._id;
})

ProductSchema.set("toJSON" , {
  virtuals : true ,
  versionKey : false ,
  transform : function(doc , ret) { delete ret._id}
})


const Product = mongoose.model("Product" , ProductSchema);
module.exports = Product;