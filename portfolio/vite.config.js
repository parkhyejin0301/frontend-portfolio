import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// 루트 도메인(Vercel/Netlify/커스텀 도메인)에 배포할 때는 base 그대로 두세요.
// GitHub Pages의 프로젝트 페이지(https://id.github.io/저장소명/)에 올릴 때만
// 아래 base를 "/저장소명/" 으로 바꾸세요.
export default defineConfig({
  plugins: [react()],
  base: "/",
});
