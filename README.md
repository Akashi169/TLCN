# 🚀 NEXUS Cloud Cyber OS

Hệ thống Quản lý Trạm máy & Hệ sinh thái Cyber Game đám mây thế hệ thứ 5 (**NEXUS Cloud Cyber OS**).

---

## 🛠️ Công Nghệ Sử Dụng (Tech Stack)

- **Backend**: Node.js, Express API, Sequelize ORM, MySQL 8.0, JWT Authentication.
- **Frontend**: React 19, Vite, TailwindCSS, Lucide Icons.
- **Code Quality & Testing**: ESLint, Oxlint, Node Test Runner, SonarQube Community Edition.
- **DevOps & Containerization**: Docker, Multi-stage Dockerfiles, Docker Compose, Nginx Alpine.
- **CI/CD Pipeline**: GitHub Actions (Đường ống 6 chặng nối tiếp chuẩn hóa).

---

## 📋 Yêu Cầu Tiền Trạm (Prerequisites)

Trước khi bắt đầu, hãy đảm bảo máy tính của bạn đã cài đặt:
- **Node.js**: phiên bản `>= 20.x` (LTS khuyên dùng).
- **Git**: phiên bản mới nhất.
- *(Tùy chọn)* **Docker Desktop**: nếu muốn khởi chạy toàn bộ môi trường chỉ với 1 câu lệnh.

---

## 🏁 Hướng Dẫn Khởi Chạy Dự Án (Cho Người Mới Clone)

### 1️⃣ Clone Dự Án Về Máy Cục Bộ

Mở Terminal (PowerShell / Bash) và thực thi:

```bash
git clone https://github.com/Akashi169/TLCN.git
cd TLCN
```

---

### 2️⃣ Khởi Chạy Dự Án

Bạn có thể lựa chọn 1 trong 2 cách khởi chạy dưới đây:

---

#### 🟢 CÁCH 1: Khởi chạy bằng Docker Compose (Khuyên Dùng - Tự Động 100%)

Cách này sẽ tự động khởi tạo MySQL Database, nạp cấu hình, biên dịch Backend & Frontend và bật SonarQube mà không cần cài đặt MySQL thủ công.

```bash
# 1. Build & khởi chạy tất cả các dịch vụ ngầm
docker compose up -d --build

# 2. Kiểm tra trạng thái các container đang chạy
docker compose ps

# 3. Kiểm tra sức khỏe của API
curl http://localhost:3001/health
```

##### 🌐 Địa chỉ truy cập các dịch vụ:
- **Frontend App**: [http://localhost:8080](http://localhost:8080)
- **Backend API**: [http://localhost:3001](http://localhost:3001)
- **API Health Check**: [http://localhost:3001/health](http://localhost:3001/health)
- **SonarQube Dashboard**: [http://localhost:9000](http://localhost:9000)

*Dừng các dịch vụ Docker:* `docker compose down`

---

#### 🟡 CÁCH 2: Khởi chạy Thủ Công (Local Development Mode)

Nếu muốn lập trình và sửa code trực tiếp trên máy local mà không qua Docker:

##### Step A: Khởi chạy Backend (Express API)
```bash
# 1. Truy cập thư mục backend
cd backend

# 2. Cài đặt các gói thư viện
npm install

# 3. Tạo file cấu hình môi trường (.env) nếu chưa có
# Cấu hình thông số DB_HOST, DB_USER, DB_PASSWORD theo MySQL local của bạn

# 4. Chạy migration & nạp dữ liệu mẫu vào CSDL
npm run db:migrate
npm run db:seed

# 5. Khởi chạy Backend ở chế độ Development (Nodemon)
npm run dev
```
👉 Backend API sẽ hoạt động tại: `http://localhost:3001`

##### Step B: Khởi chạy Frontend (React + Vite)
Mở một cửa sổ Terminal mới:
```bash
# 1. Truy cập thư mục frontend từ gốc dự án
cd frontend

# 2. Cài đặt các gói thư viện
npm install

# 3. Khởi chạy Frontend ở chế độ Development
npm run dev
```
👉 Giao diện Frontend sẽ hoạt động tại: `http://localhost:5173`

---

## 🧪 Kiểm Tra Chất Lượng Code & Unit Tests

### Phân tích tĩnh mã nguồn (ESLint):
```bash
# Kiểm tra code Backend
cd backend && npm run lint

# Kiểm tra code Frontend
cd frontend && npm run lint
```

### Chạy Unit Test:
```bash
# Test Backend
cd backend && npm test

# Test Frontend
cd frontend && npm test
```

---

## 🔄 Đường Ống CI/CD 6 Chặng (GitHub Actions Workflow)

Mỗi khi code được push lên nhánh `main`, đường ống CI/CD sẽ tự động kích hoạt 6 chặng nối tiếp nhau:

1. **Chặng 1 - Build**: Cài đặt dependencies (NPM Cache) & biên dịch code.
2. **Chặng 2 - Lint**: Phân tích tĩnh code bằng ESLint cho Backend & Frontend.
3. **Chặng 3 - Test**: Tự động chạy toàn bộ Unit Tests.
4. **Chặng 4 - Security & SonarQube Scan**: Quét lỗ hổng bảo mật thư viện (`npm audit`, Trivy) và đẩy mã nguồn lên SonarQube Scanner.
5. **Chặng 5 - Đóng gói (Docker)**: Build Docker Multi-stage image (tận dụng GitHub Actions layer cache `< 15m`), đánh version tag commit SHA & `latest`, đẩy lên GitHub Container Registry (GHCR).
6. **Chặng 6 - Triển khai tự động**: Kích hoạt triển khai lên server Staging.

---

## 📁 Cấu Trúc Thư Mục Dự Án

```
TLCN/
├── .github/
│   └── workflows/
│       └── ci-cd.yml             # GitHub Actions 6-Stage Pipeline
├── backend/                      # Source Code Backend (Express.js API)
│   ├── src/                      # Controllers, Models, Routes, Migrations
│   ├── tests/                    # Backend Unit Tests
│   ├── .eslintrc.cjs             # Cấu hình ESLint Backend
│   └── Dockerfile                # Multi-stage Dockerfile Express
├── frontend/                     # Source Code Frontend (React + Vite)
│   ├── src/                      # Components, Features, Pages
│   ├── nginx.conf                # Custom Nginx SPA configuration
│   ├── .eslintrc.cjs             # Cấu hình ESLint Frontend
│   └── Dockerfile                # Multi-stage Dockerfile Vite + Nginx
├── docker-compose.yml            # Khởi chạy MySQL + Backend + Frontend + SonarQube
├── sonar-project.properties      # Cấu hình SonarQube Scanner
└── README.md                     # Tài liệu hướng dẫn sử dụng
```
