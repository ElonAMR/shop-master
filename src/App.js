import './App.css';
import Arr_Products from "./Arr_Products";
import {useState} from "react";
import {createBrowserRouter, Link, Outlet, RouterProvider} from "react-router-dom";
import Products from "./pages/products";
import Cart from "./pages/cart";


function App() {
  const [products,setProducts]=useState(Arr_Products);
  const [cart,update_cart]=useState([]);
  console.log("Rendering App with cart:", cart); // בדוק שהאב מתעדכן



    function loaderCart(){
        return cart;
    }



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
              element:<Products products={products} cart={cart} update_cart={update_cart}></Products>,
          },
          {
            path:'cart',
              element:<Cart update_cart={update_cart}></Cart>,
              loader:loaderCart
          },
          {
            path: 'admin',
            element: <h1>Admin</h1>,
          }
      ]
    }
  ]);


  return (
    <RouterProvider router={router}/>
  );
}

export default App;
