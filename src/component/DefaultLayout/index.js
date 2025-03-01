import Header from "./header"
import Login from "./login"
import { AuthContext } from "../AuthContext"
import { useContext } from "react"

const DefaultLayout = ({children}) =>{
    const {isLoggedIn} = useContext(AuthContext)

    return (
        <div className="default-wrapper--layout">
            {!isLoggedIn && <Login/>}
            <Header/>
            <div className="default-container--layout">
                <div className="default-content--layout">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default DefaultLayout 