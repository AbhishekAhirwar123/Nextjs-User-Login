"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from 'next/navigation';
import axios from "axios";
import toast from "react-hot-toast";

const LoginPage = () => {

    /* This is for routing in final destination. */
    const router = useRouter();
    
    const [user, setuser] = React.useState({
        email : "",
        password : ""
    })

     /* This is a Login Button Which Showing Button is Disables or Not Disable. */
    const [buttonDisabled, setbuttonDisabled] = React.useState(false);

    /* This is Change and showing the loading and Proccessing {h1} area of Heading. */
    const [loading, setLoading] = React.useState(false);

    /* This is a OnLogin Methode. */
    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login Success", response.data);
            alert("Login Successfully!!!");
            toast.success("Login Success");
            router.push("/profile");
        } catch (error: any) {
            console.log("Login Failed", error.message);
            alert("Login Failed!!!");
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    }


    // This is a condition statements if any fields are empty then button is Disable.
    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0) {
            setbuttonDisabled(false);
        }else{
            setbuttonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
            <div className=" p-11 border border-gray-500 rounded-xl">
            <h1 className="w-32 rounded ms-32 p-2 m-5 text-4xl text-red-600 ">
                {loading ? "Processing" : "Login"}    
            </h1>
            <hr className="w-80 ms-7" />
            

            <div className="flex flex-col mt-8">
            <label htmlFor="email"> Email </label>
            <input 
                className="p-2 mt-1 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                type="text" 
                id="email"
                value={user.email}
                onChange={(e) => setuser({...user, email: e.target.value})}
                placeholder="email"
                />
            </div>


            <div className="flex flex-col mb-4">
            <label htmlFor="password"> Password </label>
            <input 
                className="p-2 mt-1 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                type="password" 
                id="password"
                value={user.password}
                onChange={(e) => setuser({...user, password: e.target.value})}
                placeholder="password"
                />
            </div>
                
            <button 
                onClick={onLogin}
                className=" w-96 p-2 border  border-gray-300 rounded-lg mb-10 focus:outline-none focus:border-gray-600">
                Login here
            </button> 
            <br />
            <Link className="ms-32 mt-56 text-green-400" href="/signup"> Visit Signup Page </Link>
            </div>

        </div>

        
    );

}


export default LoginPage;