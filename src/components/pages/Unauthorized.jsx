import React from "react";

function Unauthorized() {
  return (
    <div>
      <img
        src="https://www.wplounge.nl/wp-content/uploads/2020/01/401-Error.png"
        alt=""
        width="100%"
        height="100%"
      />
      <div className="ml-3 mt-3 text-center">
        <h1>Bạn Không có quyền truy cập. Hãy Đăng nhập!.</h1>
      </div>
    </div>
  );
}

export default Unauthorized;
