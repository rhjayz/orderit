import { useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import { useToast } from '../../context/ToastContext';
import { forgotPassword } from '../../services/Services';
import Send from '/src/assets/send.svg';
import '/src/assets/css/Auth.css';


function Forgotpassword() {
    const [form, setForm] = useState({ email: "" });
    const [send, setSend] = useState(false);
    const [resend, setResend] = useState(true);
    const [countdown, setCountdown] = useState(0);
    const { showToast } = useToast();
    const [searchParams] = useSearchParams();
    const errorMessage = searchParams.get("error");
    const [fadeIn, setFadeIn] = useState(false);
        
    const startCountdown = () => {
        setCountdown(60);
        setResend(true);
        const interval = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setResend(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSend(true);
        setResend(true);
        setCountdown(60);
        try {
            const response = await forgotPassword(form);
            showToast(response.data.message, "success");
            startCountdown();
        } catch (error) {
            const errMessage = (error as any)?.response?.data?.message || "Error!";
            showToast(errMessage, "error");
        }
        
    }
    
    useEffect(() => {
        if (errorMessage) {
            showToast(errorMessage, "error"); // Tampilkan notifikasi error
        }
    }, [errorMessage]);

    useEffect(() => {
                const fadeTimeout = setTimeout(() => setFadeIn(true), 100);
                return () => {
                    clearTimeout(fadeTimeout);
                }
            },[]);
return (
        <>
                <div className={`index-page forgotpassword ${fadeIn ? "fade-in" : ""}`}>
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
                                     <h1 className='auth-title text-mb-center'>Forgot Password</h1>
                                        <small id="emailHelp" className="form-text text-muted auth-subtitle w-75">Please use active email for this action.</small>
                                        </div>
                                        <form onSubmit={handleSubmit} className='auth-form'>
                                        <br />
                                        <div className="form-floating  position-relative">
                                            <input type="email" className="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" placeholder="Enter your email" autoComplete="email" onChange={handleChange}/>
                                            <label htmlFor="exampleInputEmail1">Email address</label>
                                        </div>
                                        <div className=' text-center mt-4'>
                                        <button type="submit" className="btn btn-prime w-100 mb-2" disabled={send}><b>Send Email</b></button>
                                            <button type="submit" className="btn btn-outline-dark w-100 mb-3" disabled={resend}>
                                                    <img src={Send} alt="icon" />
                                                <span>{countdown > 0 ? `Resend Email (${countdown})` :"Resend Email" }</span>
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

export default Forgotpassword
