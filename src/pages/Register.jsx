import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import photo from "../assets/register_photo.webp";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [passError, setPassError] = useState("");
  const [firebaseError, setFirebaseError] = useState("");
  const { createUser, updateUser, user, createUserWithGoogle } = useAuth();
  const navigate = useNavigate();
  console.log(user);

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photo.value;
    const password = e.target.password.value;
    const userInfo = { displayName: name, photoURL: photo };

    setPassError("");
    setFirebaseError("");

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!passwordRegex.test(password)) {
      setPassError(
        "Every canvas needs a strong foundation. Ensure your password meets the criteria below!",
      );
      return;
    }

    createUser(email, password)
      .then(() => {
        updateUser(userInfo)
          .then(() => {
            toast.success(
              "Masterpiece account created! Welcome aboard, Artist. ✨",
            );
            navigate("/");
          })
          .catch((err) => setFirebaseError(err.message));
      })
      .catch((err) => {
        setFirebaseError(err.message);
      });
  };

  const handleGoogleLogin = () => {
    setFirebaseError("");
    createUserWithGoogle()
      .then(() => {
        toast.success(
          "Masterpiece account created! Welcome aboard, Artist. ✨",
        );
        navigate("/");
      })
      .catch((err) => setFirebaseError(err.message));
  };

  return (
    <section className="my-5 w-full max-w-350 mx-auto font-text">
      <div className="flex flex-col md:flex-row md:gap-15 md:py-20 px-2 ">
        <div className="left">
          <p className="text-center md:text-right text-lg font-medium mb-8 md:mb-10">
            Already have an account? &nbsp;
            <Link className="text-primary underline font-bold" to="/login">
              Log in
            </Link>{" "}
          </p>

          <div className="form-body">
            <h2 className="text-3xl text-center md:text-4xl font-heading font-bold mb-2">
              Start your artistic journey with Canvasly today
            </h2>
            <p className="text-lg opacity-60 text-center font-medium">
              Community of dreamers and creators
            </p>

            <form onSubmit={handleRegister} className="flex flex-col">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="my-10 border-2 flex items-center justify-center gap-3 px-6 py-3 rounded-full border-gray-400 cursor-pointer hover:border-primary hover:bg-primary/5  transition-all duration-300 ease-in-out font-semibold active:scale-95"
              >
                <FcGoogle size={24} />
                <span>Continue with Google</span>
              </button>

              <div className="flex items-center gap-5 mb-10 opacity-60">
                <div className="border-t border-gray-400 flex-1"></div>
                <p>OR</p>
                <div className="border-t border-gray-400 flex-1"></div>
              </div>

              {/* Name  */}
              <label className="mb-1 font-semibold opacity-80">Name</label>
              <input
                required
                name="name"
                type="text"
                placeholder="Your Name"
                className="px-4 py-2 mb-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {/* Email  */}
              <label className="mb-1 font-semibold opacity-80">Email</label>
              <input
                required
                name="email"
                type="email"
                placeholder="Your Email"
                className="px-4 py-2 mb-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {/* PhotoUrl  */}
              <label className="mb-1 font-semibold opacity-80">Photo URL</label>
              <input
                name="photo"
                type="text"
                placeholder="Your photo URL"
                className="px-4 py-2 mb-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {/* Password  */}
              <label className="mb-1 font-semibold opacity-80">Password</label>
              <div className="relative">
                <input
                  required
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className={`w-full px-4 py-2 border  rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${passError ? "border-red-500" : "border-gray-300"}`}
                />

                <button
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                  type="button"
                  className="absolute top-4 right-5 cursor-pointer opacity-50"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {passError && (
                <p className="mt-2 text-red-500 font-semibold">{passError}</p>
              )}
              {firebaseError && (
                <p className="mt-2 text-red-500 font-semibold">
                  {firebaseError}
                </p>
              )}
              <div className="flex flex-col md:flex-row justify-between items-start md:gap-3 mt-2">
                <ul className="list-disc list-inside ml-4 ">
                  <li>1 lowercase character</li>
                  <li>1 uppercase character</li>
                </ul>
                <ul className="list-disc list-inside ml-4">
                  <li>6 characters minimum</li>
                </ul>
              </div>

              <button className="btn btn-sm md:btn-md btn-primary text-accent rounded-full mt-10">
                Register Now
              </button>
            </form>
          </div>
        </div>

        <div className="right hidden md:block w-2/4 relative overflow-hidden rounded-3xl">
          <img
            src={photo}
            alt="Artistic Canvas"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent"></div>

          <div className="absolute bottom-10 left-10 right-10 text-white">
            <blockquote className="text-2xl font-italic font-light mb-4">
              "Art speaks where words are unable to explain"
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary border-2 border-white"></div>
              <div>
                <p className="font-bold">Vincent van Gogh</p>
                <p className="text-sm opacity-80">Artist & Dreamer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
