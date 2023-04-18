/** 
 * api接口的统一封装
 */
import axios from './request.js';
import Qs from 'qs';
const urlApi = 'http://localhost:8080/';//本地测试

axios.defaults.headers["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers['Access-Control-Allow-Headers']= 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild';
axios.defaults.headers['Access-Control-Allow-Methods']="PUT,POST,GET,DELETE,OPTIONS";
axios.defaults.headers['X-Powered-By']='3.2.1';
//发送post请求
export function requestPost(url,query) {
	return axios({
		url: urlApi + url,//模拟数据接口
		method: 'post',
		data: Qs.stringify(query)
	})
}

// 登录
export function GetUserLogin(query) {
	return axios({
		url: urlApi + 'loginData',//模拟数据接口
		method: 'post',
		data: Qs.stringify(query)
	})
}

//index/weborder/gongdanInfoNum
export function gongdanInfoNum(token) {
	return axios({
		url: urlApi + 'index/weborder/gongdanInfoNum',
		method: 'get',
		headers: {
			// 'Content-type': 'application/json;charset=UTF-8',
			'Authorization': token
		}
	})
}