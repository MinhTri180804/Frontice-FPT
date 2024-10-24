# Tài liệu Dự án React + TypeScript + Vite

## Giới thiệu
Dự án này là một ứng dụng web được xây dựng bằng React, TypeScript và Vite. Nó cung cấp một cấu trúc cơ bản cho việc phát triển ứng dụng với các tính năng như điều hướng, quản lý trạng thái và gọi API.

## Cấu trúc Thư mục
/src

   ├── /components # Chứa các thành phần giao diện
   
   ├── /pages # Chứa các trang của ứng dụng
   
   ├── /services # Chứa các dịch vụ API
   
   ├── /store # Chứa các kho lưu trữ trạng thái
   
   ├── /constant # Chứa các hằng số và đường dẫn
   
   ├── /configs # Chứa cấu hình cho router và các thiết lập khác
   
   ├── /axios # Chứa cấu hình axios
   
   ├── App.tsx # Thành phần chính của ứng dụng
   
   ├── main.tsx # Điểm vào của ứng dụng

## Các Thành phần Chính

### 1. App.tsx
- **Mô tả**: Thành phần chính của ứng dụng, nơi cấu hình các provider như `QueryProvider` và `Router`.
- **Chức năng**: Quản lý trạng thái toàn cục và điều hướng.

### 2. Router
- **Mô tả**: Quản lý điều hướng giữa các trang.
- **Chức năng**: Sử dụng `react-router-dom` để định nghĩa các route và điều hướng giữa chúng.

### 3. Header và Footer
- **Mô tả**: Các thành phần giao diện cho header và footer của ứng dụng.
- **Chức năng**: Hiển thị tiêu đề và thông tin liên hệ.

### 4. Các Trang
- **Mô tả**: Các trang chính của ứng dụng như Home, Profile, Login, Register.
- **Chức năng**: Cung cấp giao diện cho người dùng tương tác.

### 5. Dịch vụ API
- **Mô tả**: Các dịch vụ để gọi API sử dụng axios.
- **Chức năng**: Tạo các hàm để thực hiện các yêu cầu HTTP như GET, POST, PUT, DELETE.

## Cách Cài đặt
1. **Clone Repository**:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Cài đặt Dependencies**:
   ```bash
   npm install
   ```

3. **Chạy Ứng dụng**:
   ```bash
   npm run dev
   ```

## Các Lệnh Chính
- `npm run dev`: Chạy ứng dụng trong chế độ phát triển.
- `npm run build`: Xây dựng ứng dụng cho môi trường sản xuất.
- `npm run lint`: Kiểm tra mã nguồn với ESLint.

## Tài liệu Tham khảo
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev/guide/)
