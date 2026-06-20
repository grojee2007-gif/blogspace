import { useState } from "react";
import axios from "./api/axios"
import { Link, useNavigate } from "react-router-dom";

function Register() {

const [name,setName]=useState("");
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");

const navigate = useNavigate();

const register = async () => {

if(!name || !email || !password){
alert("Please fill all fields");
return;
}

try{

const res =
await axios.post(
"http://localhost:5000/api/auth/register",
{
name,
email,
password
}
);

alert(
res.data.message ||
"Registration Successful"
);

navigate("/");

}catch(error){

alert(
error?.response?.data?.message
||
"Registration Failed"
);

}

};

return(

<div
style={{
minHeight:"100vh",
display:"flex",
justifyContent:"center",
alignItems:"center",

background:
`
radial-gradient(circle at top left,
rgba(99,102,241,.20),
transparent 35%),

radial-gradient(circle at bottom right,
rgba(79,70,229,.15),
transparent 35%),

linear-gradient(
180deg,
#ffffff,
#eef2ff
)
`
}}

>

<div
style={{
width:"500px",
padding:"55px",
borderRadius:"28px",

background:
"rgba(255,255,255,.88)",

backdropFilter:
"blur(15px)",

boxShadow:
"0 25px 80px rgba(0,0,0,.10)"
}}

>

<div
style={{
textAlign:"center",
fontSize:"50px"
}}
>
✨
</div>

<h3
style={{
textAlign:"center",
color:"#4f46e5",
marginBottom:"8px"
}}
>
Welcome to BlogSpace
</h3>

<h1
style={{
textAlign:"center",
fontSize:"38px",
marginBottom:"10px"
}}
>
Join Our Community
</h1>

<p
style={{
textAlign:"center",
color:"#666",
marginBottom:"35px",
lineHeight:"1.7"
}}
>
Create your account and start writing,
sharing ideas and inspiring people.
</p>

<input
placeholder="Your Name"
value={name}
onChange={(e)=>setName(e.target.value)}
style={{
width:"100%",
padding:"18px",
marginBottom:"16px",
border:"1px solid #ddd",
borderRadius:"15px",
fontSize:"15px",
outline:"none"
}}
/>

<input
type="email"
placeholder="Your Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
style={{
width:"100%",
padding:"18px",
marginBottom:"16px",
border:"1px solid #ddd",
borderRadius:"15px",
fontSize:"15px",
outline:"none"
}}
/>

<input
type="password"
placeholder="Create Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
style={{
width:"100%",
padding:"18px",
border:"1px solid #ddd",
borderRadius:"15px",
fontSize:"15px",
outline:"none"
}}
/>

<button
onClick={register}
style={{
width:"100%",
padding:"18px",
marginTop:"24px",

background:
"linear-gradient(90deg,#6366f1,#4f46e5)",

color:"#fff",
border:"none",
borderRadius:"16px",

fontWeight:"700",
fontSize:"16px",

cursor:"pointer"
}}

>

Create Account </button>

<p
style={{
textAlign:"center",
marginTop:"24px",
color:"#666"
}}
>

Already have an account?

<Link
to="/"
style={{
color:"#4f46e5",
marginLeft:"8px",
fontWeight:"700",
textDecoration:"none"
}}
>
Login
</Link>

</p>

</div>

</div>

);

}

export default Register;
