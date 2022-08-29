import React, { Fragment, useRef, useState, useEffect } from "react";
import "./LoginSignUpBank.css";
import Loader from "../layout/Loader/Loader";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loginBankUser, registerBankUser } from "../../actions/bankuserAction";
import { useAlert } from "react-alert";
import { Link, useNavigate, useLocation } from "react-router-dom";

const LoginSignUpBank = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.bankuser
  );

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [bankuser, setUser] = useState({
    email: "",
    password: "",
    balance: 0
  });

  const { email, password, balance } = bankuser;

  const loginSubmit = (e) => {
    e.preventDefault();
    console.log(loginEmail, loginPassword);
    dispatch(loginBankUser(loginEmail, loginPassword));
    
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("balance", balance);
    dispatch(registerBankUser(myForm));
  };

  const registerDataChange = (e) => {
    setUser({ ...bankuser, [e.target.name]: e.target.value });
  };

  const location = useLocation();
 
  const redirect = location.search ? location.search.split("=")[1] : "account";
//   console.log('redirect: ' + redirect);

  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
       
        navigate("/bankaccount");
    //   navigate("/" + redirect);
    }
  }, [dispatch, error, alert, isAuthenticated, redirect]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
              <div>
                <div className="login_signUp_toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                  <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                </div>
                <button ref={switcherTab}></button>
              </div>
              <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                <div className="loginEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>

                <input type="submit" value="Bank Login" className="loginBtn" />
              </form>
              <form
                className="signUpForm"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signUpEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpBalance">
                  <MonetizationOnIcon />
                  <input
                    type="number"
                    placeholder="Balance"
                    required
                    name="balance"
                    value={balance}
                    onChange={registerDataChange}
                  />
                </div>

                <input type="submit" value="Bank Register" className="signUpBtn" />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default LoginSignUpBank;
// export default withRouter(LoginSignUp);
