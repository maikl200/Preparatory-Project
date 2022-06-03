import React, {useEffect, useState} from 'react';

import {useForm} from 'react-hook-form'
import {useNavigate} from "react-router-dom";

import style from './authorization.module.css'
import TextField from '@mui/material/TextField';


import {useDispatch, useSelector} from "react-redux";
import {RegUser, UserList} from "../../redux/actionTypes";
import ButtonUI from "../../UI/Button/ButtonUI";
import {RootState} from "../../redux/store";
import {UserReg} from '../../redux/action';

const Authorization = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [repeatPassword, setRepeatPassword] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [valueEmail, setValueEmail] = useState<string>('')

  const auth = useSelector<RootState>((state) => state.authReducer)
  const users = useSelector<RootState>((state) => state.userReducer) as RegUser[]
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

  const usersCreate = (users: UserList[], data: RegUser) => {
    const emailInDatabases = users.find((user) => {
      return user.email === data.email
    })
    if (emailInDatabases) {
      setError('Такой пользователь есть')
      return;
    }
    const newUsers = [
      ...users,
      data
    ]
    dispatch(UserReg(newUsers))
    setError('')
    navigate('/login')
  }

  const onSubmit = (data: RegUser) => {
    if (users) {
      usersCreate(users, data)
    } else {
      dispatch(UserReg([data]))
      navigate('/login')
    }
  }

  useEffect(() => {
    if (auth) navigate('/catalog')
  }, [auth])

  return (
    <main className={style.main}>
      <div className={style.loginBlock}>
        <form className={style.authorization} onSubmit={handleSubmit(onSubmit)}>
          <span className={style.title}>Регистрация</span>
          <span className={style.errorReg}>{error}</span>
          <TextField
            label="ФИО" variant="outlined"
            {...register('fio', {
              required: 'Это поле обязательно для заполнения',
              pattern: {
                value: /^[А-ЯЁ][а-яё]*(-[А-ЯЁ][а-яё]*)?\s[А-ЯЁ][а-яё]*\s[А-ЯЁ][а-яё]*$/,
                message: 'Введите ФИО'
              }
            })}/>

          <div
            className={style.wrapper}>{errors?.fio &&
              <span className={style.error}>{errors?.fio?.message}</span>}
          </div>

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
          <div className={style.wrapper}>{errors?.email &&
              <span className={style.error}>{errors?.email?.message}</span>}</div>

          <TextField
            id="password"
            label="Пароль"
            defaultValue={password}
            variant="outlined"
            type={'password'}
            {...register('password', {
              required: 'Это поле обязательно для заполнения',
              onChange: (e) => {
                setPassword(e.target.value)
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

          <TextField
            id="repeatPassword"
            label="Потдверждение пароля"
            defaultValue={repeatPassword}
            variant="outlined"
            type={'password'}
            {...register('repeatPassword', {
              onChange: (e) => {
                setRepeatPassword(e.target.value)
              },
              required: 'Это поле обязательно для заполнения',
              validate: value => value === password,
            })}/>

          <div
            className={style.wrapper}>
            {errors?.repeatPassword &&
                <span className={style.error}>{errors?.repeatPassword?.message || 'Поле не совпадает'}</span>}
          </div>

          <TextField
            label="Дата рождения"
            type={'text'}
            variant="outlined"
            {...register('dateOfBirth', {
              required: 'Это поле обязательно для заполнения',
              pattern: {
                value: /^(0[1-9]|[12]\d|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/,
                message: 'Дата введена неверно'
              }
            })}
          />

          <div className={style.wrapper}>{errors?.dateOfBirth &&
              <span className={style.error}>{errors?.dateOfBirth?.message}</span>}
          </div>

          <ButtonUI
            onClick={() => onSubmit}
            disabled={!isValid}
            title={'Зарегистрироваться'}
          />

          <span
            className={style.linkLogIn}>У вас уже есть аккаунт?
            <span onClick={() => navigate('/login')}>Войти</span>
          </span>
        </form>
        <div>
        </div>
      </div>
    </main>
  );
};

export default Authorization;