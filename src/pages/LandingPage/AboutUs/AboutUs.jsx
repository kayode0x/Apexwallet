import "./AboutUs.scss";
import sakuna from "../../../assets/logo/sakunaRed.JPG";
import shelby from "../../../assets/logo/shelby.jpeg";
import kakashi from "../../../assets/logo/kakashi.jpeg";
import beerus from "../../../assets/logo/beerus.jpeg";
import useTitle from "../../../utils/useTitle";
import Nav from "../../../components/TopNav/Nav";
import SectionFive from "../SectionFive/SectionFive";
import SectionSix from "../SectionSix/SectionSix";

const AboutUs = () => {

  useTitle("About Us | Apexwallet");

  return (
    <div className="aboutUs">
      <Nav />
      <div className="container">
        <div className="header">
          <p>About Apexwallet</p>
          <p>
            Our mission is to provide users with fundamental cryptocurrency
            insight and experience. Apexwallet is a simulated cryptocurrency
            wallet designed to teach how cryptocurrencies work, with more
            features. We believe the best cryptocurrency acumen should be
            available to everyone.
          </p>
        </div>
        <div className="body">
          <p className="header">The Team</p>
          <div className="theTeam">
            <div className="kayode">
              <img src={sakuna} alt="img" />
              <p>Kayode</p>
              <p>Development</p>
            </div>
            <div className="victor">
              <img src={kakashi} alt="img" />
              <p>Victor</p>
              <p>Operations</p>
            </div>
            <div className="david">
              <img src={shelby} alt="img" />
              <p>Dave</p>
              <p>Finance</p>
            </div>
            <div className="bolu">
              <img src={beerus} alt="img" />
              <p>Bolu</p>
              <p>Marketing</p>
            </div>
          </div>
        </div>

        <SectionFive />
        <SectionSix />
      </div>
    </div>
  );
};

export default AboutUs;
