import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'
import "../../style/LoginPage.scss"
import "react-toastify/ReactToastify.css"
import { ToastContainer,toast } from 'react-toastify'

const LoginPage = () => {
  const {makeAuthRequest, dispatch, authErrorMsg, authData} = useContext(AuthContext)
  const [loginData, setLoginData] = useState({username: '', password: ''})
  
  const formDataHandle = (e, property) => {
    setLoginData({
      ...loginData,
      [property]: e.target.value
    })
  }

  const navigate = useNavigate()

  const handleSumit = async(e) => {
    e.preventDefault()
    makeAuthRequest(dispatch, loginData);
  }

  useEffect(() => {
    if(authData.isLoggedIn) navigate("/")
  }, [authData.isLoggedIn])

  const notify = () => toast("You are toggled in!")

  const checkLoginStatus = () => {
    if (authData.isLoggedIn) notify();
  }

  return (
    <main className='bg-secondary'>
      <div className='container'>
        <div className='sc-login'>
          <div className='login-content px-5 py-4'>
            <div className='login-title fs-20'>Login / Sign Up</div>
            <form onSubmit={handleSumit}>
              <div className='form-element'>
                <label htmlFor='username' className='form-label'>Username</label>
                <input className='form-control' type='text' id='username' onChange={(e) => formDataHandle(e, "username")} value={loginData.username}/>
              </div>

              <div className='form-element'>
                <label htmlFor='password' className='form-label'>Password</label>
                <input className='form-control' type='password' id='password' onChange={(e) => formDataHandle(e, "password")} value={loginData.password}/>
              </div>

              <button type='submit' className='btn-login fs-16' onClick={() => checkLoginStatus}>Login</button>
              <div className='login-error-msg text-center my-3'>
                <p className='text-danger'>{authErrorMsg}</p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </main>
  )
}

export default LoginPage
