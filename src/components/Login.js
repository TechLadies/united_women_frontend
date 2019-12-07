import React from 'react';
import './Login.css';
import useForm from '../useForm';
import validate from '../validateLogin';
import auth from '../helpers/auth';
import { withLoginPageHOC } from '../wrappers/withTokenHOC';


function LoginPage({ setToken }) {

  const { inputs, errors, touched, handleChange, handleBlur, handleSubmit} = useForm(submit, validate);

  async function submit() {
    try {
      const token = await auth({
        username: inputs.username,
        password: inputs.password,
      });

      if (token) {
        setToken(token);
      }

    } catch (err) {
      console.error(err);
    }
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

export default withLoginPageHOC(LoginPage);