const assert  = require('assert');

const insertDocument = (db,document,collection,callback) =>{
  const coll =  db.collection(collection);
  return coll.insert(document)
   

};
 
const findDocuments = (db, collection,callback) =>{
  const coll =  db.collection(collection);
  return coll.find({}).toArray();
};

const removeDocuments = (db,document,collection,callback)=>{
  const coll =  db.collection(collection);
  return coll.deleteOne(document);

};
const updateDocument = (db,document,update,collection,callback) =>{
  const coll =  db.collection(collection);
  return coll.updateOne(document,{$set:update},null)
};

module.exports = {
  insertDocument,
  findDocuments,
  removeDocuments,
  updateDocument
}