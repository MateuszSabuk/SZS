const mongoose = require("mongoose");
const jarSchema = new mongoose.Schema({
  name: String,
  date: Date,
  isOpened: Boolean,
  isGood: Boolean,
  openedDate: Date,
  comments: String,
});

const batchSchema = new mongoose.Schema({
  name: String,
  date: Date,
  comments: String,
  jars: Array,
});

const Jar = mongoose.model("Jar", jarSchema);
const Batch = mongoose.model("Batch", batchSchema);

async function connectToDB(uri) {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to database");
  } catch (err) {
    console.error("Error connecting to database:", err);
  }
}

async function addBatch(numOfJars, name, comments = "") {
  try {
    var jars = [];
    for (var i = 0; i < numOfJars; i++) {
      var jar = await addJar(name);
      if (jar != null) {
        jars.push(jar);
      }
    }
    const newBatch = new Batch({
      name: name,
      date: new Date(),
      comments: comments,
      jars: jars,
    });
    const batch = await newBatch.save();
    console.log("Item added:", batch);
    return batch;
  } catch (error) {
    console.error("Error adding item:", error);
    return null;
  }
}

async function addJar(name) {
  try {
    const newJar = new Jar({
      name: name,
      date: new Date(),
      isOpened: false,
      isGood: true,
      openedDate: null,
      comments: "",
    });
    const jar = await newJar.save();
    console.log("Item added:", newJar);
    return jar;
  } catch (error) {
    console.error("Error adding item:", error);
    return null;
  }
}

async function getAllJars() {
  try {
    const items = await Jar.find({});
    return items;
  } catch (error) {
    console.error("Error getting items:", error);
    return [];
  }
}

async function getJarById(id) {
  try {
    const item = await Jar.findById(id);
    return item;
  } catch (error) {
    console.error("Error getting items:", error);
    return null;
  }
}

module.exports = {
  connectToDB: connectToDB,
  addBatch: addBatch,
  getAllJars: getAllJars,
  getJarById: getJarById,
};
