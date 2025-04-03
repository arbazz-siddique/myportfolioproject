import { clearAllForgetPasswordErrors, forgetPassword } from '@/store/slices/forgetResetPasswordSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SpecialLoadingButton from './sub-components/SpecialLoadingButton';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const {loading, error, message} = useSelector((state)=>state.forgetPassword);
  const {isAuthenticated} = useSelector((state)=>state.user);

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleForgetPassword =()=>{
    dispatch(forgetPassword(email))
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
    }

  },[dispatch,isAuthenticated,loading,error])

  return (
    <>

<div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 lg:gap-8 xl:min-h-[100vh] px-12">
  {/* Form Section */}
  <div className="min-h-[100vh] flex items-center justify-center py-12">
    <div className="mx-auto grid w-[350px] gap-6">
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Forget Password</h1>
        <p className="text-balance text-muted-foreground">
          Enter your email to request for reset Password
        </p>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            placeholder="m@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            
            <Link to="/login" className="text-sm underline">
              Remeber Your Password?
            </Link>
          </div>
          
        </div>
        {
          loading ? (<SpecialLoadingButton content={"Requesting.."}/>) : (<Button type="submit" className="w-full" onClick={handleForgetPassword}>
          Request For Reset Password
        </Button>)
        }
        
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
  )
}

export default ForgetPassword