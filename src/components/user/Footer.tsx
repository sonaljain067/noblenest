import { GrFacebookOption, GrInstagram, GrPinterest, GrTwitter } from 'react-icons/gr'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className="userFooter">
       <div className="aboutUs">
            <Link to="/">
                <img src="https://res.cloudinary.com/dyu8bj7ko/image/upload/v1717937457/Noble%20Nest/logo-dark.png" alt="" />
            </Link>
            <p>Lorem ipsum dolor sit  </p>
            <ul className="socials">
                <li><GrInstagram/></li>
                <li><GrTwitter/></li>
                <li><GrFacebookOption/></li>
                <li><GrPinterest/></li>
            </ul>
        </div>
        <div className="accountInfo">
            <h2>My Account</h2>
            <div className="accountDetails">
                <p>Track my order</p>
                <p>Terms of use</p>
                <p>Wishlist</p>
                <p>Submit Your Feedback</p>
            </div>
        </div>
        <div className="customerService">
            <h2>Service</h2>
            <div className="customerCareDetails">
                <p>Monday to Friday</p>
                <p>10am - 6pm(IST)</p>
                <p>Call us at: <a href="tel: +1234567668">123-456-7668</a></p>
                <p>Email us: <a href="mailto: info@noblenest.com">info@noblenest.com</a></p>
            </div>
        </div>
    </div>
  )
}

export default Footer