import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "./api/axios";

function Blog() {

const [title,setTitle]=useState("");
const [content,setContent]=useState("");
const [posts,setPosts]=useState([]);
const [search,setSearch]=useState("");
const [editingId,setEditingId]=useState(null);
const [comment,setComment]=useState("");

const navigate=useNavigate();

const getToken=()=>{

const user=
JSON.parse(
localStorage.getItem("blogUser")
);

return user?.token;

};

useEffect(()=>{

if(!getToken()){

window.location.href="/";
return;

}

fetchPosts();

},[]);

const fetchPosts=async()=>{

try{

const res=
await axios.get("/posts");

setPosts(
Array.isArray(res.data)
? res.data
: []
);

}catch{

alert("Unable to load posts");

}

};

const authHeader=()=>({

headers:{
Authorization:
`Bearer ${getToken()}`
}

});

const createPost=async()=>{

if(!title || !content){

alert("Fill all fields");
return;

}

try{

await axios.post(

"/posts",

{
title,
content
},

authHeader()

);

setTitle("");
setContent("");

alert("Post Published");

fetchPosts();

}catch{

alert("Post creation failed");

}

};

const updatePost=async()=>{

try{

await axios.put(

`/posts/${editingId}`,

{
title,
content
},

authHeader()

);

alert("Updated");

setEditingId(null);

setTitle("");
setContent("");

fetchPosts();

}catch{

alert("Update failed");

}

};

const deletePost=async(id)=>{

try{

await axios.delete(

`/posts/${id}`,

authHeader()

);

fetchPosts();

}catch{

alert("Delete failed");

}

};

const likePost=async(id)=>{

try{

await axios.put(
`/posts/like/${id}`
);

fetchPosts();

}catch{

alert("Like failed");

}

};

const addComment=async(id)=>{

if(!comment){

alert("Enter comment");
return;

}

try{

await axios.put(

`/posts/comment/${id}`,

{
text:comment
}

);

setComment("");

fetchPosts();

}catch{

alert("Comment failed");

}

};

const logout=()=>{

localStorage.removeItem(
"blogUser"
);

window.location.href="/";

};

const filteredPosts=
posts.filter(

(post)=>

(post.title || "")
.toLowerCase()
.includes(
search.toLowerCase()
)

||

(post.content || "")
.toLowerCase()
.includes(
search.toLowerCase()
)

);

return(

<div
style={{
minHeight:"100vh",
padding:"50px",
background:
"linear-gradient(180deg,#eef2ff,#ffffff)"
}}
>

<div
style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center"
}}
>

<div>

<h1
style={{
fontSize:"48px",
color:"#4f46e5"
}}
>

✨ BlogSpace

</h1>

<p>
Think. Create.
</p>

</div>

<button
onClick={logout}
style={{
padding:"14px 24px",
background:"#ef4444",
color:"white",
border:"none",
borderRadius:"14px"
}}

>

Logout

</button>

</div>

<div
style={{
marginTop:"40px",
background:"white",
padding:"35px",
borderRadius:"25px"
}}
>

<input
placeholder="🔍 Search posts"
value={search}
onChange={(e)=>
setSearch(
e.target.value
)}
style={{
width:"100%",
padding:"16px",
marginBottom:"20px"
}}
/>

<input
placeholder="Title"
value={title}
onChange={(e)=>
setTitle(
e.target.value
)}
style={{
width:"100%",
padding:"16px",
marginBottom:"15px"
}}
/>

<textarea
placeholder="Write content..."
value={content}
onChange={(e)=>
setContent(
e.target.value
)}
style={{
width:"100%",
height:"140px",
padding:"16px"
}}
/>

<button
onClick={
editingId
?
updatePost
:
createPost
}
style={{
marginTop:"20px",
padding:"16px",
background:"#4f46e5",
color:"white",
border:"none",
borderRadius:"12px"
}}
>

{
editingId
?
"Update"
:
"Publish"
}

</button>

</div>

<div
style={{
marginTop:"35px",
display:"grid",
gap:"20px"
}}
>

{

filteredPosts.map(
(post)=>(

<div
key={post._id}
style={{
background:"white",
padding:"25px",
borderRadius:"20px"
}}
>

<h2>

{post.title}

</h2>

<p>

{post.content}

</p>

<p>

👤
{" "}
{post.author?.name}

</p>

<p>

❤️
{" "}
{post.likes || 0}

</p>

<button
onClick={()=>
likePost(
post._id
)}
>

Like

</button>

<button
onClick={()=>{

setEditingId(
post._id
);

setTitle(
post.title
);

setContent(
post.content
);

}}
>

Edit

</button>

<button
onClick={()=>
deletePost(
post._id
)}
>

Delete

</button>

<button
onClick={()=>
navigate(
`/post/${post._id}`
)}
>

Open

</button>

<br/><br/>

<input
placeholder="Add comment"
value={comment}
onChange={(e)=>
setComment(
e.target.value
)}
/>

<button
onClick={()=>
addComment(
post._id
)}
>

Comment

</button>

{

post.comments?.map(
(c,index)=>(

<p key={index}>

💬 {c.text}

</p>

)

)

}

</div>

)

)

}

</div>

</div>

);

}

export default Blog;
