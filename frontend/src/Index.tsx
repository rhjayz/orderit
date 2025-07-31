import { useEffect, useState } from "react"


function Index() {
  const [fadeIn, setFadeIn] = useState(false);
  useEffect(() => {
    setTimeout(() => setFadeIn(true), 100);
  }, []);

  return (
    <>
      <div className={`index-page ${fadeIn ? "fade-in" : ""}`}>
        <nav className="navbar navbar-expand-lg bg-colour">
            <div className="container-fluid text-md-start text-center fs-5">
                <a className="navbar-brand" href="#">
                    <img src="./orderit.svg" alt="" width="30" height="30" className="d-inline-block align-text-top"/>
                    Orderit
                  </a>
            </div>
        </nav>
          <div className="bg-colour d-flex flex-column justify-content-center landing py-5">
              <div className="container bg-colour">
              <div className="row bg-colour">
                  <div className="col-md-7 text-md-start text-center"><h3>Helping Your Restaurant <strong className="op">Operations</strong> & <strong className="mn">Monitor</strong> Revenue with Our Management Ordering Platform</h3></div>
                  <div className="col-md-5 text-md-start text-center">dasdas</div> 
              </div>
             </div>  
              
        </div>
      </div>
    </>
  )
}

export default Index
