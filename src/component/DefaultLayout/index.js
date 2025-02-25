import Header from "./header"

const DefaultLayout = ({children}) =>{
    return (
        <div className="default-wrapper--layout">
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