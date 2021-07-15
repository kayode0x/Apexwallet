import "./SectionFive.scss";
import { Link } from "react-router-dom";
import HomeSVG from "../../../assets/mockups/Home.svg";

const SectionFive = () => {
  return (
    <div className="getStarted">
      <div className="container">
        <div className="textAndBtn">
          <p>
            Before splashing cash into cryptocurrencies, know the basics. Play
            safe, start <span>simulating</span> today!
          </p>
          <div className="buttons">
            <Link to="/signup" className="signupBtn">
              Get Started
            </Link>
          </div>
        </div>
        <img src={HomeSVG} alt="coin" />
      </div>
    </div>
  );
};

export default SectionFive;
