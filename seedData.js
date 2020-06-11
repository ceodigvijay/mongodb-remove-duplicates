const MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://localhost:27017", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    for (let i = 1; i <= 100; i++) {
      await client
        .db("hc_tutorial")
        .collection("products")
        .insertOne({
          name: "mango" + i,
          price: 12,
          quantity: 1000,
          coupon: "NewCoupon",
        });
      await client
        .db("hc_tutorial")
        .collection("products")
        .insertOne({
          name: "mango" + i,
          price: 12,
          quantity: 1000,
          coupon: "NewCoupon",
        });
      console.log("Inserted " + i);
    }
    client.close();
    process.exit(1);
  });
