import type { Router } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { login } from '@/api/login'
import { NAV_LIST, useNavStore } from '@/stores/nav'
import { useGlobSetting } from '@/hooks/setting'

const globSetting = useGlobSetting()

export function setupRouterGuard(router: Router) {
  const user = useUserStore()
  router.beforeEach(async (to) => {
    if (!user.token) {
      // const loginRes = await login()
      // const loginData = loginRes.data
      // const { token } = loginData.result
      // user.setToken(token)
      user.setToken(globSetting.token)
    }
    // console.log(to.path)
    const navIdx = NAV_LIST.findIndex(nav => {
      return (
        nav.path.findIndex(path => {
          return to.path.indexOf(path) >= 0
        }) >= 0
      )
    })
    const navState = useNavStore()
    navState.setNavIdx(navIdx)
    return true
  })
}
