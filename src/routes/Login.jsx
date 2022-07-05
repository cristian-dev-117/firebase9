import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

const Login = () => {

    const [email, setEmail] = useState("nevve@gmail.com");
    const [pass, setPass] = useState("123123");
    const { loginUser } = useContext(UserContext);
    const navegate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            await loginUser(email, pass);
            navegate("/");
        } catch (error) {
            console.log("Error", error);
        }
    }


    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="password"
                value={pass}
                onChange={e => setPass(e.target.value)}
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
