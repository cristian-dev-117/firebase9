
    export const formValidate = () => {
    return {
        required: {
            value: true,
            message: "Campo obligatorio"
        },
        patternEmail:{
            value:/[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
            message:"Formato de email incorrecto"
        },
        minLength: {
            value: 6,
            message: "Minimo 6 caracteres"
        },
        validateTrim: {
            trim: (v) => {
                if(!v.trim()) return "Escribe algo"
                else return true;
            }
        },
        validateEquals(getValues) {
            return {
                equals: v => v === getValues("password") || "No coninciden las contraseñas",
            }
                
        },
    };
};
