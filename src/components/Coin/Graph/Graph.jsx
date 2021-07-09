import { AreaChart, Tooltip, Area, ResponsiveContainer } from 'recharts';
import moment from 'moment';

const Graph = ({ graphData, days, coinInfoId }) => {

	const pickColor = (coinInfoId) => {
		switch (coinInfoId) {
			case 'bitcoin':
				return '#fb8c00';
			case 'ethereum':
				return '#424242';
			case 'litecoin':
				return '#3c3c3d';
			case 'dash':
				return '#42a5f5';
			case 'tron':
				return '#b71c1c';
			case 'ethereum-classic':
				return '#1b5e20';
			case 'uniswap':
				return '#d81b60';
			case 'bitcoin-cash':
				return '#00897b';
			case 'tether':
				return '#00897b';
			case 'usd-coin':
				return '#0277bd';
			case 'polkadot':
				return '#3c3c3d';
			case 'ripple':
				return '#3c3c3d';
			case 'dogecoin':
				return '#fbc02d';
			case 'cardano':
				return '#1976d2';
			case 'binancecoin':
				return '#ffc107';
			case 'decentraland':
				return '#e64a19';
			case 'shia-inu':
				return '#f90201';
			case 'solana':
				return '#7b1fa2';
			case 'stellar':
				return '#212121';
			case 'chainlink':
				return '#315acb';
			default:
				return '#424242';
		}
	};

	const pickSubColor = (coinInfoId) => {
		switch (coinInfoId) {
			case 'bitcoin':
				return '#FEF4D8';
			case 'ethereum':
				return '#e0e0e0';
			case 'litecoin':
				return '#d3d3d3';
			case 'dash':
				return '#bbdefb';
			case 'tron':
				return '#ffcdd2';
			case 'ethereum-classic':
				return '#c8e6c9';
			case 'uniswap':
				return '#f8bbd0';
			case 'bitcoin-cash':
				return '#b2dfdb';
			case 'tether':
				return '#b2dfdb';
			case 'usd-coin':
				return '#b3e5fc';
			case 'polkadot':
				return '#d3d3d3';
			case 'ripple':
				return '#d3d3d3';
			case 'dogecoin':
				return '#fff9c4';
			case 'cardano':
				return '#bbdefb';
			case 'binancecoin':
				return '#ffecb3';
			case 'decentraland':
				return '#ffccbc';
			case 'shia-inu':
				return '#fca501';
			case 'solana':
				return '#e1bee7';
			case 'stellar':
				return '#bdbdbd';
			case 'chainlink':
				return '#bbdefb';
			default:
				return '#e0e0e0';
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
