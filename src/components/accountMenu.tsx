import { Fragment, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { isUndefined } from "lodash";
import Cookies from "js-cookie";
import Dropdown from 'react-bootstrap/Dropdown';
import { DropdownMenu } from './dropdownMenu.tsx';
import { ThemeContextV2 } from "../context/themeContext.tsx";
import { VerticalDotsIcon } from "./icons.tsx";

export function AccountMenu() {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContextV2);
  const navigate = useNavigate();

  const userCookie = Cookies.get('userIdentity');
  const userObj = !isUndefined(userCookie) ? JSON.parse(userCookie) : null;

  const userSignOut = () => {
    Cookies.remove('userIdentity')
    navigate('/login');
  }

  return (
    <div className={`accountMenu`}>
      <DropdownMenu
        state={'default'}
        toggleType={'avatar'}
        buttonToggleTypeOption={'ghost'}
        avatar={userObj ? userObj.firstname + ' ' + userObj.surname : undefined}
        avatarToggleTypeOptions={'not present'}
        toggleSize={'sm'}
        icon={<VerticalDotsIcon className={`size-sm`} />}
      >
        <Fragment>
          <Dropdown.Menu align={'end'}>
            <Dropdown.Item as={'span'} className="bodyXSmall dropdownItemType-subHeader">
              <span className="bodyXSmall subHeader">Signed in as:</span>
              {userObj ? userObj.email : 'email not available'}
            </Dropdown.Item>
            <Dropdown.Divider className="menuDivider" />
            <Dropdown.Item className="bodyXSmall" onClick={toggleTheme.bind(null)}>
              {`Switch to ${!isDarkTheme ? 'Dark' : 'Light'} mode`}
            </Dropdown.Item>
            <Dropdown.Divider className="menuDivider" />
            <Dropdown.Item
              className="bodyXSmall"
              onClick={userSignOut}
            >
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Fragment>
      </DropdownMenu>
    </div>
  );
}
