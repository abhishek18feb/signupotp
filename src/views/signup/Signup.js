import React, {Component, useEffect} from 'react';
import './SignupView.css';


const SignupView = props =>{
    useEffect(() => {
        document.body.className = '';
        document.body.classList.add("set-first-bg-image");
    })
    return(
        <React.Fragment>
            <form>
            <div style={{marginTop: "50px"}}>
                <div className="container lpage" style={{width: "36%"}}>
                    {props.children}
                </div>
            </div>
            </form>
        </React.Fragment>
    )
}

export default SignupView
