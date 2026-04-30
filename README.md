# S3 Registration App

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure AWS Credentials
Create a `.env` file in the root directory and add your AWS credentials:
```
AWS_ACCESS_KEY_ID=your_access_key_here
AWS_SECRET_ACCESS_KEY=your_secret_key_here
AWS_REGION=us-east-1
S3_BUCKET_NAME=your_bucket_name_here
PORT=3000
```

### 3. Run the Application
```bash
npm start
```

### 4. Open in Browser
Navigate to: http://localhost:3000

## How It Works
- User fills out the registration form
- Data is sent to Node.js backend
- Backend saves data as JSON file in S3 bucket
- Each registration is stored as `registration_[timestamp].json`
