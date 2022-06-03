import React, {FC} from 'react';
import {useNavigate} from "react-router-dom";
import style from "../Catalog/catalog.module.css";
import ButtonUI from "../../UI/Button/ButtonUI";
import {AsyncGetApi} from "../../redux/actionTypes";

const BeerCard: FC<AsyncGetApi> = (resolve) => {
  const navigate = useNavigate()
  return (
    <div className={style.card}>
      <img className={style.img} src={resolve.image_url} alt='alcohol'/>
      <div className={style.description}>
        <span>{resolve.name}</span>
        <div className={style.moreInf}>
          <span>{resolve.description}</span>
        </div>
        <ButtonUI
          onClick={() => navigate(`/catalog/catalogMore#${resolve.id}`)}
          disabled={false}
          title={'Подробнее'}
        />
      </div>
    </div>
  );
};

export default BeerCard;