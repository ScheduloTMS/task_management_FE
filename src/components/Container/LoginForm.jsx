import React from 'react'
import './loginForm.css'
import { FaUser, FaLock } from 'react-icons/fa';

const LoginForm = () => {
  return (
    <form className="form-container">

            <div className="input-group mb-4">
              <span className="input-group-text"><FaUser /></span>
              <input type="text" placeholder="Enter your Username" className="form-control" />
            </div>

            <div className="input-group mb-4">
              <span className="input-group-text"><FaLock /></span>
              <input type="password" placeholder="Enter your Password" className="form-control" />
            </div>
    </form>
  )
}

export default LoginForm