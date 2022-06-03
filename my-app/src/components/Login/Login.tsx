import React, {useEffect, useState} from 'react';
import TextField from "@mui/material/TextField";
import {useForm} from "react-hook-form";
import style from './login.module.css'

import {useNavigate} from "react-router-dom";
import {loginUsers} from "../../redux/action";
import {useDispatch, useSelector} from "react-redux";
import {ASYNC_GET_API, UserList, RegUser} from "../../redux/actionTypes";
import ButtonUI from "../../UI/Button/ButtonUI";
import {RootState} from "../../redux/store";

const Login = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const auth = useSelector<any>((state) => state.authReducer)
  const users = useSelector<RootState>((state) => state.userReducer) as RegUser[]
  const [valueEmail, setValueEmail] = useState<string>('')
  const [valuePassword, setValuePassword] = useState<string>('')
  const [error, setError] = useState<string>('')

  const {
    register,
    formState: {
      errors,
      isValid
    },
    handleSubmit,
  } = useForm<RegUser>({
    mode: 'all'
  })

  const onSubmit = () => {
    users.map((user: UserList) => {
      if (valueEmail === user.email && valuePassword === user.password) {
        localStorage.setItem('IS_AUTH', String(true))
        dispatch({type: ASYNC_GET_API})
        dispatch(loginUsers(true))
      } else {
        setError('Пользователь не найден')
      }
    })
  }

  useEffect(() => {
    if (auth) navigate('/catalog')
  }, [auth])

  return (
    <main className={style.wrapperLog}>
      <div className={style.loginBlock}>
        <form className={style.authorization} onSubmit={handleSubmit(onSubmit)}>
          <span className={style.title}>Авторизация</span>
          <span className={style.errorReg}>{error}</span>


          <TextField
            label="Email"
            defaultValue={valueEmail}
            type={'email'}
            variant="outlined"
            {...register('email', {
              required: 'Это поле обязательно для заполнения',
              onChange: (e) => {
                setValueEmail(e.target.value)
              },
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Это не email'
              }
            })}/>

          <div
            className={style.wrapper}>{errors?.email &&
              <span className={style.error}>{errors?.email?.message}</span>}
          </div>

          <TextField
            id="password"
            label="Пароль"
            defaultValue={valuePassword}
            variant="outlined"
            type={'password'}
            {...register('password', {
              required: 'Это поле обязательно для заполнения',
              onChange: (e) => {
                setValuePassword(e.target.value)
              },
              pattern: {
                value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\da-zA-Z!@#$%^&*]{6,}/,
                message: 'Неверно введен пароль'
              }
            })}/>

          <div
            className={style.wrapper}>
            {errors?.password && <span className={style.error}>{errors?.password?.message}</span>}
          </div>

          <ButtonUI
            onClick={() => onSubmit}
            disabled={!isValid}
            title={'Войти'}/>

          <span
            className={style.linkReg}>У вас нет аккаунта?
            <span onClick={() => navigate('/authorization')}>Зарегистрироваться</span>
          </span>
        </form>
      </div>
    </main>
  );
};

export default Login;