const { ObjectId } = require("bson");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Product = new Schema({
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Product", Product);
// const mongodb = require("mongodb");
// const ObjectId = mongodb.ObjectId;
// const getDb = require("../util/database").getDb;

// class Product {
//   constructor(title, price, imageUrl, description, id, userId) {
//     this.title = title;
//     this.price = price;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this._id = id ? new ObjectId(id) : null;
//     this.userId = userId;
//   }
//   save() {
//     const db = getDb();
//     let opDb;
//     if (this._id) {
//       opDb = db
//         .collection("products")
//         .updateOne({ _id: this._id }, { $set: this });
//     } else {
//       opDb = db.collection("products").insertOne(this);
//     }
//     return opDb
//       .then((result) => {
//         return result;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   static deleteById(prodId) {
//     const db = getDb();

//     return db.collection("products").deleteOne({ _id: new ObjectId(prodId) });
//   }

//   static fetchAll(callback) {
//     const db = getDb();
//     const col = db.collection("products");
//     return col
//       .find({})
//       .toArray()
//       .then((result) => {
//         callback(result);
//       })
//       .catch((err) => console.log(err));
//   }
//   static findById(prodId) {
//     const db = getDb();
//     return db
//       .collection("products")
//       .find({ _id: new ObjectId(prodId) })
//       .next()
//       .then((result) => {
//         console.log(result);
//         return result;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
// }

// module.exports = Product;
