User {
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  sandwiches: [],
  reviews: []
}

Sandwich {
  name: String,
  type: String,
  hot: Boolean, //subcategory for different hot sandwiches
  price: Number,
  restaurant: String, //May eventually be a relationship to restaurant model
  Speed: Number,
  Reviews: []
}

Review {
  stars: Number,
  text: String,
  upvotes: Number,
  recommend: Boolean
}

Restaurant {
  name: String,
  location: String,
  sandwiches: [],
  reviews: []
}
