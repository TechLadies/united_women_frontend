import React from 'react';
import './Login.css';
import useForm from '../useForm';
import validate from '../validateLogin';

const LoginPage = () => {

    const { inputs, errors, touched, handleChange, handleBlur, handleSubmit} = useForm(submit, validate);

    function submit() {
      console.log('Submitted');
      console.log(inputs);
    }

  return (
    <div className='loginContainer'>
        <div className='row justify-content-center'>
            <div className='col-6 col-md-4'>
                <h2 className='loginHeader'><b>United Women</b></h2>
                    <form className='loginForm' onSubmit={handleSubmit}>
                        <label className='loginLabel1'>Username</label>
                        <div className='form-group'>
                            <input className='form-control'
                            type='email'
                            name='username'
                            placeholder='Please enter your email'
                            value={inputs.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            />
                            {errors.username && touched.username && (
                                <div className='errorMessage'>{errors.username}</div>
                            )}
                        </div>
                        <label className='loginLabel2'>Password</label>
                        <div className='form-group'>
                            <input className='form-control'
                            type='password'
                            name='password'
                            placeholder='Please enter your password'
                            value={inputs.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            /> 
                            {errors.password && touched.password && (
                                <div className='errorMessage'>{errors.password}</div>
                            )}
                        </div>
                        <button type='submit' className='loginBtn btn btn-block'>Login</button>
                    </form> 
            </div>
        </div>
    </div>
  );
}

export default LoginPage;