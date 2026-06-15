import React from "react";
import { createRoot } from "react-dom/client";
import Portfolio from "./Portfolio.jsx";

// 페이지 기본 여백 제거 (포트폴리오가 전체 화면을 채우도록)
const baseStyle = document.createElement("style");
baseStyle.textContent =
  "html,body,#root{margin:0;padding:0;} body{background:#fff;}";
document.head.appendChild(baseStyle);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Portfolio />
  </React.StrictMode>
);
