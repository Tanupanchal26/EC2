require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

app.post('/api/register', async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    const timestamp = Date.now();
    const fileName = `registration_${timestamp}.json`;

    const registrationData = {
      name,
      email,
      phone,
      address,
      registeredAt: new Date().toISOString()
    };

    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileName,
      Body: JSON.stringify(registrationData, null, 2),
      ContentType: 'application/json'
    });

    await s3Client.send(command);
    res.json({ success: true, message: 'Registration saved successfully!', fileName });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Failed to save registration', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
