import React from 'react';
import {IUser} from './types';

export interface LoginContextProps {
    setEmail: (user: IUser['email'])=>void; 
    setContextDisplayAccount: (status: boolean)=>void;
    setPassword: (password: string)=>void;
    state: any;

};

/**
 * 
 * @info Include a constant that holds the default context value. This default value will always be accessible by the Provider, even if there are no values passed to them.
 */
export const loginContextDefaultValue: LoginContextProps = { 
    setContextDisplayAccount: ()=>{},
    setEmail: ()=>{
    },
    setPassword: ()=>{},
    state: '',
};

//Initialize React Context
export const LoginContext = React.createContext<LoginContextProps>(loginContextDefaultValue)
/**
 * 
 * @info Create the Context object with Consumer and Provider keys to pass to children and parent components, respectively. It receives a default value - note that the default value can only be used when a component does not have a matching Provider above its tree.
 */
 export const UsersProvider = ({children}: any)=>{

    const [state, setState] = React.useState(
        loginContextDefaultValue
    )

    /**
     * 
     * @info prevState holds the value of state before the setState was triggered by React, which will prevent the setState method from overwriting state data 
     */
    const setEmail = (accountEmail: string) =>{
        setState(
            prevState=>({
                ...prevState,
                email: accountEmail
                ,
            })
        )
    }
    const setPassword = (accountPassword: string) =>{
        setState(
            prevState=>({
                ...prevState,
                password: accountPassword
                ,
            })
        )
    }

    const setContextDisplayAccount = (displayProfile: boolean)=>{
    setState(
        prevState=>({
            ...prevState,
            contextDisplayAccount: displayProfile
        })
    )}

    return(
        /**
         * 
         * @info Return the Provider key on the Context Object - making sure to pass down a value props that holds an object of your default context values, state, and any additional methods that will produce state changes
         */
        <LoginContext.Provider value={{...loginContextDefaultValue, setEmail, setContextDisplayAccount, setPassword, state}}>
            {children}
        </LoginContext.Provider>
    )
}