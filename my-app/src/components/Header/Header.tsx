import React from 'react';
import {useNavigate} from 'react-router-dom'
import './header.css'
import Button from '@mui/material/Button';
import SportsBarIcon from '@mui/icons-material/SportsBar';
import {useDispatch} from "react-redux";
import {loginUsers} from "../../redux/action";


const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const logOut = () => {
    navigate('/authorization')
    dispatch(loginUsers(false))
    localStorage.setItem('IS_AUTH', JSON.stringify(false))
  }


  return (
    <header className={'header'}>
      <div className={'nav'}>
        <div className={'logo'}>
          <SportsBarIcon
            fontSize={'large'}
          />
          <span>Beers</span>
        </div>
        <Button type='button' color='primary' onClick={() => navigate('/catalog')}
                variant="outlined">Ассортимент</Button>
        <Button type='button' color='error' onClick={logOut} variant="outlined">Выход</Button>
      </div>
    </header>
  );
};

export default Header;