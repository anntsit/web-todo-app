import React, {useState} from 'react';

import './authPage.css';

const OPEN_SOURCE_GITHUB_IMAGE = 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png';


export function LoginBlock () {
    const [isRegistration, setIsRegistration] = useState(false);

    return <div className={"auth-block"}>
        <div
            className={"login-block-tab" + (isRegistration ? "" : " enabled-tab")}
            onClick={() => setIsRegistration(false)}
        >
            Login
        </div>
        <div
            className={"register-block-tab" + (isRegistration ? " enabled-tab" : "")}
            onClick={() => setIsRegistration(true)}
        >
            Register
        </div>
        { isRegistration ? (
            <button className={"auth-button"}>
                <img src={OPEN_SOURCE_GITHUB_IMAGE} width={"25"} height={"25"} className={"gh-img"}></img>
                <span className={"auth-text"}>Sign up with GitHub</span>
            </button>
        ) : (
            <button className={"auth-button"}>
                <img src={OPEN_SOURCE_GITHUB_IMAGE} width={"25"} height={"25"} className={"gh-img"}></img>
                <span className={"auth-text"}>Sign in with GitHub</span>
            </button>
        )}
    </div>
}
