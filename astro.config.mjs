// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// 纯前端 CSR 形态：静态输出 —— 构建时生成 HTML，浏览器端完成交互（水合），
// 部署无需 Node 服务器，任意静态托管（Nginx / OSS / Pages）均可。
export default defineConfig({
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
