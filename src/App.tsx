import { Suspense, lazy, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";

import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import Loader, { SkeletonLoader } from "./components/Loader";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/user/Footer";
import { auth } from "./firebase";
import { getUserById } from "./redux/api/userAPI";
import { userExist, userNotExist } from "./redux/reducer/userReducer";
import { RootState } from "./redux/store";

// User
const NotFound = lazy(() => import("./pages/NotFound"))
const Home = lazy(() => import("./pages/user/Home"));
const Shop = lazy(() => import("./pages/user/Shop"));
const Product = lazy(() => import("./pages/user/Product"));
const Cart = lazy(() => import("./pages/user/cart/Cart"));
const Checkout = lazy(() => import("./pages/user/cart/Checkout"));
const Contact = lazy(() => import("./pages/user/Contact"));
const Login = lazy(() => import("./pages/user/auth/Login"));
const Orders = lazy(() => import("./pages/user/cart/Orders"));

// Admin Dashboard
const Dashboard = lazy(() => import("./pages/admin/dashboard/Dashboard"));
const Customers = lazy(() => import("./pages/admin/dashboard/Customers"));
const Products = lazy(() => import("./pages/admin/dashboard/Products"));
const Transactions = lazy(() => import("./pages/admin/dashboard/Transactions"));
const Statistics = lazy(() => import("./pages/admin/dashboard/Statistics"));
const Coupons = lazy(() => import("./pages/admin/dashboard/Coupons"));

// Admin CRUD
const NewProduct = lazy(() => import("./pages/admin/manage/NewProduct"));
const ManageProduct = lazy(() => import("./pages/admin/manage/UpdateProduct"));
const TransactionCard = lazy(
    () => import("./pages/admin/manage/TransactionCard")
);

function App() {
    const { user, loading } = useSelector((state: RootState) => state.userReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        onAuthStateChanged(auth, async(user) => {
            if(user) {
                const fetchUser = (await getUserById(user.uid)).data;
                dispatch(userExist(fetchUser));
            } else {
                dispatch(userNotExist());
            }
        })
    }, [])
    return (
        loading ? <SkeletonLoader length={15}/> : (
        <Router>
            <Navbar />
            <Suspense fallback={<Loader />}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<Shop />} /> 
                    <Route path="/product/:id" element={<Product />} />
                    <Route path="/contact" element={<Contact />} />

                    <Route path="/login"
                        element={
                            <ProtectedRoute isAuthenticated = {user._id !== '' ? false : true }>
                                <Login />
                            </ProtectedRoute>
                        }
                    />

                    {/* Logged In User  */}
                    <Route element = {<ProtectedRoute isAuthenticated = {user._id !== '' ? true : false} />}>
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/order" element={<Orders />} />
                        <Route path="/checkout" element={<Checkout />} />
                    </Route>

                    {/* Admin */}
                    <Route element = {<ProtectedRoute isAuthenticated = {true} adminRoute = {true} isAdmin = {user?.role === "admin" ? true : false} />}>
                        <Route path="/admin/dashboard" element={<Dashboard />} />
                        <Route path="/admin/product" element={<Products />} />
                        <Route path="/admin/customer" element={<Customers />} />
                        <Route path="/admin/transaction" element={<Transactions />}/>
                        <Route path="/admin/coupon" element={<Coupons />} />
                        <Route path="/admin/statistics" element={<Statistics />} />
                        <Route path="/admin/product/new" element={<NewProduct />} />
                        <Route path="/admin/product/:id" element={<ManageProduct />}/>
                        <Route path="/admin/transaction/:id" element={<TransactionCard />}/>
                    </Route>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </Suspense>
            <Footer />
            <Toaster position="top-right" />
        </Router>
    ))
}

export default App;
