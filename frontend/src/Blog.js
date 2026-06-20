import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "./api/axios"

function Blog() {

const [title,setTitle]=useState("");
const [content,setContent]=useState("");
const [posts,setPosts]=useState([]);
const [search,setSearch]=useState("");
const [editingId,setEditingId]=useState(null);
const [comment,setComment]=useState("");
const navigate =
useNavigate();
useEffect(()=>{

const token=
localStorage.getItem("token");

if(!token){

window.location.href="/";

return;

}

fetchPosts();

},[]);

const fetchPosts=async()=>{

try{

const res=
await axios.get(
"http://localhost:5000/api/posts"
);

setPosts(res.data);

}catch{

alert("Unable to load posts");

}

};

const createPost=async()=>{

if(!title || !content){

alert("Fill all fields");

return;

}

try{

const token=
localStorage.getItem("token");

await axios.post(

"http://localhost:5000/api/posts",

{
title,
content
},

{
headers:{
Authorization:`Bearer ${token}`
}
}

);

alert("Post Published");

setTitle("");

setContent("");

fetchPosts();

}catch{

alert("Post creation failed");

}

};

const updatePost=async()=>{

try{

const token=
localStorage.getItem("token");

await axios.put(

`http://localhost:5000/api/posts/${editingId}`,

{
title,
content
},

{
headers:{
Authorization:`Bearer ${token}`
}
}

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

const token=
localStorage.getItem("token");

await axios.delete(

`http://localhost:5000/api/posts/${id}`,

{
headers:{
Authorization:`Bearer ${token}`
}
}

);

alert("Deleted");

fetchPosts();

}catch{

alert("Delete failed");

}

};
const likePost = async(id)=>{

try{

await axios.put(

`http://localhost:5000/api/posts/like/${id}`

);

fetchPosts();

}catch{

alert("Like failed");

}

};
const addComment = async(id)=>{

try{

await axios.put(

`http://localhost:5000/api/posts/comment/${id}`,

{
text:comment
}

);

setComment("");

fetchPosts();

}catch{

alert(
"Comment failed"
);

}

};
const logout=()=>{

localStorage.removeItem("token");

window.location.href="/";

};

const filteredPosts=
posts.filter((post)=>

post.title
.toLowerCase()
.includes(search.toLowerCase())

||

post.content
.toLowerCase()
.includes(search.toLowerCase())

);

return(

<div

style={{

minHeight:"100vh",

padding:"50px",

background:`
radial-gradient(circle at 0% 0%,rgba(79,70,229,.45),transparent 38%),
radial-gradient(circle at 100% 100%,rgba(99,102,241,.35),transparent 42%),
linear-gradient(180deg,#dbeafe,#ffffff)
`

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

color:"#4f46e5",

marginBottom:"0"

}}

>

✨ BlogSpace

</h1>

<p>Think. Create.</p>

</div>

<button

onClick={logout}

style={{

padding:"14px 22px",

background:
"linear-gradient(90deg,#ef4444,#dc2626)",

color:"#fff",

border:"none",

borderRadius:"14px",

cursor:"pointer"

}}

>

Logout

</button>

</div>

<div

style={{

marginTop:"50px",

background:
"rgba(255,255,255,.65)",

padding:"35px",

borderRadius:"28px",

backdropFilter:"blur(20px)"

}}

>

<input

placeholder="🔍 Search posts"

value={search}

onChange={(e)=>
setSearch(
e.target.value
)
}

style={{

width:"100%",

padding:"16px",

borderRadius:"14px",

border:"1px solid #ddd",

marginBottom:"25px"

}}

/>

<h2>

{
editingId
?
"Edit Post"
:
"Create Post"
}

</h2>

<input

placeholder="Title"

value={title}

onChange={(e)=>
setTitle(
e.target.value
)
}

style={{

width:"100%",

padding:"18px",

borderRadius:"14px",

marginBottom:"15px",

border:"1px solid #ddd"

}}

/>

<textarea

placeholder="Content"

value={content}

onChange={(e)=>
setContent(
e.target.value
)
}

style={{

width:"100%",

height:"150px",

padding:"18px",

borderRadius:"14px",

border:"1px solid #ddd"

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

padding:"16px 28px",

background:
"linear-gradient(90deg,#6366f1,#4f46e5)",

color:"#fff",

border:"none",

borderRadius:"14px",

cursor:"pointer"

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

marginTop:"40px",

display:"grid",

gridTemplateColumns:
"repeat(auto-fit,minmax(320px,1fr))",

gap:"24px"

}}

>

{

filteredPosts.map((post)=>(

<div

key={post._id}

onClick={()=>
navigate(
`/post/${post._id}`
)
}

style={{
cursor:"pointer"
}}

>

<div

style={{

color:"#6366f1",

fontWeight:"700"

}}

>

FEATURED

</div>

<h2>

{post.title}

</h2>

<p>

{post.content}

</p>

<p>

👤 {post.author?.name}

</p>
<p>

❤️ {post.likes || 0}

</p>

<button

onClick={()=>
likePost(post._id)
}

>

Like

</button>
<div

style={{

display:"flex",

gap:"10px"

}}

>

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

style={{

padding:"10px 18px",

background:"#4f46e5",

color:"#fff",

border:"none",

borderRadius:"10px"

}}

>

Edit

</button>

<button

onClick={()=>
deletePost(
post._id
)
}

style={{

padding:"10px 18px",

background:"#ef4444",

color:"#fff",

border:"none",

borderRadius:"10px"

}}

>

Delete

</button>
<br/>
<br/>

<input

placeholder="Add comment"

value={comment}

onChange={(e)=>
setComment(
e.target.value
)
}

/>

<button

onClick={()=>
addComment(
post._id
)
}

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

</div>

))

}

</div>

</div>

);

}

export default Blog;