import axios from 'axios'
export function login() {
  return axios.post(
    `${
      import.meta.env.VITE_GLOB_API_URL
    }/sys/login?gt=f6817f48af4fb3af11b9e8bf18211218b333ee`,
    {
      username: 'eb02',
      password: 'Ebadmin123@xd2022!',
      loginMode: 'app'
    }
  )
}
