const { bucket } = require("../firebase");
const UUID = require("uuid-v4");

const upload = async (file, ref) => {
    let uuid = UUID();

    const blob = bucket.file(ref);
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
            const fileRef = blob.name.replace(/\//g, '%2F');
            const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${fileRef}?alt=media&token=${uuid}`;

            const data = {
                fileName: file.originalname,
                publicUrl: publicUrl,
            }
            resolve(data);
        });

        blobStream.end(file.buffer);
    })
}

const deleteFile = (filePath) => {
    return new Promise ((resolve, reject) => {
        bucket.file(filePath).delete().then(() => {
            const result = "Deleted successfully";
            resolve(result);
        }).catch((err) => {
            resolve(err);
        })
    })
    
}

const getPathStorageFromUrl = (url) => {
    const baseUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/`;
    let filePath = url.replace(baseUrl, "");
    const indexOfEndPath = filePath.indexOf("?");
    filePath = filePath.substring(0, indexOfEndPath);
    filePath = filePath.replace(/%2F/g, "/");

    return filePath;
}

const getUserIdFromFilePath = (filePath, rootPath) => {
    let userId = filePath.replace(rootPath, "");
    const indexOfEndPath = userId.indexOf("/");
    userId = userId.substring(0, indexOfEndPath);
    
    return userId;
}

module.exports = {
    upload,
    deleteFile,
    getPathStorageFromUrl,
    getUserIdFromFilePath,
};