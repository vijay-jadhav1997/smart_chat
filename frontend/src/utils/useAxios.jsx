import axios from 'axios'
import {jwtDecode} from 'jwt-decode'
import dayjs from 'dayjs'
import { useContext } from 'react'
import authContext from '../contexts/AuthContext'


const baseURL = import.meta.env.VITE_API_URL

const useAxios = () => {
  const {authTokens, setUser, setAuthTokens} = useContext(authContext)

  const axiosObj = axios.create({
    baseURL,
    headers: {Authorization: `Bearer ${authTokens?.access}`}
  })

  axiosObj.interceptors.request.use(async (request) => {
    const user = jwtDecode(authTokens?.access)
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1

    if (!isExpired) {
      return request
    }

    const response = await axios.post(`${baseURL}/auth-api/token/refresh`, {
      refresh: authTokens?.refresh
    })

    localStorage.setItem('authTokens', JSON.stringify(response.data))

    setAuthTokens(response.data)
    setUser(jwtDecode(response.data.access))

    request.headers.Authorization = `Bearer ${response.data.access}`

    return request
  })

  return axiosObj
  
}



export default useAxios