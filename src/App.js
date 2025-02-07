import './App.css';
import Arr_Products from "./Arr_Products";
import {Children, useState} from "react";
import {createBrowserRouter, Link, Outlet, RouterProvider} from "react-router-dom";

function App() {
  const [products,setProducts]=useState(Arr_Products);

  console.log(products);


  const router = createBrowserRouter([
    {
      path:'/',
      element:(
          <>
            <header>
                <h1>Wellcome</h1>
            <nav>
                <button><Link to={"cart"}> Shopping cart </Link></button>
                <button><Link to={"./"}> Products List </Link></button>
                <button><Link to={"admin"}> Admin </Link></button>
            </nav>
            </header>
              <hr></hr>
            <Outlet/>
          </>
      ),
      children: [
          {
            index:true,
            element:<h1>Products</h1>,
          },
          {
            path:'cart',
            element:<h1>Cart</h1>,
          },
          {
            path: 'admin',
            element: <h1>Admin</h1>   ,
          }
      ]
    }
  ]);





  return (
    <RouterProvider router={router}/>
  );
}

export default App;
