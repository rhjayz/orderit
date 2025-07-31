import { useState, useEffect } from 'react'
import '/src/assets/css/Loading.css'

interface LoadingProps {
    onFinish?: () => void;
}

function Loading({ onFinish }: LoadingProps) {
    const [fadeOut, setFadeOut] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setFadeOut(true);
            if (onFinish) { 
                setTimeout(onFinish, 500);
            }  
       },1000) 
    },[onFinish]);

  return (
    <>
          <div className={`loading-page d-flex flex-column ${fadeOut ? "fade-out":""}`}>
                <a target="_blank">
                  <img src='./orderit.svg' className="logo" alt="React logo" />
                </a>
                    <b className='loading-text'>Loading</b> 
     </div>
          
    </>
  )
}

export default Loading