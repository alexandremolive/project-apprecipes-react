import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import shareIcon from '../../images/shareIcon.svg';
import Header from '../../components/header';
import './index.css';

export default function RecipesDone() {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  const [filterRecipes, setFilterRecipes] = useState(doneRecipes);
  const [clipBoardFood, setClipBoardFood] = useState(false);
  const [clipBoardDrink, setClipBoardDrink] = useState(false);

  function buttonsFilters(param) {
    if (param === 'all') {
      setFilterRecipes(doneRecipes && doneRecipes.filter(({ type }) => type));
    }
    if (param === 'food') {
      setFilterRecipes(doneRecipes
        && doneRecipes.filter(({ type }) => type === 'comida'));
    } if (param === 'drinks') {
      setFilterRecipes(doneRecipes
        && doneRecipes.filter(({ type }) => type === 'bebida'));
    }
  }

  function clipBoard(type, id) {
    copy(`http://localhost:3000/${type}s/${id}`);
    if (type === 'comida') {
      setClipBoardFood(true);
    } if (type === 'bebida') {
      setClipBoardDrink(true);
    }
  }

  return (
    <>
      <Header title="Receitas Feitas" isSearch={ false } />
      <nav>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => buttonsFilters('all') }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => buttonsFilters('food') }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => buttonsFilters('drinks') }
        >
          Drinks
        </button>
      </nav>
      {filterRecipes && filterRecipes
        .map(
          ({ id, image, category, name, doneDate, tags, type,
            area, alcoholicOrNot }, index) => (
            type === 'comida'
              ? (
                <div
                  key={ id }
                >
                  <Link to={ `/${type}s/${id}` }>
                    <img
                      className="images"
                      src={ image }
                      alt="imagem-receive"
                      data-testid={ `${index}-horizontal-image` }
                    />
                    <p data-testid={ `${index}-horizontal-name` }>{name}</p>
                  </Link>
                  <p data-testid={ `${index}-horizontal-top-text` }>
                    {`${area} - ${category}`}
                  </p>
                  <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>
                  <p data-testid={ `${index}-${tags[0]}-horizontal-tag` }>
                    {tags[0]}
                  </p>
                  <p data-testid={ `${index}-${tags[1]}-horizontal-tag` }>
                    {tags[1]}
                  </p>
                  <button type="button" onClick={ () => clipBoard(type, id) }>
                    <img
                      data-testid={ `${index}-horizontal-share-btn` }
                      src={ shareIcon }
                      alt="share button"
                    />
                  </button>
                  <span>{clipBoardFood === true ? 'Link copiado!' : null}</span>
                </div>)
              : (
                <div key={ id }>
                  <Link to={ `/${type}s/${id}` }>
                    <img
                      className="images"
                      src={ image }
                      alt="imagem-receive"
                      data-testid={ `${index}-horizontal-image` }
                    />
                    <p data-testid={ `${index}-horizontal-name` }>{name}</p>
                  </Link>
                  <p data-testid={ `${index}-horizontal-top-text` }>{alcoholicOrNot}</p>
                  <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>
                  <button type="button" onClick={ () => clipBoard(type, id) }>
                    <img
                      data-testid={ `${index}-horizontal-share-btn` }
                      src={ shareIcon }
                      alt="share button"
                    />
                  </button>
                  <span>{clipBoardDrink === true ? 'Link copiado!' : null}</span>
                </div>)
          ),
        )}
    </>
  );
}
