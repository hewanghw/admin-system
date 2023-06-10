import { constantRoutes } from '@/router'
//导入获取菜单数据的方法
import { getMenuList } from '@/api/user';
//导入Layout组件
import Layout from '@/layout'



export function dynamicRoutes(routes) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    //获取组件
    const component = tmp.component;
    //判断该路由是否有组件
    if (route.component) {
      //判断是否是根组件
      if (component === 'Layout') {
        tmp.component = Layout;
      } else {
        //获取对应的具体的组件信息
        tmp.component = (resolve) => require([`@/views${component}`], resolve)
      }
    }
    //判断是否有子菜单
    if (tmp.children) {
      tmp.children = dynamicRoutes(tmp.children)
    }
    res.push(tmp)

  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise((resolve, reject) => {
      getMenuList().then(
        res => {
          let accessedRoutes  //存放对应权限的路由信息
          //如果状态码为200，则表示成功
          if (res.code === 200) {
            accessedRoutes = dynamicRoutes(res.data)
          }
          //将路由信息保存到store中
          commit("SET_ROUTES", accessedRoutes);
          resolve(accessedRoutes);
        }
      ).catch(
        error => {
          reject(error)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
