import { useParams, useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate(); // instead od link useNavigate can be used
  const { newUser } = useParams();

  const handleNavigate = () => {
    navigate("/");
  };
  return (
    <div>
      <h1>Login-{newUser}</h1>
      <button id="myButton" onClick={handleNavigate}>Home</button>
    </div>
  );
};

export default Login;
