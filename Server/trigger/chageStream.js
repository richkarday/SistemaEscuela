// const { MongoClient } = require("mongodb");

// // Replace the uri string with your MongoDB deployment's connection string.
// const uri =
//   "mongodb://localhost:27017";

// const client = new MongoClient(uri);

// let changeStream;
// async function run() {
//   try {
//     await client.connect();
//     const database = client.db("escuela");
//     const collection = database.collection("users");

//     // open a Change Stream on the "movies" collection
//     changeStream = collection.watch();

//     // set up a listener when change events are emitted
//     changeStream.on("change", next => {
//       // process any change event
//       console.log("received a change to the collection: \t", next);
//     });

//     // use a timeout to ensure the listener is registered before the insertOne
//     // operation is called.
//     await new Promise(resolve => {
//       setTimeout(async () => {
//         await collection.insertOne({
//           nombre: "Adrian",
//         });
//         // wait to close `changeStream` after the listener receives the event
//         setTimeout(async () => {
//           resolve(await changeStream.close());
//         }, 1000);
//       }, 1000);
//     });
//   } finally {
//     await client.close();
//   }
// }
// run().catch(console.dir);
