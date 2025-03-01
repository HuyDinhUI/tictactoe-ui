
import "./App.css";
import {
  Route,
  Routes,
  BrowserRouter as Router,
  Link,
  NavLink,
} from "react-router-dom";
import PublicRouters from "./component/Routers";
import DefaultLayout from "./component/DefaultLayout";
import { Fragment } from "react";
import { AuthProvider } from "./component/AuthContext";


function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {PublicRouters.map((route, index) => {
              const Page = route.component;
              let Layout = DefaultLayout;
              if (route.layout) {
                Layout = route.layout;
              } else if (route.layout === null) {
                Layout = Fragment;
              }
  
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                ></Route>
              );
            })}
  
            {/* <Route path="/" element={<HomePage />} />
          <Route path="/Game" element={<Game/>} />
          <Route path='/Human' element={<Human/>}></Route>
          <Route path='/Challenge' element={<Challenge></Challenge>}></Route>
          <Route path='/About' element={<About></About>}></Route>
          <Route path='/Mode' element={<ModePage></ModePage>}></Route> */}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
