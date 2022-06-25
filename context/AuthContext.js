import { createContext, useContext, useState } from "react";
import { signOut, deleteUser, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {
	useAuthState,
	useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { collection, query, where, getDoc, doc } from "firebase/firestore";

// create auth context
const AuthContext = createContext({});

const fetchUserData = async (uid) => {
	console.log("Fetching: ", uid);
	let response = await fetch("/api/users/get?uid=" + uid);
	response = await response.json();
	return response.data;
};

const initUserData = async (uid, addData, name) => {
	console.log("Init data for: ", uid);
	let response = await fetch("/api/users/create", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			uid: uid,
			email: addData.email,
			name: name,
			// organisation: addData.organisation
		}),
	});
	let data = await response.json();
	return data;
};

export const AuthContextProvider = ({ children }) => {
	const [userData, setUserData] = useState(null);

	const [user, loading, error] = useAuthState(auth, {
		onUserChanged: async (user) => {
			if (user) {
				// get user data and set in state
				let data = await fetchUserData(user.uid);
				setUserData(data);
			} else {
				// clear user data
				setUserData(null);
			}
		},
	});

	const loginWithDetails = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password);
	};

	const logout = () => signOut(auth);

	const createUserWithDetails = (details) => {
		const createNewFirebaseUser = async (details) => {
			// extra check passwords match
			if (details.password !== details.passwordConfirm) {
				return alert("Passwords do not match");
			}
			// create user in auth with firebase
			createUserWithEmailAndPassword(auth, details.email, details.password)
			.then(async (userCredential)=>{
				const newUser = userCredential.user;
				try {
					// if new user is created, add to firebase
					await initUserData(newUser.uid, newUser, details?.name);
				} catch (e) {
					// remove user if data not added to firestore
					deleteUser(auth.currentUser);
				}
				let currentUserData = await fetchUserData(newUser.uid);
				setUserData(currentUserData);
				return { message: "success" };
			}).catch((error)=>{
				return alert(error.message);
			});
		};

		return createNewFirebaseUser(details);
	};

	return (
		<AuthContext.Provider
			value={{
				loginWithDetails,
				logout,
				user,
				userData,
				loading,
				createUserWithDetails,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
