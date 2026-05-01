require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { EC2Client, DescribeInstancesCommand, StartInstancesCommand, StopInstancesCommand } = require('@aws-sdk/client-ec2');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

const ec2Client = new EC2Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

// Get all EC2 instances
app.get('/api/instances', async (req, res) => {
  try {
    const command = new DescribeInstancesCommand({});
    const data = await ec2Client.send(command);

    const instances = [];
    data.Reservations.forEach(reservation => {
      reservation.Instances.forEach(instance => {
        instances.push({
          instanceId: instance.InstanceId,
          instanceType: instance.InstanceType,
          state: instance.State.Name,
          publicIp: instance.PublicIpAddress || 'N/A',
          privateIp: instance.PrivateIpAddress || 'N/A',
          name: (instance.Tags?.find(t => t.Key === 'Name')?.Value) || 'Unnamed',
          launchTime: instance.LaunchTime
        });
      });
    });

    res.json({ success: true, instances });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch instances', error: error.message });
  }
});

// Start an EC2 instance
app.post('/api/instances/start', async (req, res) => {
  try {
    const { instanceId } = req.body;
    const command = new StartInstancesCommand({ InstanceIds: [instanceId] });
    await ec2Client.send(command);
    res.json({ success: true, message: `Instance ${instanceId} is starting.` });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Failed to start instance', error: error.message });
  }
});

// Stop an EC2 instance
app.post('/api/instances/stop', async (req, res) => {
  try {
    const { instanceId } = req.body;
    const command = new StopInstancesCommand({ InstanceIds: [instanceId] });
    await ec2Client.send(command);
    res.json({ success: true, message: `Instance ${instanceId} is stopping.` });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Failed to stop instance', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
