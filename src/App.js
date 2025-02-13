import './App.css';
import Arr_Products from "./Arr_Products";
import {useState} from "react";
import {redirect, createBrowserRouter, Link, Outlet, RouterProvider} from "react-router-dom";
import Products from "./pages/products";
import Cart from "./pages/cart";
import Payment from "./pages/payment";
import Admin, {AddAdmin, EditAdmin} from "./pages/admin";

function App() {
  const [products,setProducts]=useState(Arr_Products);
  const [cart,update_cart]=useState([]);
  const [orders,set_orders]=useState([]);


   console.log("orders:" , orders);

    function loaderProducts(){
        return products;
    }


    function loaderCart(){
        return cart;
    }


    // מאפשר לי לטעון נתונים ולהציג אותם ברגע שהקומפוננטה נטענת
    function loaderAdminEdit({params}){
        let id = parseInt(params.id);  // הפיכת ID למספר
        return products.find(p => p.id === id) || {};
    }


    async function actionOrders({request}){
        const orderData=await request.formData();
        const newOrder=Object.fromEntries(orderData);

        newOrder.order = JSON.parse(newOrder.order);
        newOrder.price = JSON.parse(newOrder.price);

        set_orders((prevOrders) => [...prevOrders, newOrder]);

        //לאפס את העגלה אחרי ההזמנה
        update_cart([]);
        return redirect('/');
    }



    // מאפשר לי לקבל את הנתונים שנשלחו מטופס ולעדכן את המוצר שנבחר
    async function actionAdminEdit({request}){

        const formData= await request.formData(); //מקבל את המידע שנשלח מהטופס
        const data = Object.fromEntries(formData); // ממיר את המידע לאובייקט עם שדה וערך

        data.id=parseInt(data.id);
        data.price = parseFloat(data.price);

        const updateArr = products.map( p =>
            p.id === data.id ? {...p ,...data} : p
        );

        setProducts(updateArr);

        return redirect('/');
    }



    // מאפשר לי לקבל את הנתונים שנשלחו מטופס הוספת מוצר ולהציגו
    async function actionAdminAdd({request}){

        const newP = await request.formData(); //מקבל את המידע שנשלח מהטופס
        const newP_Data = Object.fromEntries(newP); // ממיר את המידע לאובייקט עם שדה וערך

        newP_Data.id=parseInt(newP_Data.id);
        newP_Data.price = parseFloat(newP_Data.price);

        // הוספת המוצר החדש לסוף המערך המוצרים בסטייט
        const updatedProducts = [...products, newP_Data];

        setProducts(updatedProducts);

        return redirect('/');
    }


  const router = createBrowserRouter([
    {
      path:'/',
      element:(
          <>
          <div className="app-container">
              <header>
                  <h1>Shop Master</h1>
                  <nav>
                      <button className={"btn-menu"}><Link to={"cart"}> Shopping cart </Link></button>
                      <button className={"btn-menu"}><Link to={"./"}> Products List </Link></button>
                      <button className={"btn-menu"}><Link to={"admin"}> Admin </Link></button>
                  </nav>
              </header>
              <div className="outlet-container">
                  <Outlet/>
              </div>
          </div>
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
            loader:loaderCart,
          },
          {
              path: 'payment',
              element: <Payment cart={cart} />,
              action:actionOrders,
          },
          {
            path: 'admin',
            element: <Admin products={products} setProducts={setProducts}></Admin>,
            children:[
                {
                    path:'edit/:id?',
                    element:<EditAdmin setProducts={setProducts}/>,
                    loader:loaderAdminEdit,
                    action:actionAdminEdit
                },
                {
                    path:'add',
                    element:<AddAdmin/>,
                    action:actionAdminAdd
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





