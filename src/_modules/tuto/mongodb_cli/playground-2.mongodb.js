
use('cDB');

let counter = 1;
db.getCollection('LargeJson').find().forEach(doc => {
    db.getCollection("LargeJson").update(
        { _id: doc._id },
        { $set: { "sn": counter } }
    );
    counter++
});
