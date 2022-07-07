import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { UserContext } from "../context/UserProvider";
import FormError from "../components/FormError";
import { erroresFirebase } from "../utils/erroresFirebase";
import { formValidate } from "../utils/formValidate";
import FormInput from "../components/FormInput";

const Register = () => {

    const { registerUser } = useContext(UserContext);
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
    const { required, patternEmail, minLength, validateTrim, validateEquals } = formValidate();
    const onSubmit = async({email, password}) => {
        try {
            await registerUser(email, password);
            navegate("/");
        } catch (error) {
            setError('firebase',{
                message: erroresFirebase(error.code)
            });
        }
    }

    return (
        <>
        <h1>Register...</h1>
        <FormError error={errors.firebase} />
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput 
                type="email"
                placeholder="Email"
                {...register("email", {
                    required,
                    pattern: patternEmail
                })}
            >
                <FormError error={errors.email} />
            </FormInput>
            <FormInput 
                type = "password"
                placeholder = "Password"
                {...register("password", {
                    setValueAs: (v) => v.trim(),
                    minLength,
                    validate: validateTrim
                })}
            >
                <FormError error={errors.password} />
            </FormInput>            
            
            <FormInput 
                type="repassword"
                placeholder="repassword"
                {...register("repassword",{
                    setValueAs:(v) => v.trim(),
                    validate: validateEquals(getValues)
                })}
            >
                <FormError error={errors.repassword} />
            </FormInput>

            <button type="submit">Register</button>
        </form>
        </>
    )
}

export default Register