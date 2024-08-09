import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaShoppingBag, FaSignOutAlt } from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";
import { HiMiniShoppingCart } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { auth } from "../firebase";
import { RootState } from "../redux/store";
import { LiProps } from "../types/dash.types";
import { ErrorAPIResponse } from "../types/api.types";

const Li = ({ url, text, location }: LiProps) => (
    <li>
        <Link
            to={url}
            style={{color: location.pathname.match(url) ? "#fff" : ""}}>
            {text}
        </Link>
    </li>
);

const Navbar = () => {
    const { user } = useSelector((state: RootState) => state.userReducer);
    const location = useLocation();
    const [windowSize, setWindowSize] = useState(window.innerWidth);
    const [_, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        const handleWindowSize = () => {
            setWindowSize(window.innerWidth);
        };
        window.addEventListener("resize", handleWindowSize);
        return () => {
            window.removeEventListener("resize", handleWindowSize);
        };
    }, []);

    const setLogoutHandler = async () => {
        try {
            await signOut(auth);
            toast.success("Signed Out Successfully!");
            setIsOpen(false);
        } catch (error) {
            const err = (error as ErrorAPIResponse)?.data.message
            if(err) toast.error(err);  
            else {
                console.log(error)
                toast.error("Internal Server Error!!")
            }
        }
    };

    const curtains: JSX.Element[] = [];
    for (let i = 1; i <= windowSize / 30; i++) {
        curtains.push(<span className="curtain" key={i}></span>);
    }
    
    return (
        <nav className="navUserHeader">
            {user._id === '' &&
            <>
                <div className="navInfo">
                <Link onClick={() => setIsOpen(false)} to="/">
                    <span>
                        <FaTruckFast /> Free
                    </span>{" "}
                    free shipping over $150
                </Link>
                
                <div>
                    <Link to="/login">Login/Register</Link>
                </div>
                
                </div>
                <div className="curtainDiv">{curtains}</div>
                <section className="navDetailsHeader">
                    <Link to="/">
                        <img
                            src="https://res.cloudinary.com/dyu8bj7ko/image/upload/v1722168005/Noble%20Nest/logo-light.png"
                            alt=""
                        />
                    </Link>
                    <ul className="navNavigation">
                        <Li url="/" text="Home" location={location} />
                        <Li url="/shop" text="Shop" location={location} />
                        <Li url="/contact" text="Contact" location={location} />
                    </ul>

                </section>
            </>
            }
            {user._id !== '' && <>
                    <section className="navDetailsHeader">
                        <div className="logo">
                            <Link to="/">
                                <img src="https://res.cloudinary.com/dyu8bj7ko/image/upload/v1722168005/Noble%20Nest/logo-light.png" alt="Logo" />
                            </Link>
                        </div>
                        <ul className="navNavigation">
                            <Li url="/" text="Home" location={location} />
                            <Li url="/shop" text="Shop" location={location} />
                            <Li url="/contact" text="Contact" location={location} />
                        </ul>
                        <div className="navActions">
                            <Link to="/order"><FaShoppingBag /></Link> 
                            <Link to="/cart"><HiMiniShoppingCart /></Link>
                            {user.role != "user" ? (
                                <>
                                    <Link to="/admin/dashboard"><img src={user?.avatar} alt="User Avatar" /></Link>
                                </>
                            ): <img src={user?.avatar} alt="User Avatar" /> }
                            <button onClick={setLogoutHandler}><FaSignOutAlt /></button>
                        </div>
                    </section>
                </>
            }
        </nav>
    );
};

export default Navbar;
