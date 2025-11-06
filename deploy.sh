#!/bin/bash

# StreamAlphaX KYC 部署脚本 (Linux/Mac)
echo "🚀 部署 StreamAlphaX KYC 系统到 Cloudflare..."

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ 未找到 Node.js，请先安装${NC}"
    exit 1
fi

# 检查是否在项目目录
if [[ ! -f "wrangler.toml" ]]; then
    echo -e "${RED}❌ 请在项目根目录中运行此脚本${NC}"
    exit 1
fi

# 安装依赖（如果需要）
if [[ ! -d "node_modules" ]]; then
    echo -e "${YELLOW}📦 安装项目依赖...${NC}"
    npm install
    if [[ $? -ne 0 ]]; then
        echo -e "${RED}❌ 依赖安装失败${NC}"
        exit 1
    fi
fi

# 检查登录状态
echo -e "\n${YELLOW}1️⃣ 检查 Cloudflare 登录状态...${NC}"
npx wrangler whoami > /dev/null 2>&1
if [[ $? -ne 0 ]]; then
    echo -e "${YELLOW}⚠️  未登录，正在启动登录流程...${NC}"
    npx wrangler login
    if [[ $? -ne 0 ]]; then
        echo -e "${RED}❌ 登录失败${NC}"
        exit 1
    fi
fi

echo -e "${GREEN}✅ 已登录 Cloudflare${NC}"

# 验证密钥
echo -e "\n${YELLOW}2️⃣ 验证密钥配置...${NC}"
secrets_output=$(npx wrangler secret list 2>&1)

if ! echo "$secrets_output" | grep -q "ID_ANALYZER_API_KEY"; then
    echo -e "${RED}⚠️  缺少 ID_ANALYZER_API_KEY${NC}"
    echo -e "${CYAN}请运行: npx wrangler secret put ID_ANALYZER_API_KEY${NC}"
fi

if ! echo "$secrets_output" | grep -q "ID_ANALYZER_PROFILE_ID"; then
    echo -e "${RED}⚠️  缺少 ID_ANALYZER_PROFILE_ID${NC}"
    echo -e "${CYAN}请运行: npx wrangler secret put ID_ANALYZER_PROFILE_ID${NC}"
fi

if ! echo "$secrets_output" | grep -q "WEBHOOK_SECRET"; then
    echo -e "${RED}⚠️  缺少 WEBHOOK_SECRET${NC}"
    echo -e "${CYAN}请运行: npx wrangler secret put WEBHOOK_SECRET${NC}"
fi

# 部署
echo -e "\n${YELLOW}3️⃣ 部署到 Cloudflare Workers...${NC}"
npx wrangler deploy

if [[ $? -eq 0 ]]; then
    echo -e "\n${GREEN}✅ 部署成功！${NC}"
    echo -e "\n${CYAN}📍 访问地址：${NC}"
    echo -e "   https://kyc.streamalphax.com/kyc/start"
    echo -e "\n${CYAN}🔧 API 端点：${NC}"
    echo -e "   https://kyc.streamalphax.com/api/kyc/create-session"
    echo -e "   https://kyc.streamalphax.com/api/kyc/status"
    echo -e "   https://kyc.streamalphax.com/api/kyc/webhook"
    
    echo -e "\n${CYAN}📋 下一步：${NC}"
    echo -e "1. 访问 https://portal.idanalyzer.com"
    echo -e "2. 更新 Profile URL 配置"
    echo -e "3. 测试完整验证流程"
else
    echo -e "\n${RED}❌ 部署失败，请检查错误信息${NC}"
    exit 1
fi