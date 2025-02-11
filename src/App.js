import './App.css';
import Arr_Products from "./Arr_Products";
import {useState} from "react";
import {createBrowserRouter, Link, Outlet, RouterProvider} from "react-router-dom";
import Products from "./pages/products";
import Cart from "./pages/cart";
import Admin, {AddAdmin, EditAdmin} from "./pages/admin";

function App() {
  const [products,setProducts]=useState(Arr_Products);
  const [cart,update_cart]=useState([]);
  console.log("Rendering App with cart:", cart); // בדוק שהאב מתעדכן


    function loaderProducts(){
        return products;
    }


    function loaderCart(){
        return cart;
    }


    // מאפשר לי לטעון נתונים ולהציג אותם ברגע שהקומפוננטה נטענת
    function loaderAdminEdit({params}){
        let id = parseInt(params.id);  // הפיכת ID למספר
        console.log(id);
        return products.find(p => p.id === id) || {};
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
            element:<Products cart={cart} update_cart={update_cart}></Products>,
            loader:loaderProducts

          },
          {
            path:'cart',
            element:<Cart update_cart={update_cart}></Cart>,
            loader:loaderCart
          },
          {
            path: 'admin',
            element: <Admin products={products} setProducts={setProducts}></Admin>,
            children:[
                {
                    path:'edit/:id?',
                    element:<EditAdmin setProducts={setProducts}/>,
                    loader:loaderAdminEdit
                },
                {
                    path:'add',
                    element:<AddAdmin/>,

                }
            ]
          }
      ]
    }
  ]);


  return (
    <RouterProvider router={router}/>
  );
}

export default App;
