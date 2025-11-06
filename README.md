# StreamAlphaX KYC System

🔐 **Secure Identity Verification System** powered by ID Analyzer DocuPass and Cloudflare Workers.

![Deploy Status](https://img.shields.io/badge/deploy-ready-brightgreen)
![Platform](https://img.shields.io/badge/platform-Cloudflare%20Workers-orange)
![License](https://img.shields.io/badge/license-UNLICENSED-red)

## 🚀 Quick Start in GitHub Codespaces

### 1️⃣ Open in Codespaces

Click the **Code** button → **Codespaces** → **Create codespace on main**

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Login to Cloudflare

```bash
npx wrangler login
```

### 4️⃣ Configure Secrets

```bash
# Set your ID Analyzer API Key
npx wrangler secret put ID_ANALYZER_API_KEY
# Enter: kqsgM2voOtajsmFEJboyHq3TVkoHiUVi

# Set your ID Analyzer Profile ID  
npx wrangler secret put ID_ANALYZER_PROFILE_ID
# Enter: 049612884891427abbfe12e286a4cbd0

# Set your Webhook Secret (any strong password)
npx wrangler secret put WEBHOOK_SECRET
# Enter: your_secure_webhook_secret_here
```

### 5️⃣ Deploy

```bash
npm run deploy
```

### 6️⃣ Access Your KYC System

- **Start Page**: https://kyc.streamalphax.com/kyc/start
- **API Endpoint**: https://kyc.streamalphax.com/api/kyc/create-session

---

## 📋 Project Structure

```
streamalphax-kyc/
├── src/
│   └── index.js              # Main Worker code
├── scripts/
│   ├── deploy.sh            # Deployment script (Linux/Mac)
│   └── deploy.ps1           # Deployment script (Windows)
├── .devcontainer/
│   └── devcontainer.json    # Codespaces configuration
├── wrangler.toml            # Cloudflare Workers config
├── package.json             # Dependencies & scripts
├── .gitignore              # Git ignore rules
└── README.md               # This file
```

---

## 🔧 Configuration Details

### Cloudflare Workers Settings

- **Account ID**: `ad3f5e056c336689bdc49c180358f5b2`
- **KV Namespace**: `776630d558474c1583bef5b07e057214`
- **Routes**: 
  - `kyc.streamalphax.com/api/kyc/*`
  - `kyc.streamalphax.com/kyc/*`

### ID Analyzer Integration

- **API**: ID Analyzer DocuPass API v3
- **Profile**: Financial Services KYC (High Security)
- **Features**: Document verification + Liveness detection + AML screening

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `COMPANY_NAME` | Your company name | StreamAlphaX |
| `WELCOME_MESSAGE` | Welcome message | Secure financial identity verification |
| `LOGO_URL` | Company logo URL | https://streamalphax.com/logo.png |

---

## 🔐 Security Features

- ✅ **HMAC Signature Verification** for webhooks
- ✅ **CORS Protection** with whitelist
- ✅ **Input Validation** on all endpoints
- ✅ **Secure KV Storage** with TTL expiration
- ✅ **AML/CFT Compliance** screening
- ✅ **Encrypted Data Transmission**

---

## 🌐 API Endpoints

### POST `/api/kyc/create-session`

Create a new KYC verification session.

**Request:**
```json
{
  "userId": "user_123",
  "accountType": "standard"
}
```

**Response:**
```json
{
  "reference": "doc_ABC123",
  "url": "https://verify.idanalyzer.com/...",
  "qrCode": "data:image/png;base64,..."
}
```

### GET `/api/kyc/status?userId=user_123`

Check verification status for a user.

**Response:**
```json
{
  "status": "FOUND",
  "decision": "accept",
  "timestamp": "2024-11-03T06:30:00Z",
  "warnings": [],
  "extractedData": {
    "fullName": "John Doe",
    "dob": "1990-01-01",
    "country": "United States"
  }
}
```

### POST `/api/kyc/webhook`

Webhook endpoint for ID Analyzer callbacks.

**Headers:**
- `X-Signature`: HMAC-SHA256 signature

---

## 🎨 User Interface

Professional, minimal design with:

- ✅ **Responsive Layout** (mobile-friendly)
- ✅ **Clean Typography** (system fonts)
- ✅ **Professional Colors** (black, white, gray)
- ✅ **Status Icons** (✓ success, ⏳ pending, ✗ rejected)
- ✅ **Loading States** with smooth transitions

### Pages

1. **Start Page** (`/kyc/start`) - Initiate verification
2. **Success Page** (`/kyc/success`) - Verification completed
3. **Review Page** (`/kyc/review`) - Manual review required  
4. **Rejected Page** (`/kyc/rejected`) - Verification failed

---

## 🧪 Testing

### Test in Browser Console

```javascript
// Test create session API
fetch('https://kyc.streamalphax.com/api/kyc/create-session', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    userId: 'test_' + Date.now(),
    accountType: 'standard' 
  })
})
.then(r => r.json())
.then(console.log)
.catch(console.error);
```

### Test Status API

```javascript
// Test status check
fetch('https://kyc.streamalphax.com/api/kyc/status?userId=test_user')
.then(r => r.json())
.then(console.log);
```

---

## 🛠️ Development Commands

```bash
# Install dependencies
npm install

# Deploy to Cloudflare
npm run deploy

# Start development server
npm run dev

# View live logs
npm run logs

# List secrets
npm run secrets:list

# Check login status
npm run auth:whoami
```

---

## 📊 Monitoring & Logs

### View Real-time Logs

```bash
npx wrangler tail
```

### KV Storage Management

```bash
# List all KV keys
npx wrangler kv:key list --binding KYC_DATA

# Get specific record
npx wrangler kv:key get "user:123" --binding KYC_DATA
```

---

## 🔄 ID Analyzer Profile Configuration

After deployment, configure these URLs in your ID Analyzer Dashboard:

1. **Login**: https://portal.idanalyzer.com
2. **Navigate to Profile**: `049612884891427abbfe12e286a4cbd0`
3. **Set Redirect URLs**:
   - Success: `https://kyc.streamalphax.com/kyc/success`
   - Review: `https://kyc.streamalphax.com/kyc/review`  
   - Reject: `https://kyc.streamalphax.com/kyc/rejected`
4. **Set Webhook URL**: `https://kyc.streamalphax.com/api/kyc/webhook`

---

## 🚨 Troubleshooting

### Common Issues

**❌ "Failed to create session"**
- Check if secrets are set: `npx wrangler secret list`
- Verify API key is valid
- Check network connectivity

**❌ "404 Not Found"**  
- Verify routes are configured in `wrangler.toml`
- Check domain DNS settings
- Wait 1-2 minutes for route propagation

**❌ "CORS Error"**
- Ensure domain is in `ALLOW_ORIGINS` array
- Check request headers
- Verify HTTPS is used

### Debug Commands

```bash
# Check deployment status
npx wrangler whoami

# Verify KV binding
npx wrangler kv:namespace list

# Test local development
npx wrangler dev --local
```

---

## 📜 License

**UNLICENSED** - Proprietary software for StreamAlphaX internal use only.

---

## 🤝 Support

For technical support:
1. Check the troubleshooting section above
2. Review Cloudflare Workers logs
3. Verify ID Analyzer API status
4. Contact development team

---

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   User Browser  │───▶│ Cloudflare Edge  │───▶│ Cloudflare KV   │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌──────────────────┐
                       │  ID Analyzer     │
                       │  DocuPass API    │
                       └──────────────────┘
```

### Data Flow

1. **User** visits KYC start page
2. **Frontend** calls create-session API
3. **Worker** creates DocuPass session via ID Analyzer
4. **User** completes verification on ID Analyzer
5. **ID Analyzer** sends webhook to Worker
6. **Worker** stores results in KV storage
7. **User** redirected to appropriate result page

---

**Version**: 2.0.0  
**Last Updated**: 2025-11-03  
**Deployment Target**: Cloudflare Workers