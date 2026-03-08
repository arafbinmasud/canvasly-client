import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";
import photo_login from "../assets/login-photo1.jpg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { loginUser, createUserWithGoogle } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    setIsProcessing(true)
    loginUser(email, password)
      .then(() => {})
      .catch((err) => {
        toast.error(err.message);
        setIsProcessing(false);
      });
  };

  const handleGoogleLogin = () => {
    setIsProcessing(true)
    createUserWithGoogle()
      .then((res) => {
        saveUserToDB(res.user);
        
      })
      .catch((err) => {
        toast.error(err.message);
        setIsProcessing(false);
      });
  };

  const saveUserToDB = (user) => {
    const currentUser = {
      name: user.displayName,
      email: user.email,
      photo: user.photoURL
    }
    console.log(currentUser);
    
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(currentUser)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      
    })
    
    
  }

  return (
    <section className="flex flex-col md:flex-row">
      <div className="left md:w-1/2 flex justify-end items-center py-5">
        <div className="max-w-175  px-4 md:px-2 md:pr-15 font-text ">
          <p className="text-center  md:text-left text-lg font-medium mb-8 md:mb-10">
            New User? No Problem, &nbsp;
            <Link className="text-primary font-bold underline" to="/register">
              Sign up here
            </Link>
          </p>

          <div className="form-body">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2">
              Welcome back! Your masterpiece is waiting
            </h2>
            <p className="text-lg opacity-60 font-medium">
              Explore what’s new in the gallery
            </p>

            <form onSubmit={handleLogin} className="flex flex-col">
              <button
                disabled={isProcessing}
                type="button"
                onClick={handleGoogleLogin}
                className="my-10 border-2 flex items-center justify-center gap-3 px-6 py-3 rounded-full border-gray-400 hover:border-primary hover:bg-primary/5 cursor-pointer transition-all duration-300 ease-in-out font-semibold active:scale-95"
              >
                 {isProcessing ? (
                  <span className="loading loading-spinner text-primary"></span>
                ) : (
                  <>
                    <FcGoogle size={24} />
                    <span>Continue with Google</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-5 mb-10 opacity-60">
                <div className="border-t border-gray-400 flex-1"></div>
                <p>OR</p>
                <div className="border-t border-gray-400 flex-1"></div>
              </div>

              {/* Email  */}
              <label className="mb-1 font-semibold opacity-80">Email</label>
              <input
                name="email"
                required
                type="email"
                placeholder="Your Email"
                className="px-4 py-2 mb-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />

              {/* Password  */}
              <label className="mb-1 font-semibold opacity-80">Password</label>
              <div className="relative">
                <input
                  name="password"
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full px-4 py-2 mb-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                  className="absolute top-4 cursor-pointer hover:opacity-100 right-5 opacity-50"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <button disabled={isProcessing} className="btn btn-primary text-accent rounded-full mt-5 h-12">
                 {isProcessing ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  <>
                   
                    <span>Login Now</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="right hidden md:block w-1/2 h-screen sticky top-0">
        <img
          src={photo_login}
          alt="Painting"
          className="object-cover h-full w-full"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/90 to-transparent"></div>

        <div className="absolute bottom-10 left-10 right-10 text-white">
          <blockquote className="text-2xl font-italic font-light mb-4">
            "The world is but a canvas to our imagination"
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary border-2 border-white"></div>
            <div>
              <p className="font-bold">Henry David Thoreau</p>
              <p className="text-sm opacity-80">Poet & Philosopher</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
