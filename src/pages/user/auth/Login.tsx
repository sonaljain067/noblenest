import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../../../firebase";
import { useLoginMutation } from "../../../redux/api/userAPI";
import { APIResponse, ErrorAPIResponse } from "../../../types/api.types";

const Login = () => {
    const [gender, setGender] = useState("");
    const [date, setDate] = useState("");
    const [ login ] = useLoginMutation();

    const loginHandler = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const { user } = await signInWithPopup(auth, provider);

            const res = await login({
                firstName: user.displayName!.split(" ")[0],
                lastName: user.displayName!.split(" ")[1],
                username: user.uid,
                email: user.email as string,
                phone: user.phoneNumber as string,
                password: user.uid,
                gender,
                avatar: user.photoURL as string,
                role: "user",
                dob: date,
                _id: ""
            });

            if ("data" in res) {
                const message = (res.data as APIResponse).message;
                toast.success(message);
            } else {
                const error = res.error as FetchBaseQueryError;
                const message = (error.data as ErrorAPIResponse).data.message;
                toast.error(message);
            }
        } catch (error) {
            toast.error(error as string); 
        }
    };

    return (
        <div className="login">
            <main>
                <h1 className="heading">Login</h1>
                <div>
                    <label htmlFor="">Gender</label>
                    <select
                        name=""
                        id=""
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="">Date of Birth</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <div>
                    {/* <p>Already Sign In! </p> */}
                    <button onClick={loginHandler}>
                        <FcGoogle /> Sign In with Google
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Login;
