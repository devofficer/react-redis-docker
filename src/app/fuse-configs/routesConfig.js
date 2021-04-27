import React from 'react';
import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import ExperienceConfig from 'app/main/experience/ExperienceConfig';
import EducationConfig from 'app/main/education/EducationConfig';
import RandomNumberConfig from 'app/main/random-number/RandomNumberConfig';

const routeConfigs = [ExperienceConfig, EducationConfig, RandomNumberConfig];

const routes = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs),
	{
		path: '/',
		component: () => <Redirect to="/experience" />
	}
];

export default routes;
