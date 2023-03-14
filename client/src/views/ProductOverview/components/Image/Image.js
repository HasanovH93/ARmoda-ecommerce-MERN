import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import 'react-image-lightbox/style.css';
import Lightbox from 'react-image-lightbox';

const Image = ({ images, title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const handleImageClick = (index) => {
    setIsOpen(true);
    setPhotoIndex(index);
  };

  return (
    <>
      <Grid container spacing={2} sx={{ height: 1 }}>
        {images.map((item, i) => (
          <Grid key={i} item xs={i === 0 ? 12 : 6}>
            <Box
              sx={{
                display: 'flex',
                height: 1,
                '& img': {
                  width: 1,
                  height: 1,
                  objectFit: 'cover',
                  borderRadius: 2,
                  cursor: 'pointer',
                },
              }}
            >
              <img
                src={item}
                alt={title}
                loading={'lazy'}
                onClick={() => handleImageClick(i)}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
      {isOpen && (
        <Lightbox
          mainSrc={images[photoIndex]}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() => setPhotoIndex((photoIndex + images.length - 1) % images.length)}
          onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % images.length)}
        />
      )}
    </>
  );
};

Image.propTypes = {
  images: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

export default Image;