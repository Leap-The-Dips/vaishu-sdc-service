import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import SmallImage from './smallImage';

function ImageList({
  images,
  selectImage,
  selected,
  mouseEnter,
  mouseLeave,
  carouselStart,
  slideCarousel,
}) {
  const listItems = [];
  const imgCount = Math.min(images.length, carouselStart + 6);

  for (let i = carouselStart; i < imgCount; i += 1) {
    listItems.push(
      <SmallImage
        key={i}
        image={images[i].small}
        id={i}
        selectImage={selectImage}
        selected={selected === i}
        mouseEnter={mouseEnter}
        mouseLeave={mouseLeave}
      />,
    );
  }

  return (
    <>
      <CarouselLeft id="prev" onClick={slideCarousel} disabled={carouselStart === 0} />
      <SelectorList>
        {listItems}
      </SelectorList>
      <CarouselRight id="next" onClick={slideCarousel} disabled={carouselStart + 6 >= images.length} />
    </>
  );
}

export default ImageList;

const SelectorList = styled.ul`
  list-style-type: none;
  padding-inline-start: 0px;
`;

const CarouselButton = styled.button`
  width: 8px;
  height: 12px;
  margin-top: 32px;
  background: blue;
  padding: 0px;
  position: absolute;
  display: inline-block;
  cursor: pointer;

  &:disabled {
    background: #767676;
    opacity: 0.3;
  }
`;

const CarouselLeft = styled(CarouselButton)`
  left: 3px;
`;

const CarouselRight = styled(CarouselButton)`
  right: 3px;
  top: 0;
`;

ImageList.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectImage: PropTypes.func.isRequired,
  mouseEnter: PropTypes.func.isRequired,
  mouseLeave: PropTypes.func.isRequired,
  selected: PropTypes.number.isRequired,
  slideCarousel: PropTypes.func.isRequired,
  carouselStart: PropTypes.number.isRequired,
};
