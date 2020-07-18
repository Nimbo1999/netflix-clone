import React from 'react';

import Header from './components/header';
import Trending from './components/trending-container';
import FilmSlider from './components/film-slider';

const { Item } = FilmSlider;

const App = () => {
  return (
    <div>
      <Header />
      <Trending />
      <FilmSlider categoryType="Nome da Categoria aqui">
        <Item>1</Item>
        <Item>2</Item>
        <Item>3</Item>
        <Item>4</Item>
        <Item>5</Item>
        <Item>6</Item>
        <Item>7</Item>
        <Item>8</Item>
        <Item>9</Item>
        <Item>10</Item>
        <Item>11</Item>
        <Item>12</Item>
      </FilmSlider>
    </div>
  );
};

export default App;
