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
            <a
              href="https://twitter.com/kayode0x"
              target="_blank"
              rel="noreferrer"
              className="kayode"
            >
              <img src={sakuna} alt="img" />
              <p>Kayode</p>
              <p>Development</p>
            </a>
            <a
              href="https://www.linkedin.com/in/victor-ugochukwu-105698185"
              target="_blank"
              rel="noreferrer"
              className="victor"
            >
              <img src={kakashi} alt="img" />
              <p>Victor</p>
              <p>Operations</p>
            </a>
            <a
              href="https://twitter.com/daveokojie"
              target="_blank"
              rel="noreferrer"
              className="david"
            >
              <img src={shelby} alt="img" />
              <p>Dave</p>
              <p>Finance</p>
            </a>
            <a
              href="https://twitter.com/lexeblaze"
              target="_blank"
              rel="noreferrer"
              className="bolu"
            >
              <img src={beerus} alt="img" />
              <p>Bolu</p>
              <p>Marketing</p>
            </a>
          </div>
        </div>

        <SectionFive />
        <SectionSix />
      </div>
    </div>
  );
};

export default AboutUs;
