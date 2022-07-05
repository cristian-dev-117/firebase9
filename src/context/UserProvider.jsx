import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import {auth} from "../firebase";

export const UserContext = createContext();

const UserProvider = ({children}) => {
    const [user, setUser] = useState(false);

    useEffect(() => {
        const unsuscribe = onAuthStateChanged(auth, user => {
            console.log(user);
            if(user) {
                const {email, fhotoURL, displayName, uid} = user;
                setUser({email, fhotoURL, displayName, uid});
            } else {
                setUser(null);
            }
        });
        return () => unsuscribe();
    }, []);

    const registerUser = (email, pass) => createUserWithEmailAndPassword(auth, email, pass);
    const loginUser = (email, pass) => signInWithEmailAndPassword(auth, email, pass);
    const signOutUser = () => signOut(auth);


    return (
        <UserContext.Provider value={{user, setUser, registerUser, loginUser, signOutUser}}> {/* permite usar el usuario en otros componentes */}
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;