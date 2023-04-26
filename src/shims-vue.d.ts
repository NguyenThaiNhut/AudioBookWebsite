declare global {
    // Định nghĩa kiểu của biến toàn cục
    interface Window {
        onLogged: boolean;
    }
  }
  
  // Khởi tạo biến toàn cục
  window.onLogged = true;