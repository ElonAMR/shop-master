import './App.css';
import Arr_Products from "./Arr_Products";
import {useState} from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

function App() {
  const [products,setProducts]=useState(Arr_Products);

  console.log(products);


  const router = createBrowserRouter([
    {
      path:'/',
      element:<h1>hello</h1>
    },
  ]);





  return (
    <RouterProvider router={router}/>
  );
}

export default App;
