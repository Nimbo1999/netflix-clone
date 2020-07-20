import React from 'react';
import { Link } from 'react-router-dom';

import './style.scss';

const Page404 = () => {
  return (
    <div className="page-404-container">
      <div className="image-404">
        <img src="https://i.imgur.com/FOeYt4E.png" alt="Page Not Found" />
      </div>
      <h1>Page not Found 404</h1>
      <p>
        A página que você estava procurando não existe, e ou trocou de endereço.
      </p>
      <Link to="/" className="link-button">
        Página inicial
      </Link>
    </div>
  );
};

export default Page404;
