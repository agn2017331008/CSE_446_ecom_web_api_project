import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import "./BankProfile.css";

const BankProfile = () => {
  const { bankuser, loading, isAuthenticated } = useSelector((state) => state.bankuser);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/bank");
    }
  }, [isAuthenticated]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"BankAccount"} />
          <div className="profileContainer">
            <div>
              <h1>Bank Details</h1>
            </div>
            <div>
             
              <div>
                <h4>Email</h4>
                <p>{bankuser.email}</p>
              </div>
              <div>
                <h4>Account Number</h4>
                <p>{bankuser._id}</p>
              </div>
              <div>
                <h4>Balance</h4>
                <p>{bankuser.balance}</p>
              </div>

           
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default BankProfile;
