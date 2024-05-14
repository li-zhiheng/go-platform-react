import { defineConfig, loadEnv } from 'vite'
import path, { resolve } from 'path'
import react from '@vitejs/plugin-react'
import vitePluginImp from 'vite-plugin-imp'
import { existsSync } from 'fs';

function getStylePath(name: string) {
  const names = name.split("-");
  const pathCss = `antd/es/${name}/style/index.js`;
  if (existsSync(path.join(__dirname, "./node_modules/" + pathCss))) {
    return pathCss;
  } else {
    names.pop()
    return getStylePath(names.join("-")) || ""
  }
}

// https://vitejs.dev/config/
const VITE_BASE_URL: string = loadEnv('development', process.cwd()).VITE_BASE_URL;
export default defineConfig(({ mode }) => {
  return {
    base: mode === 'development' ? '/' : './',
    server: {
      port: 3000, // 开发环境启动的端口
      host: '0.0.0.0',
      hot: true,
      hmr: true,
      // open: true, // 项目启动时自动打开浏览器
      proxy: {
        "/api": {
          target: VITE_BASE_URL,
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, ""),
        },
        // 代理 websockets 或 socket.io 写法：ws://localhost:5173/socket.io -> ws://localhost:5174/socket.io
        "/socket.io": {
          target: "ws://localhost:5174",
          ws: true,
        },
      },
    },
    plugins: [
      react({
        babel: {
          plugins: [
            ["@babel/plugin-proposal-decorators", { legacy: true }],
            ["@babel/plugin-proposal-class-properties", { loose: true }]
          ]
        }
      }),
      vitePluginImp({
        libList: [
          {
            libName: "antd",
            // style: (name) => `antd/es/${name}/style`,
            style: getStylePath,
          },
        ],
      })
    ],
    build: {
      // minify: "terser", // 必须开启：使用 terserOptions 才有效果
      // terserOptions: {
      //   compress: {
      //     drop_console: mode === 'production' ? true : false,
      //     drop_debugger: mode === 'production' ? true : false,
      //   },
      // },
      // chunkSizeWarningLimit: 1024, // 文件最大报警阈值设置
      // rollupOptions: {
      //   // 静态资源分类打包
      //   output: {
      //     // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
      //     globals: {},
      //     chunkFileNames: 'assets/js/[name]-[hash].js',
      //     entryFileNames: 'assets/js/[name]-[hash].js',
      //     assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      //     manualChunks(id) { // 静态资源分拆打包
      //       if (id.includes('node_modules')) {
      //         return id.toString().split('node_modules/')[1].split('/')[0].toString();
      //       }
      //     }
      //   }
      // },
      minify: "terser",
      rollupOptions: {
        output: {
          chunkFileNames: 'js/[name]-[hash].js', // 引入文件名的名称
          entryFileNames: 'js/[name]-[hash].js', // 包的入口文件名称
          assetFileNames: '[ext]/[name]-[hash].[ext]', // 资源文件像 字体，图片等
          manualChunks: (filePath) => {
            if (filePath.includes('node_modules')) {
              return 'vendor'
            }
          }
        }
      },
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src')
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          // 支持内联 JavaScript
          javascriptEnabled: true,  // 一般只需要配置  javascriptEnabled就行，modifyVars也可以稍微配置
          charset: false,
          // 更改主题在这里
          modifyVars: {},
          // additionalData: '@import "./src/assets/style/global.less";',
        },
      }
    }
  }
})