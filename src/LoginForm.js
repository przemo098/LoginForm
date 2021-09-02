import { performLogin } from "./util";
import styles from "./LoginForm.module.css";
import {useState} from "react";

// ================ LOGIN FORM ====================
//
// You are provided with an incomplete login form.
// You are not allowed to add any additional HTML elements.
// You are not allowed to use refs.
//
// Tasks:
//  * Login button should trigger the performLogin() action imported above and pass required data to it.
//  * Disable the Login button if email is blank OR if password is under 6 letters
//  * Disable the Login button while login action is being performed
//  * Show an error message from the performLogin() if login fails. The error should be cleared every time user re-attempts to log in.
//  * Show an alert box (native Javascript alert) if login succeeds. Investigate the performLogin function to find out how to log in successfully.

export default function LoginForm() {
    const initState = {email: "", password: ""};
    let [state, setState] = useState(initState);
    let [isDisabled, setIsDisabled] = useState(false);
    let [hasError, setHasError] = useState(false);

    function updateState(localState){
        setState(localState);
        setIsDisabled(localState.email === "" || localState.password.length < 6);
    }

    function login(){
        setIsDisabled(true)
        performLogin(state)
            .then(() => {
                setHasError(false);
                setIsDisabled(false);})
            .catch(() => {
                setHasError(true)});
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.row}>
                <label htmlFor={"email"}>Email</label>
                <input onChange={e => updateState({...state, email: e.target.value})} id={"email"} type={"email"} />
            </div>
            <div className={styles.row}>
                <label htmlFor={"password"}>Password</label>
                <input onChange={e => updateState({...state, password: e.target.value})} id={"password"} type={"password"} />
            </div>

            {/* Place login error inside this div. Show the div ONLY if there are login errors. */}
            <div className={styles.errorMessage}>
                {hasError ? "We got error" : ""}
            </div>

            <div className={styles.row}>
                <button disabled={isDisabled} onClick={() => login()}>Login</button>
            </div>


        </div>
    );
}
