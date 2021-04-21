# Learn Context API With React Hooks & Typescript 
## Use React's Context API to share state and state changes globally across component.
Allows users to provide data through component tree- avoiding prop drilling and passing props down manually through every level across components. 

### Step 1 | Use ``` createContext ``` method 
```js
import React from 'react';
import {IUser} from './types';

export interface LoginContextProps {
    setEmail: (user: IUser['email'])=>void; 
    setContextDisplayAccount: (status: boolean)=>void;
    setPassword: (password: string)=>void;
    state: any;

};

```
>```@info Include a constant that holds the default context value. This default value will always be accessible by the Provider, even if there are no values passed to them.```
```js
export const loginContextDefaultValue: LoginContextProps = { 
    setContextDisplayAccount: ()=>{},
    setEmail: ()=>{
    },
    setPassword: ()=>{},
    state: '',
};

//Initialize React Context
export const LoginContext = React.createContext<LoginContextProps>(loginContextDefaultValue)

```
### Step 2 | Utilize Context Throughout Application With the ```Provider```
The ```Provider``` actually provides the above context to the rest of the application. Every context has a ```Provider``` so that components can subscribe to context changes. 

>```@info Create the Context object with Consumer and Provider keys to pass to children and parent components, respectively. It receives a default value - note that the default value can only be used when a component does not have a matching Provider above its tree.```
```js
 export const UsersProvider = ({children}: any)=>{

    const [state, setState] = React.useState(
        loginContextDefaultValue
    )
```
>```@info prevState holds the value of state before the setState was triggered by React, which will prevent the setState method from overwriting state data ```
```js
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
   ```
   >```@info Return the Provider key on the Context Object - making sure to pass down a value props that holds an object of your default context values, state, and any additional methods that will produce state changes ```
   ```js
    return(
        <LoginContext.Provider value={{...loginContextDefaultValue, setEmail, setContextDisplayAccount, setPassword, state}}>
            {children}
        </LoginContext.Provider>
    )
}
  
```
### Step 3 | Consuming Context
The ```js useContext``` hook allows the application to consume context. We give it the Context object through the  ```js UsersContext.Consumer```
```js 
//Login.tsx
  export interface ILoginFormProps {
    state: IUser;
    setPassword: (password: string)=>void;
    setEmail: (email: string)=>void;
    setContextDisplayAccount: (status: boolean)=>void;
}
```
```js 
const LoginForm=(props:ILoginFormProps)=>{
   
    return(
        <>
        <h2>Login</h2>
        <form onSubmit={e=>{
            e.preventDefault();
            {props.state.email && props.setContextDisplayAccount(true);
              
            }
        }}>
            <input onChange={e=>{
                props.setEmail(e.target.value)
            }
                }
                type='text' placeholder='email'/>
            <input  
                onChange={
                    e=>{
                    props.setPassword(e.target.value)}
                }
                type='password' 
                placeholder='password'
                required
            />
            <button onClick={()=>props.setContextDisplayAccount(true)}>LOGIN</button>
        </form>
        </>)
}
export const Login = () => {
    const {setContextDisplayAccount, setEmail,setPassword, state} = React.useContext(LoginContext)
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
```
```js
//Profile.tsx
  export const Profile=()=>{
    const {state,setContextDisplayAccount} = React.useContext(LoginContext)
    return(
        <>
        <h2>Profile</h2>
        <h4>Welcome, {state.email}!</h4>
        <button onClick={()=>{setContextDisplayAccount(false)}}>LOGOUT</button>
        </>
    )
}
```
### Importing Context
In App.js file, we will wrap the Context Provider around the parent component - App. 
```js
import React from 'react';
import './App.css';
import {UsersProvider} from './context'
import {Login} from './components'

function App() {
  
  return (
    <UsersProvider>
    <div className="App">
     <Login/>
    </div>
    </UsersProvider>
   
  );
}

export default App;

```

## Additional Resources 
* [React Context Documentation](https://reactjs.org/docs/context.html)
* [Context Intro Tutorial](https://www.smashingmagazine.com/2020/01/introduction-react-context-api/)
* [ContextAPI DeepDive](https://blog.logrocket.com/a-deep-dive-into-react-context-api/)
* [Working With useContext() Hooks](https://betterprogramming.pub/how-to-use-reacts-context-api-and-usecontext-hooks-effectively-ed98ad9343b6)
* [React Hooks & Context API](https://www.sitepoint.com/replace-redux-react-hooks-context-api/)
* [Rendering Behavior In React](https://blog.isquaredsoftware.com/2020/05/blogged-answers-a-mostly-complete-guide-to-react-rendering-behavior/#context-and-rendering-behavior)

## Caveats To Consider 
* It's not necessary to use Context for state management that should be kept locally 
*  Working with useReducer for more complex state handling with dynamic renders (authentication with login)
