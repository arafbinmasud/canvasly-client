import { FaFacebook, FaHome, FaLinkedin, FaPhoneAlt, FaPinterest, FaTwitter } from "react-icons/fa";
import { FaSquareBehance, FaSquareInstagram, FaXTwitter } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";


const Footer = () => {
  return (
    <footer className="bg-base-200 text-white font-text">
      <div className=" max-w-350 mx-auto py-8 px-2 md:px-0">
        <p className="text-center text-3xl font-bold font-heading cursor-pointer mb-2">
          Can<span className="text-primary">vas</span>Ly
        </p>
        <p className="text-center text-xl font-text opacity-70 italic mb-15 md:mb-20">Where Art Meets Expression</p>

        <div className="flex flex-col gap-15 md:gap-0 md:flex-row md:items-start justify-between">
          <div>
            <h4 className="text-2xl font-semibold font-heading mb-5">
              Contact Info
            </h4>
            <address className=" mb-5">
              <FaHome className="text-primary" size={20} /> 472 High Street, Suite 102, <br /> Palo Alto,
              CA 94301, USA
            </address>
            <p className="mb-5">
              {" "}
              <FaPhoneAlt className="text-primary" size={15} />
              <a href="tel:+15555555555">+1 (650) 555-0128</a>
            </p>
            <p>
              {" "}
              <IoIosMail className="text-primary" size={20} />
              support@canvasly.art
            </p>
          </div>
          <div>
            <h4 className="text-2xl font-semibold font-heading mb-5">
              Social Links
            </h4>
            <div className="flex flex-col gap-5">
                <a href="https://www.facebook.com/" target="_blank"><FaFacebook /></a>

                <a href="https://x.com/" target="_blank"><FaXTwitter /></a>
                
                <a href="https://www.instagram.com/" target="_blank"><FaSquareInstagram /></a>
                
                <a href="https://www.pinterest.com/" target="_blank"><FaPinterest /></a>
                <a href="https://www.behance.net/" target="_blank"><FaSquareBehance /></a>
                <a href="https://www.linkedin.com/" target="_blank"><FaLinkedin /></a>
            </div>
          </div>
        </div>

        <p className="text-sm text-center mt-8">
          &copy; {new Date().getFullYear()} Canvasly, Inc. All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
