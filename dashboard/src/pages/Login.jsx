import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { clearAllUserErrors, login } from '@/store/slices/userSlice'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import SpecialLoadingButton from './sub-components/SpecialLoadingButton'


const Login = () => {
  const [email,setEmail]= useState("");
  const [password,setPassword]= useState("");

  const {loading, isAuthenticated, error} = useSelector((state)=>state.user);

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleLogin =()=>{
    dispatch(login(email,password))
  }

  useEffect(()=>{
    if(error){
      toast.error(error);
      dispatch(clearAllUserErrors())
    }
    if(isAuthenticated){
      navigateTo("/")
    }
  },[dispatch,isAuthenticated,error, loading])

  return (
    <>
   <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 lg:gap-8 xl:min-h-[100vh] px-12">
  {/* Form Section */}
  <div className="min-h-[100vh] flex items-center justify-center py-12">
    <div className="mx-auto grid w-[350px] gap-6">
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-balance text-muted-foreground">
          Enter your email below to login to your account
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
            <Label htmlFor="password">Password</Label>
            <Link to="/password/forget" className="text-sm underline">
              Forgot your password?
            </Link>
          </div>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {
          loading ? (<SpecialLoadingButton content={"Loging.."}/>) : (<Button type="submit" className="w-full" onClick={handleLogin}>
          Login
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

export default Login