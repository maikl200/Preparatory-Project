import React, {useEffect} from 'react';

import Header from "../Header/Header";
import {useNavigate} from "react-router-dom";

import style from './catalog.module.css'

import {useDispatch, useSelector} from "react-redux";
import {asyncGetAPI} from "../../redux/action";
import BeerCard from "../BeerCard/BeerCard";
import {RootState} from "../../redux/store";
import {AsyncGetApi} from "../../redux/actionTypes";

const Catalog = () => {
  const auth = useSelector<RootState>((state) => state.authReducer)
  const beerCards = useSelector<RootState>((state) => state.APIReducer) as AsyncGetApi[]
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!auth) navigate('/authorization')
  }, [auth])

  useEffect(() => {
    dispatch(asyncGetAPI())
  }, [])

  return (
    <>
      <Header/>
      <main className={style.main}>
        {beerCards.map((resolve: AsyncGetApi) =>
          <BeerCard
            volume={resolve.volume}
            image_url={resolve.image_url}
            food_pairing={resolve.food_pairing}
            id={resolve.id}
            name={resolve.name}
            description={resolve.description}
            key={resolve.id}
          />
        )}
      </main>
    </>
  );
};

export default Catalog;