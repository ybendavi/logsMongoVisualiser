const mongoose = require('mongoose');

async function connectToDatabase(infoconn) {
  let uri = 'mongodb://172.17.0.2:27017/sauvdrive'; // Remplace par ton URI MongoDB
	if (infoconn)
	{
		if (infoconn.address && infoconn.dbName && infoconn.dbPort) {
			uri = infoconn.address + ':' + infoconn.dbPort + '/' + infoconn.dbName;
			if (infoconn.username) {
				uri = infconn.username + '@' + uri;
				if (infoconn.password) {
					uri = infconn.username + ':' + infoconn.password + '@' + uri;
				}
				else {
					uri = infconn.username + '@' + uri;
				}
				uri = infoconn.authSource ? uri + '/?authSource=' + infoconn.authSource : uri;
			}
			uri = 'mongodb://' + uri;
		}
		console.log(infoconn);
	}
  try {
    await mongoose.connect(uri);
    console.log('Connecté à MongoDB avec Mongoose');

    // Ajout d'index de texte si nécessaire
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    collections.forEach(async (collection) => {
      const coll = db.collection(collection.name);
	try {
      await coll.createIndex({ "$**": "text" });
	} catch (error) {
		console.log("error:", error);
	}
    });
	return ({success: true})
  } catch (err) {
    console.error('Erreur de connexion à MongoDB', err);
	  return ({success: false, message: err.message});
  }
}


module.exports = { connectToDatabase };

