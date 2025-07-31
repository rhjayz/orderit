import { useState, useEffect } from 'react';
import '/src/assets/css/Auth.css';


function Resultresetpassword() {
    const [fadeIn, setFadeIn] = useState(false);

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
                        <div className="row d-flex justify-content-center pt-4">
                    <div className="col-md-6 mt-5">
                        <div className="container mt-5">
                            <div className="d-flex justify-content-center align-items-center vh 100">
                                <img src="./orderit.svg" alt="" width='60px' height='60px'/>
                            </div>
                            <br />
                            <div className="card justify-content-center p-5">
                                 <div className="card-content ">
                                   <div className="content">
                                     <h2 className='auth-title text-mb-center'>Password Reset Successful!</h2>
                                        <small id="emailHelp" className="form-text text-muted auth-subtitle w-75">you now can access your account</small>
                                        </div>
                                            <br />
                                            <div className=' text-center mt-0'>
                                                <a href="/login" className="btn btn-prime w-100 pt-2 pb-0"><p>back to Login Page</p></a>
                                            </div>
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

export default Resultresetpassword;
