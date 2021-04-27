import RandomNumber from './RandomNumber';

const RandomNumberConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/random-number',
			component: RandomNumber
		}
	]
};

export default RandomNumberConfig;