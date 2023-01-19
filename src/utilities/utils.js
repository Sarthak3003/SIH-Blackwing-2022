const bcrypt = require('bcryptjs');
const crypto = require('crypto-js');
const nodemailer = require('nodemailer');
const ipfsClient = require('ipfs-http-client');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
const axios = require('axios');
const dotenv = require('dotenv').config();

const generateOtp = (otpLength) => {
    let digits = "0123456789";
    let otp = "";
    for (let i = 0; i < otpLength; i++) {
        otp += digits[Math.floor(Math.random()*10)];
    }
    return otp;
};

const sendEmail = async (toEmail, subject, body) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASSWORD
        },
        tls: {
            ciphers: "SSLv3",
        },
    });

    let mailOptions = {
        from: process.env.NODEMAILER_EMAIL,
        to:toEmail,
        subject: subject,
        text: body
    };

    await transporter.sendMail(mailOptions);
};

const sendSms = (message, mobile) => {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    
    const client = require('twilio')(accountSid, authToken, {
        lazyLoading: true
    });

    client.messages
        .create({
            from: process.env.TWILIO_MOBILE_NUMBER,
            to: mobile,
            body: message
        })
        .then(message => console.log(`Message SID ${message.sid}`))
        .catch(error => console.error(error));
}

const hashPassword = (password) => {
    password = bcrypt.hashSync(password, 8); 
    return password;
};

const validatePassword = (password, hashPassword) => {
    const verify = bcrypt.compareSync(password, hashPassword);
    return verify;
};

const encrypt = (data) => {
    const encryptData = crypto.AES
        .encrypt(JSON.stringify(data), process.env.CRYPTO_KEY)
        .toString();
    return encryptData;
};

const decrypt = (data) => {
    const bytes = crypto.AES.decrypt(data, process.env.CRYPTO_KEY);
    const decryptData = JSON.parse(bytes.toString(crypto.enc.Utf8));
    return decryptData;
};

const ipfs = async (data) => {
    const auth = 'Basic ' + Buffer.from(process.env.INFURA_API_KEY + ':' + process.env.INFURA_API_SECRET).toString('base64');

    const client = ipfsClient.create({
        host: 'ipfs.infura.io',
        port: 5001,
        protocol: 'https',
        headers: {
            authorization: auth,
        },
    });

    const buffer = fs.readFileSync(data.path);
    
    let result = await client.add(buffer);
    console.log(result.cid);
    let url = process.env.IPFS_URI + '/' + result.path;
    return url;
};

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const verifyGstin = async (gstinNumber) => {
    const url = `https://www.knowyourgst.com/developers/gstincall/?gstin=${gstinNumber}`;
    const response = await axios.get(url, { headers: { 'passthrough': process.env.GSTIN_API_KEY }});
    return response;
}

module.exports = { 
    generateOtp,
    sendEmail,
    sendSms,
    hashPassword,
    validatePassword,
    encrypt,
    decrypt,
    ipfs,
    cloudinary,
    verifyGstin
};