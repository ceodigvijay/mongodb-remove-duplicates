const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

async function removeDups() {
  try {
    const client = await MongoClient.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const DB = client.db(process.env.DB_NAME);
    const coll = DB.collection(process.env.COLL_NAME);
    const tempColl = DB.collection(process.env.TEMP_COLL_NAME);
    await tempColl.createIndex({ name: 1 }, { unique: true });
    const data = coll.find();
    const total = await data.count();
    let count = 0;
    let dupCount = 0;
    data.forEach(async (item) => {
      try {
        await tempColl.insertOne({ ...item });
        count++;
        console.log("Succesfuly Copied " + count + " unique documents.");
      } catch (error) {
        //Catch duplicate error and ignore, any other error panic.
        dupCount++;
      }
      if (count + dupCount == total) {
        console.log("Done.");
        console.log("Inserted " + count + " unique documents.");
        console.log("Removed " + dupCount + " duplicate documents.");
        client.close();
        process.exit(1);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

removeDups();
