import {useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { UserContext } from "../context/UserProvider";

const Register = () => {

    const {registerUser} = useContext(UserContext);
    const navegate = useNavigate();
    const {
        register,
        handleSubmit,
        getValues,
        setError,
        formState:{
            errors
        }
    } = useForm();

    const onSubmit = async({email, password}) => {
        try {
            await registerUser(email, password);
            navegate("/");
        } catch (error) {
            switch(error.code ) {
                case "auth/email-already-in-use":
                    setError('email',{
                        message:"Ya esta registrado este correo"
                    });
                    break;
                case "auth/invalid-email":
                    setError('email',{
                        message:"Formato email invalido"
                    });
                    break;
                default:
                    console.log("Error server auth.");    
            }
        }
    }


    return (
        <>
        <h1>Register...</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                type="email"
                placeholder="Email"
                {...register("email",{
                        required:{
                            value:true,
                            message: "Campo obligatorio"
                        },
                        pattern:{
                            value:/[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
                            message:"Formato de email incorrecto"
                        }
                    }
                )}
            />
            {
                errors.email && <p>{errors.email.message}</p>
            }
            <input
                type="password"
                placeholder="Password"
                {...register("password",{
                    setValueAs:(v) => v.trim(),
                    minLength:{
                        value:6,
                        message:"Minimo 6 caracteres"
                    },
                    validate:{
                        trim:(v) => {
                            if(!v.trim()) return "Escribe algo"
                            else return true;
                        }
                    }
                })}
            />
            {
                errors.password && <p>{errors.password.message}</p>
            }
            <input
                type="repassword"
                placeholder="repassword"
                {...register("repassword",{
                    setValueAs:(v) => v.trim(),
                    validate:{
                        equals:v => v === getValues("password") || "No coninciden las contraseñas",
                    }
                })}
            />
            {
                errors.repassword && <p>{errors.repassword.message}</p>
            }            
            <button type="submit">Register</button>
        </form>
        </>
    )
}

export default Register