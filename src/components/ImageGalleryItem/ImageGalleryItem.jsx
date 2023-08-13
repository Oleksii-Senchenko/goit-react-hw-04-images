import { React, useContext } from 'react';
import ModalContext from 'context';

import { ImageItem, ImageItemImage } from './ImageGalleryItem.styled';

function ImageGalleryItem({ id, webformatURL, largeImageURL, tags }) {
  const { toogleModal, getLargeImage } = useContext(ModalContext);
  const photoTranfer = () => {
    getLargeImage(largeImageURL);
    toogleModal();
  };

  return (
    <ImageItem onClick={photoTranfer}>
      <ImageItemImage src={webformatURL} tag={tags} />
    </ImageItem>
  );
}

export default ImageGalleryItem;
