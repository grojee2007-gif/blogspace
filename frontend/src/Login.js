import React, { useState } from "react";
import axios from "./api/axios";
import { Link } from "react-router-dom";

function Login() {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const login = async () => {

if (!email || !password) {
alert("Fill all fields");
return;
}

try {

const res = await axios.post(
"/auth/login",
{
email,
password
}
);

// Save user token
localStorage.setItem(
"blogUser",
JSON.stringify({
token: res.data.token
})
);

alert("Login Successful");

// force redirect
window.location.href = "/blog";

} catch (error) {

console.log(error);

alert(
error?.response?.data?.message ||
"Login Failed"
);

}

};

return (

<div
style={{
minHeight: "100vh",
display: "flex",
justifyContent: "center",
alignItems: "center",
background:
"linear-gradient(180deg,#eef2ff,#ffffff)"
}}
>

<div
style={{
width: "450px",
padding: "50px",
background: "#fff",
borderRadius: "25px",
boxShadow:
"0 20px 60px rgba(0,0,0,.12)"
}}
>

<h1
style={{
textAlign: "center",
color: "#4f46e5"
}}
>
📝 BlogSpace
</h1>

<input
type="email"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
style={{
width:"100%",
padding:"16px",
marginTop:"20px"
}}
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
style={{
width:"100%",
padding:"16px",
marginTop:"15px"
}}
/>

<button
onClick={login}
style={{
width:"100%",
padding:"16px",
marginTop:"20px",
background:"#4f46e5",
color:"white",
border:"none",
cursor:"pointer"
}}

>

Login </button>

<p
style={{
textAlign:"center",
marginTop:"20px"
}}
>

<Link to="/register">
Create Account
</Link>

</p>

</div>

</div>

);

}

export default Login;
