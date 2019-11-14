import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ReactImageMagnify from 'react-image-magnify';

function MainImage({
  name,
  image,
  zoomImage,
  changeImage,
  numOfImages,
  selected,
}) {
  return (
    <>
      <MainPhotoDiv className="carousel carousel_container fluid__image-container">
        <button id="prev" onClick={changeImage} className="carousel__control carousel__control--prev" aria-label="Previous Slide - Top Products" disabled={selected === 0}>
          <svg aria-hidden="true" className="icon icon--chevron-left-small" focusable="false">
            <path d="M13.993 2.45L2.449 13.992 0 11.544 11.545 0l2.449 2.45h-.001zM2.449 9.096l11.545 11.545-2.449 2.45L0 11.546l2.449-2.45z" />
          </svg>
        </button>
        {/* <LargeImg src={image} /> */}
        <ReactImageMagnify {...{
          smallImage: {
            alt: name,
            isFluidWidth: true,
            src: image,
          },
          largeImage: {
            src: zoomImage,
            width: 1600,
            height: 1600,
          },
          enlargedImageContainerDimensions: {
            width: '200%',
            height: '150%',
          },
          enlargedImagePosition: 'beside',
          enlargedImagePortalId: 'zoomContainer',
          imageClassName: 'smallImage',
          }}
        />


        <button id="next" onClick={changeImage} className="carousel__control carousel__control--next" aria-label="Next Slide - Top Products" disabled={selected === numOfImages - 1}>
          <svg aria-hidden="true" className="icon icon--chevron-right-small" focusable="false">
            <path d="M0 20.502L11.469 9.036l2.433 2.432L2.433 22.936 0 20.502zm11.469-6.601L0 2.433 2.433 0l11.469 11.469-2.433 2.433v-.001z" />
          </svg>
        </button>
      </MainPhotoDiv>
    </>
  );
}

export default MainImage;

const MainPhotoDiv = styled.div`
  border: 1px solid #ccc;
  background: #f8f8f8;
  background-color: white;
  background-size: contain;
  min-width: 500px;
  height: 500px;
  text-align: center;
  vertical-align: middle;
  display: table-cell;
  `;

const LargeImg = styled.img`
  max-width: 500px;
  max-height: 500px;
  width: auto;
  height: auto;
`;

MainImage.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  zoomImage: PropTypes.string.isRequired,
  changeImage: PropTypes.func.isRequired,
  numOfImages: PropTypes.number.isRequired,
  selected: PropTypes.number.isRequired,
};
