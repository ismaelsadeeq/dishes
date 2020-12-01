const assert  = require('assert');

const insertDocument = (db,document,collection,callback) =>{
  const coll =  db.collection(collection);
  coll.insert(document,(err,result)=>{
    assert.equal(err,null);

    console.log('inserted' + result.result.n + 'documents into '+ collection);
    callback(result);
  })
};
 
const findDocuments = (db, collection,callback) =>{
  const coll =  db.collection(collection);
  coll.find({}).toArray((err,docs)=>{
    assert.equal(err,null);
    callback(docs);

  })
};

const removeDocuments = (db,document,collection,callback)=>{
  const coll =  db.collection(collection);
  coll.deleteOne(document,(err,result)=>{
    assert.equal(err,null);
    console.log(`removed, ${document}`);
    callback(result)
  })
};
const updateDocument = (db,document,update,collection,callback) =>{
  const coll =  db.collection(collection);
  coll.updateOne(document,{$set:update},null,(err,result)=>{
    assert.equal(err,null);
    console.log('updated the document with ,',update);
    callback(result)
  })
};

module.exports = {
  insertDocument,
  findDocuments,
  removeDocuments,
  updateDocument
}