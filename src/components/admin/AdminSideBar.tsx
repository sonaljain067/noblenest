import { useEffect, useState } from "react";
import { FaChartSimple, FaMoneyBillTrendUp, FaUsers } from "react-icons/fa6";
import { HiMenuAlt2 } from "react-icons/hi";
import { MdSpaceDashboard } from "react-icons/md";
import { RiDiscountPercentFill, RiShoppingBag2Fill } from "react-icons/ri";
import { Link, Location, useLocation } from "react-router-dom";
import { LiProps } from "../../types/dash.types";

const AdminSideBar  =  ()  => {
    const location: Location = useLocation() as Location; 
    const [ showModal, setShowModal ] = useState<boolean> (false); 
    const [ hamSideBar, setHamSideBar ] = useState<boolean> (window.innerWidth < 1100); 

    const resizeHandler = () => {
        setHamSideBar(window.innerHeight < 100); 
    }

    useEffect(() => {
        window.addEventListener("resize", resizeHandler); 
        return () => {
            window.removeEventListener("resize", resizeHandler); 
        }
    }, [hamSideBar])
    return (
       <>
            {
                hamSideBar && 
                <button id="hamburger" onClick={() => setShowModal(true)}>
                    <HiMenuAlt2/>
                </button>
            }
            <aside style={hamSideBar ? {
                width: "20rem",
                height: "100vh", 
                position: "fixed",
                top: 0,
                left: showModal ? "0" : "-20rem",  
                transition: "all 0.5s"
            }: {}}>
                <h2>Logo..</h2>
                <Dashboard location={location}/> 
                { hamSideBar && 
                    <button onClick={() => setShowModal(false)} id="closeHamSideBar" >Close</button>
                }
            </aside>
       </>
  );
}; 

const Dashboard  =  ({ location }: {location: Location})  => (
    <div>
        <h5></h5>
        <ul>
            <Li url="/admin/dashboard" text= "Dashboard" Icon ={ MdSpaceDashboard } location={location}  />

            <Li url="/admin/customer" text= "Customer" Icon ={ FaUsers } location={location} />

            <Li url="/admin/product" text= "Product" Icon ={ RiShoppingBag2Fill } location={location}  />

            <Li url="/admin/transaction" text= "Transaction" Icon ={ FaMoneyBillTrendUp } location={location}  />

            <Li url="/admin/statistics" text= "Statistics" Icon ={ FaChartSimple } location={location}  />

            <Li url="/admin/coupon" text= "Coupon" Icon ={ RiDiscountPercentFill } location={location}  />
        </ul>
        
    </div>
)



const Li  =  ({ url, text, Icon, location }: LiProps)  => (
    <li style  =  {{
            backgroundColor: location.pathname.includes(url) ? "rgba(0, 115, 255, 0.1)": "white",
        }} >
        <Link to = { url } style  =  {{
            color: location.pathname.includes(url) ? "rgb(0, 115, 255)" : "black"
            }}>
            <div className="icon">{Icon && <Icon/>}</div>
            <span>{ text }</span>
        </Link>
    </li>
)


export default AdminSideBar