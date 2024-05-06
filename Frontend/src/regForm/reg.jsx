import React, { useState } from 'react';
import { Button } from "@nextui-org/react";
import './reg.css';

const Reg = () => {

  const [isClicked, setIsClicked] = useState(false);
  const [font, setFont] = useState(false)

  const handleFont = () => {
    setFont(!font)
  }

  const handleIsClicked = (e) => {
    e.preventDefault();
    setIsClicked(!isClicked);
  };

  return (
    <div className='w-screen h-screen'>
      <div className='pt bg-slate-500'>
        <div className='pt-one'>
          <div className='pt-dtl'>
            <h1 className='flex justify-center align-middle py-3 font-serif'>
              {!isClicked ? 'Welcome Back !!!' : 'Welcome !!'}
            </h1>
            <p className='flex justify-center align-middle'>
              {!isClicked ? 'stay connect to meet new community' : 'this site is not for under 18 user'}
            </p>
            <div className='btn flex justify-center align-middle mt-8 bg-slate-500'>
              <Button 
                onClick={handleIsClicked}
                radius='full'>{!isClicked ? "Sign in" : "Sign up"}</Button>
            </div>
          </div>
        </div> 
        <div className='pt-two'>
          {/* signup form */}
          {!isClicked ? (
            <div className='form-prt'>
              <form>
                <div className='input-group'>
                  <label htmlFor="fullname">Enter Fullname</label>
                  <input type="text" id="fullname" />
                </div>
                <div className='input-group'>
                  <label htmlFor="username" className={!isClicked ? 'font-lg' : 'font-sm'}>Enter UserName</label>
                  <input type="text" id="username"  onClick={handleFont}/>
                </div>
                <div className='input-group'>
                  <label htmlFor="email">Enter Email</label>
                  <input type="email" id="email"  className='px-3'/>
                </div>
                <div className='input-group'>
                  <label htmlFor="password">Enter Password</label>
                  <input type="password" id="password" />
                </div>
                <div className='input-group'>
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input type="password" id="confirmPassword" />
                </div>
                <div className='btn flex align-middle justify-center mt-8 bg-slate-500 w-2/4'>
                  <Button radius='full'>Sign up</Button>
                </div>
                <div className='btn-dtl flex align-middle justify-center mt-9 w-2/4'>
                  <a href="#">Already have an account</a>
                </div>
              </form>
            </div>
          ) : (
            <div className='form-prt login'>
              <form>
                <div className='input-group'>
                  <label htmlFor="loginUsername">Enter UserName</label>
                  <input type="text" id="loginUsername" />
                </div>
                <div className='input-group'>
                  <label htmlFor="loginPassword">Enter Password</label>
                  <input type="password" id="loginPassword" />
                </div>
                <div className='btn flex align-middle justify-center mt-8 bg-slate-500 w-2/4'>
                  <Button radius='full'>Sign in</Button>
                </div>
                <div className='btn-dtl flex align-middle justify-center mt-9 w-2/4'>
                  <a href="#">I don't have an account</a>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reg;
