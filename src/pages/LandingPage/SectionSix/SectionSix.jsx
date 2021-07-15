import { FaTwitter, FaInstagram } from "react-icons/fa";
import "./SectionSix.scss";

const SectionSix = () => {
  //function to get current year
  const getYear = () => {
    const date = new Date();
    return date.getFullYear();
  };
  return (
    <div className="footer">
      <div className="container">
        <div className="subContainer">
          <p className="support">
            Please let us know about your feedbacks, questions or concerns to
            ensure we continue to serve you well.
          </p>
          <div className="contact">
            <p>support@apexwallet.app</p>
            <div className="icons">
              <a href="https://twitter.com/apexwallet" className="twitter">
                <FaTwitter />
              </a>
              <a href="https://instagram.com/apexwallet" className="instagram">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        <footer>Apexwallet, from Decover &copy; {getYear()}</footer>
      </div>
    </div>
  );
};

export default SectionSix;
