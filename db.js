const mongoose = require('mongoose');
require('dotenv').config();
const passwordMongodbAtlas = process.env.passwordMongodbAtlas
// const passwordMongodbAtlas = gUriZm02UCISSETk
async function main() {
  await mongoose.connect(`mongodb+srv://Netflix:${passwordMongodbAtlas}@cluster0.gbn4c.mongodb.net/?retryWrites=true&w=majority`);
  console.log("connected to database successfully");
}
main().catch(err => console.log(err));
