const products = require("../models/index");

module.exports.getProduct = async (req, res) => {
  const Products = await products.find({});
  return res.status(200).json({
    name: "All Products",
    Products: Products,
  });
};


module.exports.createProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const product=new products({
      name:name,
      quantity:quantity
    })

    await product.save();

    return res.status(200).json({
      name: "createProduct",
      message: "product created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      name: "createProduct error",
      output: error,
    });
  }
};

module.exports.deleteProduct = async (req, res) => {
  try {
    const id  = req.params.id;
    const product = await products.findById(id);
    product.remove();
    return res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Product deleted error",
      err:error
    });
  }
};

module.exports.updateProduct = async (req, res) => {
  try {
    // const { id,number } = req.params.id;
    // // const number=req.params.number;
    //  console.log("id ",id)
     const id =req.body.id;
     const number=req.body.number;
    const product = await products.findById(id);

    product.quantity = product.quantity + Number(number) ;
    product.save();
    return res.status(200).json({
      message: "Product updated successfully",
      product:product
    });
  } catch (error) {
    return res.status(500).json({
      message: "Product update error",
      error:error
    });
  }
};
