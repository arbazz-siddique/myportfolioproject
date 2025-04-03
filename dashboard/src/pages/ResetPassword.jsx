import React, { useEffect, useState } from "react";
import SpecialLoadingButton from "./sub-components/SpecialLoadingButton";
import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearAllForgetPasswordErrors, resetPassword } from "@/store/slices/forgetResetPasswordSlice";
import { toast } from "react-toastify";
import { getUser } from "@/store/slices/userSlice";

const ResetPassword = () => {
  const {token} = useParams();
  const[password, setPassword]=useState("");
  const[confirmPassword, setConfirmPassword]=useState("");

  const {loading, error, message} = useSelector((state)=>state.forgetPassword);
  const {isAuthenticated} = useSelector((state)=>state.user);

  const dispatch = useDispatch();
  const navigateTo = useNavigate();


  const handleResetPassword =()=>{
    dispatch(resetPassword(token,password,confirmPassword))
  }

  useEffect(()=>{
  
      if(error){
        toast.error(error);
        dispatch(clearAllForgetPasswordErrors());
      }
      if(isAuthenticated){
        navigateTo("/");
      }
      if(message !== null){
        toast.success(message)
        dispatch(getUser())
      }
  
    },[dispatch,isAuthenticated,loading,error])
  

  return (
    <>
      <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 lg:gap-8 xl:min-h-[100vh] px-12">
        {/* Form Section */}
        <div className="min-h-[100vh] flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Reset Password</h1>
              <p className="text-balance text-muted-foreground">
                Enter your Password and Confirm Password For New Password
              </p>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label >Password</Label>
                <Input
                  type="password"
                  placeholder="Enter Your Password!"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label >confirm Password</Label>
                <Input
                  type="password"
                  placeholder="Enter Your Confirm Password!"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              
              {loading ? (
                <SpecialLoadingButton content={"Reseting..."} />
              ) : (
                <Button
                  type="submit"
                  className="w-full"
                  onClick={handleResetPassword}
                >
                  Reset Password
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="hidden bg-muted lg:block">
          <img
            className="h-full w-full object-cover dark:brightness-[0.3] dark:grayscale rounded-sm"
            src="/images/login.webp"
            alt="Login Illustration"
          />
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
