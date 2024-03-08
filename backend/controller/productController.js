const Product = require('../model/Product.js');
const multer = require('../middleware/upload.js');
const sharp = require("sharp");
const cloudinary = require("../middleware/cloudinary.js");

const uploadImage = multer.single('image');
const resizeImage = async (req, res, next) => {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ message: 'Missing required parameter - file' });
    }
    
    const resizedImage = await sharp(req.file.buffer)
      .resize(300, 250)
      .toFormat("jpeg")
      .jpeg({ quality: 50 })
      .toBuffer();
    req.image = resizedImage.toString('base64');
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const addImageToCloud = async (req, res, next) => {
  try {
    if (!req.image) {
      return res.status(400).json({ message: 'Missing required parameter - image' });
    }
    
    const result = await cloudinary.uploader.upload(`data:image/jpeg;base64,${req.image}`, {
      folder: "products"
    });
    req.result = result;
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const addProduct = async (req, res) => {
  const { title, description } = req.body;
  try {
    if (!req.result || !req.result.secure_url) {
      return res.status(400).json({ message: 'Missing required parameter - imageUrl' });
    }
    
    const newProduct = new Product({
      title,
      description,
      imageUrl: req.result.secure_url,
      pid: req.result.public_id
    });
    await newProduct.save();
    return res.status(201).json(newProduct);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};


const getProductById = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(product);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const product = await Product.findByIdAndUpdate(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update the product properties
    if (title) {
      product.title = title;
    }
    if (description) {
      product.description = description;
    }

    // Save the updated product
    await product.save();

    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


const deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    await Product.findByIdAndDelete(id);
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getProducts,
  addProduct,
  uploadImage,
  deleteProduct,
  updateProduct,

  resizeImage,
  addImageToCloud,getProductById
};
