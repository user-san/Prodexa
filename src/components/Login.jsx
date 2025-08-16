import { useParams, useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate(); // instead of link useNavigate can be used to navigate programatically
  const { newUser } = useParams();

  const handleNavigate = () => {
    navigate("/");
  };
  return (
    <div>
      <h1>Login-{newUser}</h1>
      <button id="myButton" onClick={handleNavigate}>
        Home
      </button>
    </div>
  );
};

export default Login;
