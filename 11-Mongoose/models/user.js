const { ObjectId } = require("bson");
const mongoose = require("mongoose");

// ref
// seperti relation pada sql databases

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
});

userSchema.methods.addToCart = function (product) {
  const cartProductsIndex = this.cart.items.findIndex((i) => {
    return i.productId.toString() == product._id.toString();
  });
  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];

  if (cartProductsIndex >= 0) {
    newQuantity = this.cart.items[cartProductsIndex].quantity + 1;
    updatedCartItems[cartProductsIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: newQuantity,
    });
  }
  const updatedCart = {
    items: updatedCartItems,
  };
  this.cart = updatedCart;
  return this.save();
};
userSchema.methods.deleteCart = function (id) {
  const filter = this.cart.items.filter((a) => {
    return a.productId.toString() !== id;
  });
  this.cart.items = filter;
  return this.save();
};

userSchema.methods.clearCart = function () {
  this.cart = { items: [] };
  return this.save();
};

module.exports = mongoose.model("User", userSchema);
