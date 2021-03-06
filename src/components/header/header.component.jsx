import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { auth } from '../../firebase/firebase.utils';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import './header.styles.scss';

const Header = ({ currentUser }) => (
  <div className='header'>
    <Link className='logo-container' to='/'>
      <Logo className='logo' />
    </Link>
    <div className='options'>

      <Link className='option' to='/clients'>
        CLIENTS
      </Link>
      {currentUser ? (
        <div className="userDropdown">{currentUser.displayName}
          <div className="userDropdownContent">
            <div><a>Edit User</a></div>
            <div className='option' onClick={() => auth.signOut()}>
              SIGN OUT
        </div>
          </div>
        </div>
      ) : (
          <Link className='option' to='/signin'>
            SIGN IN
          </Link>
        )}
    </div>
  </div>
);

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(Header);
