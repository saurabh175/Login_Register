import { useState, useEffect, Fragment } from "react";
import "./style.css";
import success from "../../Images/success.png";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export const Emailverify = () => {
  const [validUrl, setvalidUrl] = useState(true);
  const param = useParams();
  console.log(param);
  useEffect(() => {
    const verifyEmail = async () => {
      try {
        console.log(param.id, param.token);
        const url = `http://localhost:8080/api/users/${param.id}/verify/${param.token}`;
        const data = await axios.get(url);
        console.log(data);
        setvalidUrl(true);
      } catch (error) {
        console.log(error);
      }
    };

    return () => {
      verifyEmail();
    };
  }, []);
  return (
    <Fragment>
      {validUrl ? (
        <div className="container">
          <img src={success} alt="success_img" className="success_img" />
          <h1>Email verified successfully</h1>
          <Link to="/login">
            <button className="green_btn">Login</button>
          </Link>
        </div>
      ) : (
        <h1>404 Not Found</h1>
      )}
    </Fragment>
  );
};
