import { FaGithub } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
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
            For feedbacks, support or general enquiries, please feel free to
            contact us at support@apexwallet.app.
          </p>
          <div className="contact">
            <div className="icons">
              <a href="https://github.com.com/apexwallet" className="github">
                <FaGithub />
              </a>
              <a href="mailto:support@apexwallet.app" className="gmail">
                <SiGmail />
              </a>
            </div>
          </div>
        </div>

        <footer>
          Apexwallet, from{" "}
          <a href="https://decover.co" target="_blank"rel="noopener noreferrer">
            Decover
          </a>{" "}
          &copy; {getYear()}
        </footer>
      </div>
    </div>
  );
};

export default SectionSix;
