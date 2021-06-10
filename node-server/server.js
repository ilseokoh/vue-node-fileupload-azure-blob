const express = require('express');
var multer  = require('multer')
const cors = require('cors')
const getStream = require('into-stream');
const { BlobServiceClient, StorageSharedKeyCredential } = require("@azure/storage-blob");

const inMemoryStorage = multer.memoryStorage();
const uploadStrategy = multer({ storage: inMemoryStorage }).single('firmware');

const ONE_MEGABYTE = 1024 * 1024;
const uploadOptions = { bufferSize: 4 * ONE_MEGABYTE, maxBuffers: 20 };

const app = express();

// middle ware
app.use(express.static('public')); //to access the files in public folder
app.use(cors()); // it enables all cors requests

// Enter your storage account name and shared key
const account = "vueuploadtest001";
const accountKey = "NnOUUE2BJanHc9GQmQJELxuf2lU/w3QfO9E4tUoT4RZlf1o9FBBanFBX07SsEoEoYB8XlKcZUtGS9ZkN5JRBfw==";

// Use StorageSharedKeyCredential with storage account and account key
// StorageSharedKeyCredential is only available in Node.js runtime, not in browsers
const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
const blobServiceClient = new BlobServiceClient(
  `https://${account}.blob.core.windows.net`,
  sharedKeyCredential
);

// file upload api
app.post('/upload', uploadStrategy, async (req, res) => {

    console.log('req.file -------', req.file)

    const blobName = req.file.originalname;
    console.log('blobName: ', blobName)

    const stream = getStream(req.file.buffer);

    const containerClient = blobServiceClient.getContainerClient('upload');
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    try {
        await blockBlobClient.uploadStream(stream,
            uploadOptions.bufferSize, uploadOptions.maxBuffers,
            { blobHTTPHeaders: { blobContentType: req.file.mimetype } });

        console.log('success ... ')

        res.status(201).json({
            message: 'upload successfully'
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
          });
    }
})


app.listen(4500, () => {
    console.log('server is running at port 4500');
})