# EC2 Integration App

## Step 1: Connect to EC2 Instance

Since you chose Amazon Linux, connect via SSH:

```bash
ssh -i my-key.pem ec2-user@<your-public-ip>
```

---

## Step 2: Install Software on EC2

Update packages and install Git:

```bash
sudo yum update -y
sudo yum install git -y
```

Install Node.js:

```bash
sudo dnf install nodejs -y
```

---

## Step 3: Clone the Repository

```bash
git clone https://github.com/Tanupanchal26/S3_BUCKET-INTEGRATION.git
cd S3_BUCKET-INTEGRATION
```

---

## Step 4: Configure AWS Credentials

Create a `.env` file in the root directory:

```
AWS_ACCESS_KEY_ID=your_access_key_here
AWS_SECRET_ACCESS_KEY=your_secret_key_here
AWS_REGION=us-east-1
PORT=3000
```

---

## Step 5: Install Dependencies & Run

```bash
npm install
npm start
```

---

## Step 6: Open in Browser

Navigate to:

```
http://<your-public-ip>:3000
```

---

## How It Works

- The app connects to AWS EC2 using the AWS SDK
- Fetches all EC2 instances in your configured region
- Allows you to **Start** or **Stop** instances directly from the browser UI
