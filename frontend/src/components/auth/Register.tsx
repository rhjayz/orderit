import { useState, useEffect} from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { register } from '../../services/Services';
import { useToast } from '../../context/ToastContext';
import { useNavigate } from 'react-router-dom';
import '/src/assets/css/Auth.css';


function Register() {
    const [form, setForm] = useState({ name: "", email: "", password: "" })
    const [showPassword, setShowPassword] = useState(false);
    const [fadeIn, setFadeIn] = useState(false);
    const [containerClass, setContainerClass] = useState("container");
    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await register(form);
            showToast(response.data.message, "success");
            setTimeout(() => {
                navigate('/login');
                setLoading(false);
            }, 1000);
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
                <div className={`index-page auth-form min-vh-100 register-page ${fadeIn ? "fade-in" : ""}`}>
                    <div className="container-fluid vh-100">
                        <div className="row h-100 align-items-center">
                            <div className="col-md-5 d-flex justify-content-center mmk-5">
                                <div className="disable-ms-mobile">
                                    <div className={containerClass}>
                                        <h1 className='auth-title text-mb-center'>Sign Up</h1>
                                        <div className="ww-auto">
                                            <small id="emailHelp" className="form-text text-muted auth-subtitle">Sign Up to automate, manage, and track every order with ease. Faster service, happier customers!</small>
                                        </div>
                                        <form onSubmit={handleSubmit}>
                                        <br />
                                        <div className="form-floating ww-auto position-relative">
                                            <input type="text" className="form-control" id="exampleName" name="name" aria-describedby="emailName" placeholder="Enter your Name" autoComplete="name" onChange={handleChange}/>
                                            <label htmlFor="exampleInputEmail1">Name</label>
                                        </div>
                                        <br />
                                        <div className="form-floating ww-auto position-relative">
                                            <input type="email" className="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" placeholder="Enter your email" autoComplete="email" onChange={handleChange}/>
                                            <label htmlFor="exampleInputEmail1">Email address</label>
                                        </div>
                                        <br />
                                        <div className="form-floating ww-auto mb-0 position-relative">
                                        <input type={showPassword ? "text" : "password"} className="form-control" id="exampleInputPassword1" name='password' placeholder="Enter your password" autoComplete="current-password" onChange={handleChange}/>
                                        <span className="position-absolute end-0 top-50 translate-middle-y me-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                                            <label htmlFor="exampleInputPassword1">Password</label>
                                        </div>
                                        <a href="/login" className='no-underline text-start ext-start w-100 d-block'>Already have an account?</a>
                                        <div className='ww-auto mb-3 mt-4 text-center'>
                                        <button type="submit" className="btn btn-prime w-100 mb-2" disabled={loading}>
                                            <b>{loading ? "Processing...":"Sign Up" }</b>
                                        </button>
                                        </div>
                                    </form>
                                </div>
                                </div>
                            </div>
                            <div className="col-md-5 offset-md-1 d-flex justify-content-center">
                                <div className="container-fluid bg-foto-register">
                                    <h4 className='offset-md-5 text-white text-end mt-3 me-2'>OrderIt</h4>
                                </div>                        
                            </div>
                        </div>
                    </div>
                
                </div>
            </>
        )
        }

export default Register
