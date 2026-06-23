import {
Routes,
Route
} from "react-router-dom";

import Login from "./Login";
import Register from "./Register";

import Dashboard from "./Dashboard";
import CreatePost from "./CreatePost";

import PostDetail from "./PostDetail";

import ProtectedRoute from "./ProtectedRoute";

function App(){

return(

<Routes>

<Route
path="/"
element={<Login/>}
/>

<Route
path="/register"
element={<Register/>}
/>

<Route

path="/dashboard"

element={

<ProtectedRoute>

<Dashboard/>

</ProtectedRoute>

}

/>

<Route

path="/create"

element={

<ProtectedRoute>

<CreatePost/>

</ProtectedRoute>

}

/>

<Route

path="/post/:id"

element={

<ProtectedRoute>

<PostDetail/>

</ProtectedRoute>

}

/>

<Route
path="/blog"
element={<Dashboard/>}
/>

</Routes>

);

}

export default App;