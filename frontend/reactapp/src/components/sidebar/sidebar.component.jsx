import React from 'react';
import '../../profile.css';
import { signOut } from 'firebase/auth';
import { auth} from '../../firebase';
import { useEffect, useState } from 'react';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import TuneIcon from '@mui/icons-material/Tune';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selector';





const SideBar = () => {
    const currentUser = useSelector(selectCurrentUser);
  return (


    
			<div className='profile'>
            <img src={require('../../logo.png')} width='70%' height='14%' alt='Logo' />

            <br />
            <br />
            <AccountCircleRoundedIcon sx={{ fontSize: 35 }} />

            <br />
            <h4 id='user-id'>
                <strong> </strong>
                {currentUser?.email}
            </h4>

            {/* <hr /> */}

            <div>
                <a id='pagelinks' href='/home'>
                    <button type='button' id='home'>
                        <HomeRoundedIcon id='icon' />
                        <p>Home</p>
                    </button>
                </a>

                <a id='pagelinks' href='/pipeline'>
                    <button type='button' id='home'>
                        <TuneIcon id='icon' />
                        <p>Pipelines</p>
                    </button>
                </a>
                <a id='pagelinks' href='/results'>
                    <button type='button' id='home'>
                        <AssessmentIcon id='icon' />
                        <p>Results</p>
                    </button>
                </a>
                <a id='pagelinks' href='/settings'>
                    <button type='button' id='home'>
                        <SettingsRoundedIcon id='icon' />
                        <p>Settings</p>
                    </button>
                </a>

                {(currentUser?.role === 'admin' || currentUser?.role === "super") && (
                    <a id='pagelinks' href='/admin'>
                        <button type='button' id='home'>
                            <AdminPanelSettingsIcon id='icon' />
                            <p>Admin</p>
                        </button>
                    </a>
                )}
            </div>
            <br />
            {/* <hr /> */}

            <br />

            <a href='/login'>
                <button type='button' id='homelogout' onClick={() => signOut(auth)}>
                    <LogoutRoundedIcon id='iconlo' />
                    <p>Logout</p>
                </button>
            </a>

            <div className='sub_div'>
                {' '}
                <img
                    id='ABlogo'
                    src={require('../../AB.png')}
                    width='35%'
                    height='40%'
                    alt='Logo'
                />
            </div>
        </div>



  )
}

export default SideBar