import React from 'react'
import { LoginContext } from '../context'
import {IUser} from '../context/types'
import {Account} from './Account'
import styles from './style.module.scss'
export interface ILoginFormProps {
    state: IUser;
    email: string;
    setPassword: (password: string)=>void;
    setEmail: (email: string)=>void;
    setContextDisplayAccount: (status: boolean)=>void;
}

const LoginForm=(props:ILoginFormProps)=>{
   
    return(
        <section className={styles['login-section']}>
        <h2>Login</h2>
        <form 
        className={styles['login-form']}
        onSubmit={e=>{
            e.preventDefault();
            {props?.email  && props.setContextDisplayAccount(true);
              
            }
        }}>
            <input onChange={e=>{
                props?.setEmail(e.target.value)
            }
                }
                type='text' placeholder='email'/>
            <input  
                onChange={
                    e=>{
                    props?.setPassword(e.target.value)}
                }
                type='password' 
                placeholder='password'
                required
            />
            <button>LOGIN</button>
        </form>
        </section>)
}
export const Login = () => {
    const {setContextDisplayAccount, setEmail,setPassword, state} = React.useContext(LoginContext)
    /**
     * 
     * @info The ternary below conditionally renders the LoginForm or Account component whether conextDisplayAccount is set to true or false.  
     */
    return !state.contextDisplayAccount ? 
        <LoginForm 
            {...state} 
            setPassword={setPassword} 
            setEmail={setEmail} 
            setContextDisplayAccount={setContextDisplayAccount}
        /> 
        :
        <Account/>
}