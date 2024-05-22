import { Button } from '@nextui-org/react'
import React, { useState } from 'react'

import useLogin from '../../hook/useLogin';
import useSignup from '../../hook/useSignup';

const smReg = () => {
    
    const [isConfirm, setIsConfirm] = useState();
    const [isNext, setIsNext] = useState();

    const handleNext = () => {
        setIsNext(!isNext);
    }
    const handleConfirm = () => {
        setIsConfirm(!isConfirm)
    }
    const {signup} = useSignup();
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

    const [isLog, setIsLog] = useState();

    const handleLog = () => {
        setIsLog(!isLog);
    }

  return (
    <div className='w-screen '>
        {!isConfirm ? (
        <div className='prt1'>
            <div className='ctn w-full flex mt-40'>
                <div className='hd flex w-full flex-col align-middle justify-center'>
                    <h1 className='text-center mb-10'>Welcome!!!!</h1>
                    <p className='text-center text-red-500'>This site is for adults only <br /> by using this site <br /> u confirm that you are above 18 yrs old</p>
                </div>
            </div>
            <div className='w-full flex justify-center mt-10'>
                <Button onClick={handleConfirm}>I Confirm</Button>
            </div>
        </div>
        ) : (
        <div className='prt2 mt-40'>
            <div className='hd1 mb-10'>
                <h1 className='text-center'><span>WebApp</span> Welcomes you</h1>
            </div>
            {!isLog ? (
            <div className='frm-group'>
                {!isNext ? (
                <form onSubmit={handleSubmit1}>
                    <div>
                        <input 
                        type="text" 
                        placeholder='Full Name'
                        className='text-center py-1' 
                        value={input.fullName}
                        onChange={(e) => setInput({...input, fullName: e.target.value})}/>
                    </div>
                    <div>
                        <input 
                        type="text" 
                        placeholder='userName'
                        className='text-center'
                        value={input.userName}
                        onChange={(e) => setInput({...input, userName: e.target.value})} />
                    </div>
                    <div>
                        <input 
                        type="email" 
                        placeholder='Email'
                        className='text-center py-1' 
                        value={input.email}
                        onChange={(e) => setInput({...input, email: e.target.value})}/>
                    </div>
                    <div>
                        <input 
                        type="password" 
                        placeholder='Password'
                        className='text-center' 
                        value={input.password}
                        onChange={(e) => setInput({...input, password: e.target.value})}/>
                    </div>
                    <div>
                        <input 
                        type="password" 
                        placeholder='Confirm Password'
                        className='text-center py-1' 
                        value={input.confirmPassword}
                        onChange={(e) => setInput({...input, confirmPassword: e.target.value})}/>
                    </div>
                    <div className='btn flex justify-center mt-5'>
                        <Button onClick={handleNext}>Next</Button>
                    </div>
                    <div className='ftr flex flex-row w-full hover:text-fuchsia-400' onClick={handleLog}>
                        <p>Already have account <span className='green'>  login</span></p>
                    </div>
                </form>
                ) : (
                    <form onSubmit={handleSubmit1}>
                        <div>
                            <input 
                            type="text" 
                            placeholder='Enter age'
                            className='text-center'
                            value={input.age}
                            onChange={(e) => setInput({...input, age: e.target.value})} />
                        </div>
                        <div>
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
                        <div className='btn flex justify-center mt-5'>
                            <Button type='submit'>Sign up</Button>
                        </div>
                        <div className='ftr flex flex-row w-full hover:text-fuchsia-400' onClick={(e) => setIsNext(!isNext)}>
                            <p>Already have account <span className='green'>  login</span></p>
                        </div>
                    </form>
                )}
            </div>
            ) : (
            <div className='prt2'>
                <form onSubmit={handleSubmit2}>
                    <div>
                        <input 
                        type="text" 
                        placeholder='userName'
                        className='text-center py-1' 
                        value={inputs.userName}
                        onChange={(e) => setInputs({...inputs, userName: e.target.value})}/>
                    </div>
                    <div>
                        <input 
                        type="password" 
                        placeholder='Password'
                        className='text-center'
                        value={inputs.password}
                        onChange={(e) => setInputs({...inputs, password: e.target.value})} />
                    </div>
                    <div className='btn flex justify-center mt-5'>
                        <Button type='submit'>Login</Button>
                    </div>
                    <div className='ftr flex flex-row w-full hover:text-fuchsia-400' onClick={() => setIsLog(!isLog)}>
                        <p>dont have account <span className='green'>  signup</span></p>
                    </div>
                </form>
            </div>
            )}
        </div>
        )}
    </div>

  )
}

export default smReg