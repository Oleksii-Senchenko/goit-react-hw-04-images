import React, { useState, useEffect } from 'react';

import ModalContext from 'context';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import getImage from '../Api/Api';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [modalShown, setModalShown] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [buttonVisible, setButtonVisible] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
   if (page === 1 && searchQuery === '') {
     return;
   }

    const takeValue = async () => {
      setLoader(true);
      try {
        const { hits, totalHits } = await getImage(searchQuery, page);

        setImages(prevImages => [...prevImages, ...hits]);
        setButtonVisible(page < Math.ceil(totalHits / 12));
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoader(false);
      }
    };
    takeValue();
  }, [page, searchQuery]);

  const onChange = value => {
    setPage(1);
    setImages([]);
    setSearchQuery(value);
  };

  const toogleModal = () => {
    setModalShown(!modalShown);
  };

  const getLargeImage = largeImage => {
    setLargeImage(largeImage);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div>
      <ModalContext.Provider
        value={{
          toogleModal: toogleModal,
          getLargeImage: getLargeImage,
        }}
      >
        <Searchbar onChange={onChange} />
        <ImageGallery images={images} />
        {loader && <Loader />}
        {buttonVisible && <Button loadMore={loadMore} />}
        {modalShown && (
          <Modal toogleModal={toogleModal} largeImage={largeImage} />
        )}
      </ModalContext.Provider>
    </div>
  );
}

export default App;
