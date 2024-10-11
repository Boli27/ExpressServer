import { useState } from "react";
import axios from "axios";

function Login() {

    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const handleChange = ({ target }) => {
        const { name, value } = target;
        return setData({ ...data, [name]: value })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // alert(data.email + " "+ data.password)
        try {
            const { data } = await axios.post("http://localhost:4000/api/v1/auth/login", {email,password})
            localStorage.setItem("token-semillero", data.jwt)
        } catch (error) {
            console.log(error)
        }
    };

    const{email,password}=data
    return (
        <form className="grid" onSubmit={handleSubmit}>
            <div className="grid">
                <label htmlFor="" className='font-bold text-xl' >Email</label>
                <input type="email" placeholder='Ingresa tu correo' id="email" name="email" onChange={handleChange} />
            </div>
            <div className="grid">
                <label htmlFor="" className='font-bold text-xl'>Password</label>
                <input type="password" placeholder='Ingresa tu contraseña' id='password' name="password" onChange={handleChange} />
            </div>
            <button type="submit" className="p-3 mt-5 bg-indigo-500 hover:bg-indigo-600 text-white rounded font-bold" >Iniciar sesion </button>
        </form>
    )
};

export default Login;