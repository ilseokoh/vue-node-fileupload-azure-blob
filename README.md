## 참고 

[Azure Blob SDK 샘플](https://github.com/Azure-Samples/azure-sdk-for-js-storage-blob-stream-nodejs/tree/master/v12)


## vue 클라이언트 실행 

```bash
cd vue-file-upload
yarn install
yarn serve
```

## node 서버 실행 

```bash
cd node-server
npm install 
npm run server 
```

## 설명 

### 클라이언트 (Vue)

- 파일 업로드는 Vue 에서 multipart/form-data 로 업로드 합니다. [Vue 에서 axio 를 이용해서 업로드](https://github.com/ilseokoh/vue-node-fileupload-azure-blob/blob/84cacf13791d82055bf66dda5012e04d8d323da1/vue-file-upload/src/components/FileUpload.vue#L28)를 했는데 특별한 설정은 없습니다. 

### 서버 (Node.js)

 - [@azure/storage-blob](https://www.npmjs.com/package/@azure/storage-blob) 을 사용합니다. 
 - node js 미들웨어인 [multer](https://www.npmjs.com/package/multer) 를 사용해서 multipart/form-data 를 처리합니다. 샘플에서는 한개의 파일을 처리했는데 여러개의 파일은 [multer 문서](https://github.com/expressjs/multer/blob/master/doc/README-ko.md) 를 참조해서 설정합니다. 
 - Stream을 [into-strem](https://www.npmjs.com/package/into-stream) 으로 req.buffer 를 통해 만들었습니다. 버전은 5.1.1 입니다. 
 - blobClient 는 Shared Key(Connection String)으로 생성했습니다. 