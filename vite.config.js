import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		createSvgIconsPlugin({
			// 指定需要缓存的图标文件夹
			iconDirs: [path.resolve(process.cwd(), 'src/icons/svg')],
			// 指定symbolId格式
			symbolId: '[name]',
		})
	],
	css: {
		postcss: {
			plugins: [
				{
					postcssPlugin: 'internal:charset-removal',
					AtRule: {
						charset: (atRule) => {
							// 去除elementPlus内部charset警告
							if (atRule.name === 'charset') {
								atRule.remove()
							}
						}
					}
				}
			]
		}
	},
	build: {
		sourcemap: false,
		minify: 'terser',
		chunkSizeWarningLimit: 1500,
		terserOptions: {
			compress: {
				drop_console: true,
				drop_debugger: true
			}
		},
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes('node_modules')) {
						return id
							.toString()
							.split('node_modules/')[1]
							.split('/')[0]
							.toString();
					}
				},
				chunkFileNames: (chunkInfo) => {
					const facadeModuleId = chunkInfo.facadeModuleId
						? chunkInfo.facadeModuleId.split('/')
						: [];
					const fileName =
						facadeModuleId[facadeModuleId.length - 2] || '[name]';
					return `js/${fileName}/[name].[hash].js`;
				}
			}
		}
	},
	// proxyTable: {
	// 	"/api":{
	// 		target: 'http://localhost:8080/',      //后端接口的根目录
	// 		changeOrigin: true,                    //是否跨域
	// 		pathRewrite: {
	// 			'^/api': '/'
	// 		}
	// 	}
	// }
})

