import React from 'react';
import queryString from 'query-string';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ImageList from './components/imageList';
import MainImage from './components/MainImage';
import './styles/button.css';
import './styles/carousel.css';
import './styles/foreground.css';
import './styles/icons.svg';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'default',
      images: [{
        small: '',
        large: '',
        zoom: '',
      }],
      selected: 0,
      mainIndex: 0,
      carouselStart: 0,
    };
    this.selectImage = this.selectImage.bind(this);
    this.imageMouseEnter = this.imageMouseEnter.bind(this);
    this.imageMouseLeave = this.imageMouseLeave.bind(this);
    this.changeMainImage = this.changeMainImage.bind(this);
    this.slideCarousel = this.slideCarousel.bind(this);
  }

  componentDidMount() {
    const { location: { search } } = this.props;
    const params = queryString.parse(search);
    console.log(params);
    fetch(`/images?id=${params.prod_id}`, {
      method: 'get',
    })
      .then((response) => response.json())
      .then((jsonData) => {
        console.log(jsonData);
        this.setState({
          name: jsonData.name,
          images: jsonData.images,
        });
      });
  }

  selectImage(e) {
    const imageID = Number(e.target.id);
    this.setState({
      selected: imageID,
      mainIndex: imageID,
    });
  }

  imageMouseEnter(e) {
    const imageID = Number(e.target.id);
    this.setState({
      mainIndex: imageID,
    });
  }

  imageMouseLeave() {
    const { selected } = this.state;
    this.setState({
      mainIndex: selected >= 0 ? selected : 0,
    });
  }

  changeMainImage(e) {
    const { selected, carouselStart } = this.state;
    let newSelected = 0;
    let newStart = carouselStart;
    if (e.target.id === 'next') {
      newSelected = selected + 1;
    } else {
      newSelected = selected - 1;
    }
    if (newSelected < carouselStart) {
      newStart = carouselStart - 1;
    } else if (newSelected >= carouselStart + 6) {
      newStart = carouselStart + 1;
    }
    this.setState({
      selected: newSelected,
      mainIndex: newSelected,
      carouselStart: newStart,
    });
  }

  slideCarousel(e) {
    const { images, carouselStart } = this.state;
    let newStart = 0;
    if (e.target.id === 'next') {
      newStart = Math.min(carouselStart + 6, images.length - 6);
    } else {
      newStart = Math.max(carouselStart - 6, 0);
    }
    this.setState({
      carouselStart: newStart,
    });
  }

  render() {
    const {
      images,
      name,
      selected,
      mainIndex,
      carouselStart,
    } = this.state;
    const imgString = images[mainIndex];
    const numOfImages = images.length;
    console.log(imgString);
    return (
      <Container>
        <GalleryContainer>
          <MainImage
            name={name}
            image={imgString.large}
            zoomImage={imgString.zoom}
            changeImage={this.changeMainImage}
            numOfImages={numOfImages}
            selected={selected}
          />
          <PhotoPickerDiv>
            <ImageList
              images={images}
              selectImage={this.selectImage}
              selected={selected}
              mouseEnter={this.imageMouseEnter}
              mouseLeave={this.imageMouseLeave}
              carouselStart={carouselStart}
              slideCarousel={this.slideCarousel}
            />
          </PhotoPickerDiv>
        </GalleryContainer>
        <ZoomContainer id="zoomContainer" />
        <ImageContainer id="zoomContainer">
          <PanelImage src="https://fec-product-images.s3.us-east-2.amazonaws.com/eBay_panel.png" />
        </ImageContainer>
      </Container>
    );
  }
}

export default App;

const Container = styled.div`
  width: 90%;
  background: #f8f8f8;
  margin: 5%;
  position: relative;
`;

const GalleryContainer = styled.div`
  width: 500px;
  background: #f8f8f8;
  float: left;
`;

const ZoomContainer = styled.div`
  background: #f8f8f8;
  float: left;
  width: 0;
  margin-left: 10px;
  z-index: 1;
`;

const ImageContainer = styled.div`
  float: left;
  width: 60%;
`;

const PanelImage = styled.img`
  max-width: 100%;
  height: auto;
  object-fit: contain;
`;

const PhotoPickerDiv = styled.div`
  height: 79px;
  margin-top: 20px;
  text-align: center;
  position: relative;
`;

App.propTypes = {
  location: PropTypes.objectOf(PropTypes.object).isRequired,
};
