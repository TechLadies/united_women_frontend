import React from 'react';
import './Login.css';
import useForm from '../useForm';
import validate from '../validateLogin';
import { Redirect  } from "react-router-dom";

const LoginPage = () => {

    const { inputs, errors, touched, handleChange, handleBlur, handleSubmit} = useForm(submit, validate);

    function submit() {
      fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: inputs.username,
            password: inputs.password,
        }),
      }).then((responseJson) => {
        window.location.href = '/';
      })
      .catch((error) => {
        console.error(error);
      });
    }

  return (
    <div className='container'>
        <div className='row justify-content-center'>
            <div className='col-6 col-md-4'>
                <h2><b>United Women</b></h2>
                    <form className='loginForm' onSubmit={handleSubmit}>
                        <label>Username</label>
                        <div className='form-group'>
                            <input className='form-control'
                            type='email'
                            name='username'
                            value={inputs.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            />
                            {errors.username && touched.username && (
                                <div className='errorMessage'>{errors.username}</div>
                            )}
                        </div>
                        <label className='spacer'>Password</label>
                        <div className='form-group'>
                            <input className='form-control'
                            type='password'
                            name='password'
                            value={inputs.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            /> 
                            {errors.password && touched.password && (
                                <div className='errorMessage'>{errors.password}</div>
                            )}
                        </div>
                        <button type='submit' className='loginBtn btn btn-block'>LOGIN</button>
                    </form> 
            </div>
        </div>
    </div>
  );
}

export default LoginPage;