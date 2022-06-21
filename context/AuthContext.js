import { createContext, useContext, useState } from "react";
import { signOut, deleteUser } from "firebase/auth";
import {
	useAuthState,
	useCreateUserWithEmailAndPassword,
	useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { collection, query, where, getDoc, doc } from "firebase/firestore";

// create auth context
const AuthContext = createContext({});

const fetchUserData = async (uid) => {
	let response = await fetch("/api/user/get?uid=" + uid);
	data = await response.json();
	return data;
};

export const AuthContextProvider = ({ children }) => {
	const [user, loading, error] = useAuthState(auth, {
		onUserChanged: async (user) => {
			if (user) {
				// get user data via API
				let data = await fetchUserData(user.uid);
				// set user data in state
				setUserData(data);
			} else {
				setUserData(null);
			}
			// get user doc where email is the same as the user's email
			const userCollection = collection("users");
			const userDoc = await getDoc(
				userCollection,
				where("email", "==", user.email)
			);
		},
	});

	const [userData, setUserData] = useState(null);
	const [
		createUserWithEmailAndPassword,
		newUser,
		newUserLoading,
		newUserError,
	] = useCreateUserWithEmailAndPassword(auth);
	const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

	const loginWithDetails = (email, password) => {
		return signInWithEmailAndPassword(email, password);
	};
	const logout = () => {
		signOut(auth);
	};

	const createUserWithDetails = (details) => {
		const createNewFirebaseUser = async (details) => {
			// extra check passwords match
			if (details.password !== details.passwordConfirm) {
				return alert("Passwords do not match");
			}

			// create user in auth with firebase
			await createUserWithEmailAndPassword(
				details.email,
				details.password
			);
			if (newUserError) return alert(newUserError.message);

			if (newUser) {
				// if new user is created, add to firebase
				console.log("Adding Data to Firestore...");
				// TODO: Check return data to try and get the correct UID
				// console.log("NEW USER DATA: ", newUser);
				try {
					let response = await fetch("/api/users/create", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							uid: newUser.user.uid,
							email: newUser.user.email,
							name: details?.name,
							// organisation: organisation
						}),
					});
					let data = await response.json();
					// log response from API
					console.log(data);
				} catch (e) {
					console.log(
						"Failed to add data to firestore, removing account"
					);
					deleteUser(auth.currentUser);
					console.log("User deleted");
				}
				let currentUserData = await fetchUserData(newUser.user.uid);
				setUserData(currentUserData);
				return { message: "success" };
			} else {
				console.log("Could not find new user, removing account");
				deleteUser(auth.currentUser);
				console.log("User deleted");
				return { message: "fail" };
			}
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
