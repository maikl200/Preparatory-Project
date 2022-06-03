import React, {useEffect} from 'react';

import style from './catalogMore.module.css'

import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import Header from "../Header/Header";
import {asyncGetAPI} from "../../redux/action";
import Loader from "../Loader/Loader";
import {RootState} from "../../redux/store";
import {AsyncGetApi} from "../../redux/actionTypes";


const CatalogMore = () => {
  const navigate = useNavigate()
  const auth = useSelector<RootState>((state) => state.authReducer)
  const location = useLocation()
  const dispatch = useDispatch()
  const beerCards = useSelector<RootState>((state) => state.APIReducer) as AsyncGetApi[]
  const thisBeerCard = beerCards.find((beer) => location.hash === `#${beer.id}`)

  useEffect(() => {
    if (!auth) navigate('/authorization')
  }, [auth])

  useEffect(() => {
    dispatch(asyncGetAPI())
  }, [thisBeerCard])
  return (
    <>
      <Header/>
      {thisBeerCard ?
        <main className={style.main}>
          <div className={style.moreInf}>
            <div className={style.img}>
              <img src={thisBeerCard.image_url} alt='beer'/>
            </div>
            <div className={style.description}>
              <span>{thisBeerCard.name}</span>
              <div className={style.descriptionMore}>
                <span>{thisBeerCard.description}</span>
                <span>Обьем: {thisBeerCard.volume.value} {thisBeerCard.volume.unit}</span>
                <ul>
                  <span>Сочетание:</span>
                  {thisBeerCard.food_pairing.map((foodPairing: string, index: number) =>
                    <li key={index}>{foodPairing}</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </main>
        :
        <Loader/>
      }

    </>
  );
};

export default CatalogMore;