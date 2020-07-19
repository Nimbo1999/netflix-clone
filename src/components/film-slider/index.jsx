/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import SliderContext from './context';
import Item from './item';

import useSliding from './useSliding';
import useSizeElement from './useSizeElement';

import './style.scss';

const FilmSlider = ({ children, categoryType }) => {
  const { width, elementRef } = useSizeElement();

  const {
    containerRef,
    handleNext,
    handlePrev,
    hasNext,
    hasPrev,
    slideProps,
  } = useSliding(width, React.Children.count(children));

  const contextValue = {
    elementRef,
  };

  return (
    <SliderContext.Provider value={contextValue}>
      <div className="film-slider-container">
        {categoryType ? (
          <div className="slide-title">
            <h3>{categoryType}</h3>
          </div>
        ) : null}

        <div className="slider-container">
          {hasPrev && (
            <button type="button" className="btn prev" onClick={handlePrev}>
              <FontAwesomeIcon icon={faChevronLeft} size="2x" />
            </button>
          )}

          {hasNext && (
            <button type="button" className="btn next" onClick={handleNext}>
              <FontAwesomeIcon icon={faChevronLeft} rotation={180} size="2x" />
            </button>
          )}

          <div className="slider" ref={containerRef} {...slideProps}>
            {children}
          </div>
        </div>
      </div>
    </SliderContext.Provider>
  );
};

FilmSlider.Item = Item;

export default FilmSlider;
