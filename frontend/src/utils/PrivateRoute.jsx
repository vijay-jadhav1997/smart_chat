import { Navigate} from "react-router-dom"
import {useContext} from "react"
import AuthContext from "../contexts/AuthContext"


const PrivateRoute = ({children}) => {
  const {user} = useContext(AuthContext)

  return user ? children :  <Navigate to="/login" />
}

export default PrivateRoute