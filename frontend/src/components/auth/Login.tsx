import { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useToast } from '../../context/ToastContext';
import { login, loginGoogle } from '../../services/Services';
import '/src/assets/css/Auth.css';

function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [fadeIn, setFadeIn] = useState(false);
    const [containerClass, setContainerClass] = useState("container");
    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();

    const handleClick = async () => {
        try {
             loginGoogle();       
        } catch (error) {
            const errMessage = (error as any)?.response?.data?.message || "Error!";
            showToast(errMessage, "error");
        }
    
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            setLoading(true);
            console.log(form);
            try {
                const response = await login(form);
                if (response) {
                    window.location.href = '/dashboard';
                    }
                
            } catch (error) {
                const errMessage = (error as any)?.response?.data?.message || "Error!";
                showToast(errMessage, "error");
            }     
            setLoading(false);
        }; 

    useEffect(() => {

        const handleResize = () => {
                setContainerClass(window.innerWidth <= 992 ? "container card d-flex justify-content-center text-center mx-auto form-card" : "container");
                };  
                handleResize();
                window.addEventListener("resize", handleResize);
                const fadeTimeout = setTimeout(() => setFadeIn(true), 100);
                return () => {
                    window.removeEventListener("resize", handleResize);
                    clearTimeout(fadeTimeout);
                }
            },[]);
return (
            <>
                <div className={`index-page login-page auth-form min-vh-100 ${fadeIn ? "fade-in" : ""}`}>
                    <div className="container-fluid vh-100">
                        <div className="row h-100 align-items-center">
                            <div className="col-md-5 d-flex justify-content-center mmk-5">
                                <div className="disable-ms-mobile">
                                    <div className={containerClass}>
                                        <h1 className='auth-title text-mb-center'>Sign In</h1>
                                        <div className="ww-auto">
                                            <small id="emailHelp" className="form-text text-muted auth-subtitle">Sign In to automate, manage, and track every order with ease. Faster service, happier customers!</small>
                                        </div>
                                        <form onSubmit={handleSubmit}>
                                        <br />
                                        <div className="form-floating ww-auto position-relative">
                                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" placeholder="Enter your email" autoComplete="email" onChange={handleChange}/>
                                            <label htmlFor="exampleInputEmail1">Email address</label>
                                        </div>
                                        <br />
                                        <div className="form-floating ww-auto mb-0">
                                        <input type={showPassword ? "text" : "password"} className="form-control" id="exampleInputPassword1" name="password" placeholder="Enter your password" autoComplete="current-password" onChange={handleChange}/>
                                        <span className="position-absolute end-0 top-50 translate-middle-y me-3 cursor-pointer"onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                                            <label htmlFor="exampleInputPassword1">Password</label>
                                        </div>
                                        <a href="/forgotpassword" className='no-underline text-start text-start w-100 d-block'>Forgot Password?</a>
                                        <div className='ww-auto mb-0 mt-4 text-center'>
                                            <button type="submit" className="btn btn-prime w-100 mb-3" disabled={loading}><b>{ loading ? "Processing" : "Sign In"}</b></button>
                                            <p className='text-bold mt-0'>Or</p>
                                        </div> 
                                </form>
                                        <div className='ww-auto w-70 mb-3 mt-0 text-center'>
                                        <a onClick={handleClick} type="submit" className="btn btn-outline-dark w-100 mb-1 d-flex align-items-center justify-content-center">
                                            <img src="/icon-google.png" alt="Google Logo" className="me-2" style={{ width: "20px", height: "20px" }} />
                                            <b>Sign In with Google</b>
                                        </a> 
                                        <a href="/register" className='no-underline text-center'>Don't have an account yet?</a>  
                                        </div>        
                                </div>
                                </div>
                            </div>
                            <div className="col-md-5 offset-md-1 d-flex justify-content-center">
                                <div className="container-fluid bg-foto-login">
                                    <h4 className='offset-md-5 text-white text-end mt-3 me-2'>OrderIt</h4>
                                </div>                        
                            </div>
                        </div>
                    </div>
                
                </div>
            </>
        )
        }

export default Login
