// Load the AWS SDK for Node.js
import AWS from "aws-sdk";
import { v4 as uuid } from 'uuid';

// Set up config
const bucketName = "s3-om-files"
// Create S3 service object
const s3 = new AWS.S3({
  endpoint: "cellar-c2.services.clever-cloud.com",
  region: "eu-west-3",
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});


const uploadFile = async (file) => {
    try{
    const key = uuid.v4()
    const uploadParams = {
      Bucket: bucketName,
      Body: file.buffer,
      Key: key,
      ContentType: file.mimetype,
      ACL: "public-read"
    };
      
      const object =  await s3.upload(uploadParams).promise()
      return object
    }
    catch(err){
      next(err)
    }
  };
  
  const downloadFile = (key) => {

      const downloadParams = {
        Key: key,
        Bucket: bucketName
      };
      return s3.getObject(downloadParams).createReadStream()
  
  };
  
  const searchFiles = async (next) =>{
    try{
      const {Contents} = await s3.listObjects({ Bucket: bucketName}).promise()
      return Contents
    }
    catch(err){
      next(err)
    }
  }
  
  const deleteFile = async (key) =>{
    try{
      const deleteParams = {
        Key: key,
        Bucket: bucketName
      };
  
      const object = await s3.getObject(deleteParams).promise()
      if (object){
        return await s3.deleteObject(deleteParams).promise()
      }
    }
    catch(err){
      console.log(err)
    }
  }
  
  const updateFile = async (file, key) =>{
    try{
      const updateParams = {
        Key: key,
        Body: file.buffer,
        Bucket: bucketName,
        ContentType: file.mimetype,
        ACL: "public-read"
      };
      let object = await s3.getObject({Key: key, Bucket: bucketName}).promise()
      if (object){
        await s3.putObject(updateParams).promise()
        return `https://s3-om-files.cellar-c2.services.clever-cloud.com/${key}` 
      }
    }
    catch(err){
      console.log(err)
    }
  }
  
export {
    uploadFile,
    downloadFile, 
    searchFiles,
    deleteFile,
    updateFile
};
