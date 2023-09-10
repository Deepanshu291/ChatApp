import  { ChangeEvent, FormEvent, useState } from 'react'
import { IUser } from '../utils/types'
import useAuth from '../contexts/Authcontext'
import { Link,} from 'react-router-dom'


export const Register = () => {


    const initialData:IUser ={
      username: '',
      email: '',
      password: '',
    }
  const [User, setUser] = useState(initialData)

  const {registeruser, handleValidation} = useAuth()

  const handleChange = (event:ChangeEvent<HTMLInputElement>)=>{

    setUser({...User, [event.target.name]: event.target.value})
  }

  const handleSubmit = async (e:FormEvent<HTMLFormElement>)=>{
      e.preventDefault()
      if (handleValidation!(User)) {
        const {username, email,password} = User
        registeruser!(username!, email!, password!)
      }
     
  }

    return (
      <>
        <div className="main-container">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="header">
              <img
                src="https://cdn.dribbble.com/users/267404/screenshots/3713416/talkup.png"
                alt="logo"
              />

              <h1>ChatApp</h1>
            </div>

            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="text"
              placeholder="Email"
              name="email"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => handleChange(e)}
            />

            <button className='submit-btn' type="submit">Create User</button>

            <span>
              Already have an account ? <Link to={"/login"}>login</Link>
            </span>
          </form>
        </div>
      </>
    );
}
