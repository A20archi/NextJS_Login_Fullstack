"use client";

import axios from "axios"
import Link from "next/link";
import React,{useEffect,useState} from "react"

export default function VerifyEmailPage(){
    const [token,setToken] = useState("");
    const [verified,setVerified] = useState(false);
    const [error,setError]=useState(false);

    const VerifyUserEmail=async()=>{
        try{
          await axios.post('/api/users/verify',{token}) ;
          setVerified(true);

        }catch(error:any)
        {
            setError(true);
            console.log(error.response.data);
        }
    }


    useEffect(()=>{
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken||"");
    },[])

    useEffect(()=>{
        if(token.length >0)
        {
            VerifyUserEmail();
        }
    },[token])

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#d4b595] to-[#f5e8d0] p-4">
        <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full text-center">
          {!verified && !error && (
            <p className="text-lg text-[#5c4033]">Verifying your email...</p>
          )}

          {verified && (
            <>
              <h2 className="text-2xl font-bold text-green-700 mb-4">
                Email Verified!
              </h2>
              <p className="text-[#5c4033] mb-6">
                Your email has been successfully verified. You can now{" "}
                <Link href="/login" className="text-blue-600 hover:underline">
                  login
                </Link>
                .
              </p>
            </>
          )}

          {error && (
            <>
              <h2 className="text-2xl font-bold text-red-600 mb-4">
                Verification Failed
              </h2>
              <p className="text-[#5c4033]">
                The verification link is invalid or expired. Please request a
                new verification email.
              </p>
            </>
          )}
        </div>
      </div>
    );

}
