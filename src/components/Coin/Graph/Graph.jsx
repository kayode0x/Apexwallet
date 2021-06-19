import { AreaChart, Tooltip, Area, ResponsiveContainer } from 'recharts';
import moment from 'moment';

const Graph = ({ graphData, days, coinInfoId }) => {
	let mainColor;
	let subColor;

	const pickColor = (coinInfoId) => {
		if (coinInfoId === 'bitcoin') {
			mainColor = '#fb8c00';
			return mainColor;
		} else if (coinInfoId === 'ethereum') {
			mainColor = '#424242';
			return mainColor;
		} else if (coinInfoId === 'litecoin') {
			mainColor = '#3c3c3d';
			return mainColor;
		} else if (coinInfoId === 'dash') {
			mainColor = '#42a5f5';
			return mainColor;
		} else if (coinInfoId === 'tron') {
			mainColor = '#b71c1c';
			return mainColor;
		} else if (coinInfoId === 'ethereum-classic') {
			mainColor = '#1b5e20';
			return mainColor;
		} else if (coinInfoId === 'uniswap') {
			mainColor = '#d81b60';
			return mainColor;
		} else if (coinInfoId === 'bitcoin-cash') {
			mainColor = '#00897b';
			return mainColor;
		} else if (coinInfoId === 'tether') {
			mainColor = '#00897b';
			return mainColor;
		} else if (coinInfoId === 'usd-coin') {
			mainColor = '#0277bd';
			return mainColor;
		} else if (coinInfoId === 'polkadot') {
			mainColor = '#3c3c3d';
			return mainColor;
		} else if (coinInfoId === 'ripple') {
			mainColor = '#3c3c3d';
			return mainColor;
		} else if (coinInfoId === 'dogecoin') {
			mainColor = '#fbc02d';
			return mainColor;
		} else if (coinInfoId === 'cardano') {
			mainColor = '#1976d2';
			return mainColor;
		} else if (coinInfoId === 'binancecoin') {
			mainColor = '#ffc107';
			return mainColor;
		} else if (coinInfoId === 'decentraland') {
			mainColor = '#e64a19';
			return mainColor;
		} else if (coinInfoId === 'shia-inu') {
			mainColor = '#f90201';
			return mainColor;
		} else if (coinInfoId === 'solana') {
			mainColor = '#7b1fa2';
			return mainColor;
		} else if (coinInfoId === 'stellar') {
			mainColor = '#212121';
			return mainColor;
		} else if (coinInfoId === 'chainlink') {
			mainColor = '#315acb';
			return mainColor;
		}
	};

	const pickSubColor = (coinInfoId) => {
		if (coinInfoId === 'bitcoin') {
			subColor = '#FEF4D8';
			return subColor;
		} else if (coinInfoId === 'ethereum') {
			subColor = '#e0e0e0';
			return subColor;
		} else if (coinInfoId === 'litecoin') {
			subColor = '#d3d3d3';
			return subColor;
		} else if (coinInfoId === 'dash') {
			subColor = '#bbdefb';
			return subColor;
		} else if (coinInfoId === 'tron') {
			subColor = '#ffcdd2';
			return subColor;
		} else if (coinInfoId === 'ethereum-classic') {
			subColor = '#c8e6c9';
			return subColor;
		} else if (coinInfoId === 'uniswap') {
			subColor = '#f8bbd0';
			return subColor;
		} else if (coinInfoId === 'bitcoin-cash') {
			subColor = '#b2dfdb';
			return subColor;
		} else if (coinInfoId === 'tether') {
			subColor = '#b2dfdb';
			return subColor;
		} else if (coinInfoId === 'usd-coin') {
			subColor = '#b3e5fc';
			return subColor;
		} else if (coinInfoId === 'polkadot') {
			subColor = '#d3d3d3';
			return subColor;
		} else if (coinInfoId === 'ripple') {
			subColor = '#d3d3d3';
			return subColor;
		} else if (coinInfoId === 'dogecoin') {
			subColor = '#fff9c4';
			return subColor;
		} else if (coinInfoId === 'cardano') {
			subColor = '#bbdefb';
			return subColor;
		} else if (coinInfoId === 'binancecoin') {
			subColor = '#ffecb3';
			return subColor;
		} else if (coinInfoId === 'decentraland') {
			subColor = '#ffccbc';
			return subColor;
		} else if (coinInfoId === 'shiba-inu') {
			subColor = '#fca501';
			return subColor;
		} else if (coinInfoId === 'solana') {
			subColor = '#e1bee7';
			return subColor;
		} else if (coinInfoId === 'stellar') {
			subColor = '#bdbdbd';
			return subColor;
		} else if (coinInfoId === 'chainlink') {
			subColor = '#bbdefb';
			return subColor;
		}
	};

	const CustomTooltip = ({ active, payload }) => {
		if (active && payload && payload.length) {
			return (
				<div className="custom-tooltip">
					{days === 1 ? (
						<p>{moment(payload[0].payload.date).format('ddd, hA')}</p>
					) : (
						<p>{moment(payload[0].payload.date).format('MMMM Do, YYYY')}</p>
					)}
					<p className="label">{`$ ${payload[0].value}`}</p>
				</div>
			);
		}

		return null;
	};

	return (
		<ResponsiveContainer width="100%" height="100%">
			<AreaChart
				height={60}
				width={200}
				data={graphData}
				margin={{
					top: days === 365 || days === 'max' ? 283 : 50,
					left: 0,
					bottom: days === 365 || days === 'max' ? 0 : -100,
				}}
			>
				{console.log(graphData)}
				<Tooltip content={<CustomTooltip />} />
				<Area
					type="monotone"
					dataKey="price"
					stroke={pickColor(coinInfoId)}
					fill={pickSubColor(coinInfoId)}
					strokeWidth={2}
					dot={false}
				/>
			</AreaChart>
		</ResponsiveContainer>
	);
};

export default Graph;
