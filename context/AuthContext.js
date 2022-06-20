import { createContext, useContext } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import {
	useAuthState,
	useCreateUserWithEmailAndPassword,
	useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { auth } from "../firebase";

// create auth context
const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
	const [user, loading, error] = useAuthState(auth);
	const [createUserWithEmailAndPassword] =
		useCreateUserWithEmailAndPassword(auth);
	const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

	const loginWithDetails = (email, password) => {
		return signInWithEmailAndPassword(email, password);
	};
	const logout = () => {
		signOut(auth);
	};

	const createUserWithDetails = (details) => {
		const createNewFirebaseUser = async (email, password) => {
			if (email && password) {
				try {
					let userCredential = await createUserWithEmailAndPassword(email, password);
                    const user = userCredential.user;
				} catch (error) {
                    alert(error);
                }
			}
		};
		return createNewFirebaseUser(details.email, details.password);
	};

	return (
		<AuthContext.Provider
			value={{ loginWithDetails, logout, user, loading, createUserWithDetails }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
