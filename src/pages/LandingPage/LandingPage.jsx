import SectionOne from './SectionOne/SectionOne';
import SectionThree from './SectionThree/SectionThree';
import SectionTwo from './SectionTwo/SectionTwo';
import SectionFive from './SectionFive/SectionFive';
import SectionFour from './SectionFour/SectionFour';
import SectionSix from './SectionSix/SectionSix';
import useTitle from '../../utils/useTitle';

const LandingPage = () => {
	useTitle('Apexwallet');
	return (
		<>
			<SectionOne />
			<SectionTwo />
			<SectionThree />
			<SectionFour />
			<SectionFive />
			<SectionSix />
		</>
	);
};

export default LandingPage;
