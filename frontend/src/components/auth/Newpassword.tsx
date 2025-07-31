import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useToast } from '../../context/ToastContext';
import { updatePassword } from '../../services/Services';
import '/src/assets/css/Auth.css';


function Newpassword() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [form, setForm] = useState({password:"", cfpassword:"", token: token || ""});
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();
    const [fadeIn, setFadeIn] = useState(false);
    const navigate = useNavigate();
    


    console.log("bima", token);
     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await updatePassword(form);
            showToast(response.data.message, "success");
            setLoading(false);
            navigate("/resultresetpassword");

        } catch (error) {
            const errMessage = (error as any)?.response?.data?.message || "Error!";
            showToast(errMessage, "error");
            setLoading(false);
        }
        
    }

    useEffect(() => {
                const fadeTimeout = setTimeout(() => setFadeIn(true), 100);
                return () => {
                    clearTimeout(fadeTimeout);
                }
            },[]);
return (
            <>
        <div className={`index-page forgot-form forgotpassword ${fadeIn ? "fade-in" : ""}`}>
                    <div className="container-fluid vh-100">
                        <div className="row d-flex justify-content-center">
                    <div className="col-md-5 mt-5">
                        <div className="container mt-2">
                            <div className="d-flex justify-content-center align-items-center vh 100">
                                <img src="./orderit.svg" alt="" width='60px' height='60px'/>
                            </div>
                            <div className="card justify-content-center p-5 mt-2">
                                 <div className="card-content ">
                                   <div className="content">
                                     <h1 className='auth-title text-mb-center'>New Password</h1>
                                        <small id="emailHelp" className="form-text text-muted auth-subtitle w-75">Enter a new password below to regain access to your account.</small>
                                        </div>
                                    <form onSubmit={ handleSubmit } className='auth-form'>
                                        <br />
                                        <div className="form-floating  position-relative mb-2">
                                            <input type={showPassword1 ? "text" : "password"} className="form-control" id="exampleInputPassword1" name='password' onChange={ handleChange } placeholder="Enter your password"/>
                                            <span className="position-absolute end-0 top-50 translate-middle-y me-3 cursor-pointer"  onClick={() => setShowPassword1(!showPassword1)}>{showPassword1 ? <FaEyeSlash /> : <FaEye />}</span>
                                            <label htmlFor="exampleInputPassword1">Password</label>
                                        </div>
                                        <div className="form-floating  position-relative">
                                            <input type={showPassword2 ? "text" : "password"} className="form-control" id="exampleInputPassword2" name='cfpassword' onChange={ handleChange } placeholder="Enter your password"/>
                                            <span className="position-absolute end-0 top-50 translate-middle-y me-3 cursor-pointer" onClick={() => setShowPassword2(!showPassword2)}>{showPassword2 ? <FaEyeSlash /> : <FaEye />}</span>
                                            <label htmlFor="exampleInputPassword1">Confirm Password</label>
                                        </div>
                                        <div className=' text-center mt-4'>
                                            <button type="submit" className="btn btn-prime w-100 mb-2" disabled={loading}>
                                                <span>{loading? "Process..." : "Reset Password" }</span>
                                            </button>
                                        </div>
                                    </form>
                                 </div>
                               </div>
                        </div> 
                            </div>
                        </div>
                    </div>
                
                </div>
            </>
        )
        }

export default Newpassword
