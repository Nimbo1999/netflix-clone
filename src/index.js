import React from 'react';
import ReactDom from 'react-dom';
import './style.scss';
import cachorrinho from './assets/cachorrinho.jpg';

const wrapper = document.getElementById("root");

wrapper ?
  ReactDom.render(
    <div>
      <p>Olá Mundo</p>
      <img src={cachorrinho} alt='cachorrinho imagem' />
    </div>,
    wrapper
  )
:
  false