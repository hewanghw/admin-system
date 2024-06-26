import http from '@/utils/request'
/**
* 用户登录
* @returns
*/
export async function login(data) {
  return await http.login("/user/login", data)
}
/**
* 获取用户信息和权限信息
* @returns
*/
export async function getInfo() {
  return await http.get("/user/getInfo")
}
/**
* 退出登录
* @returns
*/
export async function logout(param) {
  return await http.post("/user/logout", param);
}

/**
* 获取菜单数据
*/
export async function getMenuList(){
  return await http.get("/user/getMenuList");
  }
  