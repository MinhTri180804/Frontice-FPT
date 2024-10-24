import React from 'react';
import { paths } from '../constant';
import { HomeIcon, ChartPieIcon, AcademicCapIcon, CommandLineIcon, Cog6ToothIcon, UserCircleIcon } from '@heroicons/react/24/outline';

export interface MenuItem {
  label: string;
  path: string;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  children?: MenuItem[];
}

const createMenuItem = (
  label: string,
  path: string,
  icon?: React.FC<React.SVGProps<SVGSVGElement>>,
  children?: MenuItem[],
): MenuItem => ({
  label,
  path,
  icon,
  children,
});

const menuItems: MenuItem[] = [
  createMenuItem('Home', paths.home, HomeIcon),
  createMenuItem('Statistic', paths.statistic, ChartPieIcon),
  createMenuItem('Challenge', 'challenge', undefined, [
    createMenuItem('Challenges system', paths.challenges, AcademicCapIcon),
    createMenuItem('Challenges recruiter', paths.challengesRecruiter, AcademicCapIcon),
  ]),
  createMenuItem('Solution', 'solution', undefined, [
    createMenuItem('Solutions', paths.solutions, CommandLineIcon),
    createMenuItem('My solutions', paths.mySolutions, CommandLineIcon),
  ]),
  createMenuItem('Information', 'information', undefined, [
    createMenuItem('Profile', paths.profile, UserCircleIcon),
    createMenuItem('Setting', paths.setting, Cog6ToothIcon),
  ]),
];

export default menuItems;
