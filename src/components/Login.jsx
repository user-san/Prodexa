import { useParams, useNavigate } from "react-router-dom";
import "./Login.css";
const Login = () => {
  const navigate = useNavigate(); // instead of link useNavigate can be used to navigate programatically
  const { newUser } = useParams();

  const handleNavigate = () => {
    navigate("/");
  };
  return (
    <div className="logBody">
      <h3>Login-{newUser}</h3>
      <button className="loginBtn" onClick={handleNavigate}>
        Home
      </button>
    </div>
  );
};

export default Login;
