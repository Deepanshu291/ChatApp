import { ChangeEvent, FormEvent, useState } from "react";
import { IUser } from "../utils/types";
import useAuth from "../contexts/Authcontext";
import { Link } from "react-router-dom";

export const Login = () => {



  const initialData: IUser = {
    username: "",
    email: "",
    password: "",
    _id: "",
  };
  const [User, setUser] = useState(initialData);

  const { loginuser } = useAuth();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...User, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const {email, password } = User;
    loginuser!(email!, password!);
  };

  return (
    <>
      <div className="main-container">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="header">
            <img
              src="https://cdn.dribbble.com/users/267404/screenshots/3713416/talkup.png"
              alt="logo"
            />

            <h1 className="font-bold ">ChatApp</h1>
          </div>
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
          <hr />
          <button className="submit-btn " type="submit">
            Submit
          </button>
          <span>
            Don't have an account ? <Link to={"/register"}>Create One</Link>
          </span>
        </form>
      </div>
    </>
  );
};
