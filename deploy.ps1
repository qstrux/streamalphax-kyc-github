# StreamAlphaX KYC 部署脚本 (Windows PowerShell)
Write-Host "🚀 部署 StreamAlphaX KYC 系统到 Cloudflare..." -ForegroundColor Cyan

# 检查 Node.js
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ 未找到 Node.js，请先安装" -ForegroundColor Red
    exit 1
}

# 检查是否在项目目录
if (-not (Test-Path "wrangler.toml")) {
    Write-Host "❌ 请在项目根目录中运行此脚本" -ForegroundColor Red
    exit 1
}

# 安装依赖（如果需要）
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 安装项目依赖..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ 依赖安装失败" -ForegroundColor Red
        exit 1
    }
}

# 检查登录状态
Write-Host "`n1️⃣ 检查 Cloudflare 登录状态..." -ForegroundColor Yellow
$loginCheck = npx wrangler whoami 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  未登录，正在启动登录流程..." -ForegroundColor Yellow
    npx wrangler login
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ 登录失败" -ForegroundColor Red
        exit 1
    }
}

Write-Host "✅ 已登录 Cloudflare" -ForegroundColor Green

# 验证密钥
Write-Host "`n2️⃣ 验证密钥配置..." -ForegroundColor Yellow
$secrets = npx wrangler secret list 2>&1
if ($secrets -notmatch "ID_ANALYZER_API_KEY") {
    Write-Host "⚠️  缺少 ID_ANALYZER_API_KEY" -ForegroundColor Red
    Write-Host "请运行: npx wrangler secret put ID_ANALYZER_API_KEY" -ForegroundColor Cyan
}
if ($secrets -notmatch "ID_ANALYZER_PROFILE_ID") {
    Write-Host "⚠️  缺少 ID_ANALYZER_PROFILE_ID" -ForegroundColor Red
    Write-Host "请运行: npx wrangler secret put ID_ANALYZER_PROFILE_ID" -ForegroundColor Cyan
}
if ($secrets -notmatch "WEBHOOK_SECRET") {
    Write-Host "⚠️  缺少 WEBHOOK_SECRET" -ForegroundColor Red
    Write-Host "请运行: npx wrangler secret put WEBHOOK_SECRET" -ForegroundColor Cyan
}

# 部署
Write-Host "`n3️⃣ 部署到 Cloudflare Workers..." -ForegroundColor Yellow
npx wrangler deploy

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ 部署成功！" -ForegroundColor Green
    Write-Host "`n📍 访问地址：" -ForegroundColor Cyan
    Write-Host "   https://kyc.streamalphax.com/kyc/start" -ForegroundColor White
    Write-Host "`n🔧 API 端点：" -ForegroundColor Cyan
    Write-Host "   https://kyc.streamalphax.com/api/kyc/create-session" -ForegroundColor White
    Write-Host "   https://kyc.streamalphax.com/api/kyc/status" -ForegroundColor White
    Write-Host "   https://kyc.streamalphax.com/api/kyc/webhook" -ForegroundColor White
    
    Write-Host "`n📋 下一步：" -ForegroundColor Cyan
    Write-Host "1. 访问 https://portal.idanalyzer.com" -ForegroundColor White
    Write-Host "2. 更新 Profile URL 配置" -ForegroundColor White
    Write-Host "3. 测试完整验证流程" -ForegroundColor White
} else {
    Write-Host "`n❌ 部署失败，请检查错误信息" -ForegroundColor Red
    exit 1
}