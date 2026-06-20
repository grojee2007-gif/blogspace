import { useEffect, useState } from "react";
import axios from "./api/axios"
import { useParams } from "react-router-dom";

function PostDetail(){

const { id } = useParams();

const [post,setPost]=useState(null);

useEffect(()=>{

const loadPost = async()=>{

try{

const res =
await axios.get(
"http://localhost:5000/api/posts"
);

const found =
res.data.find(
(p)=>p._id===id
);

setPost(found);

}catch{

alert(
"Unable to load post"
);

}

};

loadPost();

},[id]);

if(!post){

return(

<h2>
Loading...
</h2>
);

}

return(

<div
style={{
padding:"50px"
}}
>

<h1>
{post.title}
</h1>

<p>
{post.content}
</p>

<p>
👤 {post.author?.name}
</p>

<p>
❤️ {post.likes || 0}
</p>

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

);

}

export default PostDetail;
