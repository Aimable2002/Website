import React, { useState } from 'react';
import { Button, Select, SelectItem } from "@nextui-org/react";
import './reg.css';
import useSignup from '../hook/useSignup';
import { transform } from 'framer-motion';
import useLogin from '../hook/useLogin';

const Reg = () => {

  const [isClicked, setIsClicked] = useState(false);
const [next, setIsNext] = useState(false);

const handleNext = (e) => {
  e.preventDefault();
  setIsNext(!next)
}
  const handleIsClicked = (e) => {
    e.preventDefault();
    setIsClicked(!isClicked);
  };

  const {loading, signup} = useSignup();
  const [input, setInput] = useState({
    fullName: "",
    userName: "",
    email: "",
    age: "",
    gender: "",
    password: "",
    confirmPassword: ""
  })

  const handleSubmit1 = async(e) => {
    e.preventDefault();
    const {fullName, userName, email, age, gender, password, confirmPassword} = input
    console.log('inputs :', input)
    await signup(input)
  }
const {login} = useLogin();
const [inputs, setInputs] = useState({
  userName: "",
  password: "",
})
const handleSubmit2 = async(e) => {
  e.preventDefault();
  const {userName, password} = inputs
  console.log('inputs :', inputs)
  await login(inputs)
}
  return (
    <div className='w-screen h-screen'>
      <div className='pt '>
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
              <form onSubmit={handleSubmit1}>
              {!next ? (
                <>
                <div className='input-group'>
                  <label htmlFor="fullname">Enter Fullname</label>
                  <input
                  type="text" 
                  id="fullname"
                  value={input.fullName}
                  onChange={(e) => setInput({...input, fullName: e.target.value})} />
                </div>
                <div className='input-group'>
                  <label htmlFor="username" className={!isClicked ? 'font-lg' : 'font-sm'}>Enter UserName</label>
                  <input 
                  type="text" 
                  id="username"
                  value={input.userName}
                  onChange={(e) => setInput({...input, userName: e.target.value})}/>
                </div>
                <div className='input-group'>
                  <label htmlFor="email">Enter Email</label>
                  <input 
                  type="email" 
                  id="email"  
                  className='px-3'
                  value={input.email}
                  onChange={(e) => setInput({...input, email: e.target.value})}/>
                </div>
                <div className='input-group'>
                  <label htmlFor="password">Enter Password</label>
                  <input 
                  type="password" 
                  id="password" 
                  value={input.password}
                  onChange={(e) => setInput({...input, password: e.target.value})}/>
                </div>
                <div className='input-group'>
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input 
                  type="password" 
                  id="confirmPassword" 
                  value={input.confirmPassword}
                  onChange={(e) => setInput({...input, confirmPassword: e.target.value})}/>
                </div>
                <div className='btn flex align-middle justify-center mt-8 bg-slate-500 w-2/4'>
                  <Button radius='full' onClick={handleNext}>Next</Button>
                </div>
                <div className='btn-dtl flex align-middle justify-center mt-9 w-2/4'>
                  <a href="#">Already have an account</a>
                </div>
                </>
                ) : (
                  <>
                  <div className='input-group'>
                    <label htmlFor="confirmPassword">Ender age</label>
                    <input 
                    type="number" 
                    id="confirmPassword" 
                    value={input.age}
                    onChange={(e) => setInput({...input, age: e.target.value})}/>
                  </div>
                  {/* <div className='input-group'>
                    <Select
                    label='select gender'
                    style={{background: 'transparent', color: 'white'}}
                    value={input.gender}
                    onChange={(e) => setInput({...input, gender: e.target.value})}
                    >
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </Select>
                  </div> */}
                  <div className='input-group'>
                  <select className="select select-ghost w-full max-w-xs" style={{
                    background: 'transparent',
                    color: 'white',
                    border: 'none',
                    outline: 'none'
                    }}
                    value={input.gender}
                    onChange={(e) => setInput({...input, gender: e.target.value})}>
                    <option value='' style={{background: 'black'}}>select gender</option>
                    <option value="Male" style={{background: 'black'}}>Male</option>
                    <option value="Female" style={{background: 'black'}}>Female</option>
                  </select>
                  
                  </div>
                  <div className='btn flex align-middle justify-center mt-8 bg-slate-500 w-2/4'>
                    <Button type='submit' radius='full'>Sign up</Button>
                  </div>
                  <div className='btn-dtl flex align-middle justify-center mt-9 w-2/4'>
                    <a href="#" onClick={(e) => setIsNext(!next)}>Go Back</a>
                  </div>
                  </>
                )}
              </form>
            </div>
          ) : (
            <div className='form-prt login'>
              <form onSubmit={handleSubmit2}>
                <div className='input-group'>
                  <label htmlFor="loginUsername">Enter UserName</label>
                  <input 
                  type="text" 
                  id="loginUsername"
                  value={inputs.userName}
                  onChange={(e) => setInputs({...inputs, userName: e.target.value})} />
                </div>
                <div className='input-group'>
                  <label htmlFor="loginPassword">Enter Password</label>
                  <input 
                  type="password" 
                  id="loginPassword"
                  value={inputs.password}
                  onChange={(e) => setInputs({...inputs, password: e.target.value})} />
                </div>
                <div className='btn flex align-middle justify-center mt-8 bg-slate-500 w-2/4'>
                  <Button type='submit' radius='full'>Sign in</Button>
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

