import './App.scss'
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Basket, Error, Search, ViewProductSingle, ViewCategoryProductList, Login, Account} from './view/index'
import { Footer, Navbar } from './components/common/index'
import ProtectedRoute from './routers/ProtectedRoute'
import PublicRoute from './routers/PublicRoute'
import { useContext } from 'react';
import { AuthContext } from './context/authContext';

function App() {
  const {authData} = useContext(AuthContext)

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
            {/* Protected routes */}
            <Route element = { <ProtectedRoute authData={authData} />}>
                <Route path = "account" element = {<Account />} />
                <Route path = "basket" element = {<Basket />} />
            </Route>

            {/* Public routes */}
            <Route element = { <PublicRoute /> }>
              <Route path = "/" element = { <Home />} />
              <Route path = "/home" element = { <Home />} />
              <Route path = "error" element = {<Error />} />
              <Route path = "login" element = { <Login />} />
              <Route path = "products/:id" element = {<ViewProductSingle />} />
              <Route path = "category/:categoryKey" element = {<ViewCategoryProductList />} />
              <Route path = "search/:searchKey" element = {<Search />} />
              <Route path = "*" element = {<Error />} />
            </Route>
        </Routes>
        <Footer />
    </Router>
    </>
  )
}

export default App
