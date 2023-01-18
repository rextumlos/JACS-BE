const { bucket } = require("../firebase");
const UUID = require("uuid-v4");

const upload = async (file) => {
    let uuid = UUID();

    const blob = bucket.file(file.originalname);
    const blobStream = blob.createWriteStream({
        metadata: {
          contentType: file.mimetype,
          metadata: {
            firebaseStorageDownloadTokens: uuid,
          }
        }
    });

    return new Promise((resolve, reject) => {
        blobStream.on('error', (err) => {
            console.log(err);
            resolve(err);
        });
        
        blobStream.on('finish', () => {
            // The public URL can be used to directly access the file via HTTP
            const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${blob.name}?alt=media&token=${uuid}`;
            resolve(publicUrl);
        });

        blobStream.end(file.buffer);
    })
}

module.exports = {upload};