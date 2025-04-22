import { Fragment } from "react";
import { useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';
import { ButtonTooltip } from "./button-tooltip.tsx";
import { BillingIcon, DashboardIcon, VehicleIcon } from "./icons.tsx";
import bobsLogo from '../assets/clientLogos/bobs.png'

interface NavItemProps {
  icon: React.ReactNode;
  label?: string;
  to: string;
  onClick?: () => void;
}

const mainNavigationWithBenchmarking: NavItemProps[] = [
  {
    icon: <DashboardIcon className="menuIcon" />,
    to: '/',
    label: 'Dashboard'
  },
  {
    icon: <VehicleIcon className="menuIcon" />,
    to: '/yourFleet',
    label: 'Your Fleet'
  },
  {
    icon: <BillingIcon className="menuIcon" />,
    to: '/billingHistory',
    label: 'Billing History'
  }
];

export function MainMenu() {
  const isMobile: boolean = window.matchMedia("(max-width: 576px)").matches;
  const currentNavLocation = useLocation();

  let activeUrlRoute =
    currentNavLocation.pathname.split('/')[1] !== ''
      ? currentNavLocation.pathname.split('/')[1]
      : '/';

  return (
    <Fragment>
      <div className="mainNavContainer">
        <div className="companyLogo">
          <NavLink className="navItem" to="/">
            <img className="logo" src={bobsLogo} alt="Company" />
          </NavLink>
        </div>
        <div className="mainNavItems">
          {mainNavigationWithBenchmarking?.map((item, index) => (
            <ButtonTooltip key={index} type="micro" placement={isMobile ? "top" : "right"} data={`${item.label}`}>
              <NavLink
                end
                to={item.to}
                className={
                  'navItem ' + (activeUrlRoute === (item.to?.substring(1) || '/') ? 'active' : '')
                }
              >
                {item?.icon}
              </NavLink>
            </ButtonTooltip>
          ))}
        </div>
      </div>
    </Fragment>
  );
}
