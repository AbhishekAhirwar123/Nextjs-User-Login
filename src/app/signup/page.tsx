"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from 'next/navigation';
import axios from "axios";
import toast from "react-hot-toast";

const SignupPage = () => {

    /* This is for routing in final destination. */
    const router = useRouter();

    /* This is State Variable which is Storing a Variables Value. */
    const [user, setuser] = React.useState({
        username: "",
        email: "",
        number: "",
        password: "",
    })

    /* This is Change and showing the loading and Proccessing {h1} area of Heading. */
    const [loading, setLoading] = React.useState(false);

    /* This is a Signup Button Which Showing Button is Disables or Not Disable. */
    const [buttonDisabled, setbuttonDisabled] = React.useState(false);

    // This is a condition statements if any fields are empty then button is Disable.
    useEffect(() => {
        if (user.email.length > 0 && user.password.length >
            0 && user.username.length > 0 && user.number.length > 0) {
            setbuttonDisabled(false);
        } else {
            setbuttonDisabled(true);
        }
    }, [user]);

    /* This is a OnSignup Methode. */
    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup Success", response.data);
            router.push("/login");
        } catch (error: any) {
            console.log("Signup Failed", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className=" flex flex-col items-center justify-center min-h-screen py-2 ">
            <div className=" p-11 border border-gray-500 rounded-xl">
                <h1 className="w-60 rounded ms-20 p-2 m-5 text-4xl text-red-600"> 
                    {loading ? "Proccessing" : "Signup Page"} 
                </h1>
                <hr className="w-80 ms-8" />

                {/* Name Field */}
                <div className="flex flex-col mt-8">
                    <label htmlFor="username"> Username </label>
                    <input
                        className="p-2 mt-1 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                        type="text"
                        id="username"
                        value={user.username}
                        onChange={(e) => setuser({ ...user, username: e.target.value })}
                        placeholder="username"
                    />
                </div>

                {/* Email Field */}
                <div className="flex flex-col">
                    <label htmlFor="email"> Email </label>
                    <input
                        className="p-2 mt-1 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                        type="text"
                        id="email"
                        value={user.email}
                        onChange={(e) => setuser({ ...user, email: e.target.value })}
                        placeholder="email"
                    />
                </div>

                {/* Number Field */}
                <div className="flex flex-col">
                    <label htmlFor="number"> number </label>
                    <input
                        className="p-2 mt-1 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                        type="text"
                        id="number"
                        value={user.number}
                        onChange={(e) => setuser({ ...user, number: e.target.value })}
                        placeholder="number"
                    />
                </div>

                {/* Password Feild */}
                <div className="flex flex-col mb-4">
                    <label htmlFor="password"> Password </label>
                    <input
                        className="p-2 mt-1 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                        type="password"
                        id="password"
                        value={user.password}
                        onChange={(e) => setuser({ ...user, password: e.target.value })}
                        placeholder="password"
                    />
                </div>

                {/* Button */}
                <button
                    onClick={onSignup}
                    className=" w-96 p-2 border border-gray-300 rounded-lg mb-5 focus:outline-none focus:border-gray-600">
                    {buttonDisabled ? "No Signup" : "Signup"}
                </button>
                <br />
                {/* Login Link */}
                <Link className="ms-32  text-green-400" href="/login"> Visit Login Page </Link>
            </div>

        </div>


    );

}


export default SignupPage;