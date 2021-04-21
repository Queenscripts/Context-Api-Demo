import React from 'react'
import { LoginContext } from '../context'
import styles from './style.module.scss'

export const Account=()=>{
    const {state,setContextDisplayAccount} = React.useContext(LoginContext)
    return(
        <>
        <h2>Account Page</h2>
        <section className={styles['account-section']}> 
            <h4>Welcome, {state.email}!</h4>
            <button onClick={()=>{setContextDisplayAccount(false)}}>LOGOUT</button>
        </section>
       
        </>
    )
}

