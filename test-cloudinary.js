const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
  cloud_name: 'rq8ruiyz',
  api_key: '256416953341491',
  api_secret: 'f0J2yxaKvhTRD-64vLWXjoLqGpg'
});

const buffer = fs.readFileSync('public/images/hero_bangles.jpg');

cloudinary.uploader.upload_stream({ folder: 'shokher_box' }, (error, result) => {
  if (error) {
    console.error('CLOUDINARY ERROR:', error);
  } else {
    console.log('CLOUDINARY SUCCESS:', result.secure_url);
  }
}).end(buffer);
