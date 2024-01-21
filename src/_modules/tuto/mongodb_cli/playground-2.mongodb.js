
use('cDB');

let counter = 1;
let collection = db.getCollection('LargeJson');
collection.find().forEach(doc => {
    collection.updateOne(
        { _id: doc._id },
        { $set: { "sn": counter } },
        { upsert: true }
    );
    counter++
});



console.log(
    collection.find({},
        {
            _id: false, sn: true, fname: true
        })
        .sort({
            _id: 1
        }).limit(10)
);


