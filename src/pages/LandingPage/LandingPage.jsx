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
		<div style={{ width: '100%', display: 'flex', flexDirection: 'column',alignItems: 'center' }}>
			<SectionOne />
			<SectionTwo />
			<SectionThree />
			<SectionFour />
			<SectionFive />
			<SectionSix />
		</div>
	);
};

export default LandingPage;
