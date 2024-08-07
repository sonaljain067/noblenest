import { FaLocationDot } from "react-icons/fa6"
import { IoIosMail } from "react-icons/io"
import { MdPhoneInTalk } from "react-icons/md"

const Contact = () => {
  return (
    <div className="contact">
        <h3>Home / <span className="blue">Contact</span></h3>
        <h1>Contact</h1>
        <section className="contactInfo">
          <div className="phone">
            <MdPhoneInTalk/>
            <p>+91 987-654-3210</p>
          </div>
          <div className="email">
            <IoIosMail/>
            <p>example@gmail.com</p>
          </div>
          <div className="address">
            <FaLocationDot/>
            <p>12 Link Road, Faridabad, Haryana, 121002</p>
          </div>
        </section>
        <section className="locationForm">
          <div className="graph">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.792765148013!2d77.31768631171332!3d28.42550937567742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cddbd4f48c7cb%3A0x8617e51cf15b8aa8!2s12%2C%20Link%20Rd%2C%20Bhoor%20Colony%2C%20Old%20Faridabad%2C%20Faridabad%2C%20Haryana%20121002!5e0!3m2!1sen!2sin!4v1718399140160!5m2!1sen!2sin" 
              width="600" height="450" loading="lazy"
              frameBorder={0} style={{border: 0}} 
              aria-hidden="false" tabIndex={0}

            ></iframe>
          </div>
          <div className="contactForm">
            <h3>Contact Form</h3>
            <input type="text" name="name" placeholder="Smita Sharma" />
            <input type="number" name="phone" placeholder="987-654-3210"/>
            <input type="email" name="email" placeholder="smitasharma@gmail.com" />
            <textarea name="comment" id="" cols={10} rows={2}></textarea>
            <button>Send</button>
          </div>
        </section>
      </div>
)
}

export default Contact