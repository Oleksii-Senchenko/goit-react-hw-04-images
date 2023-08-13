import React, { useEffect } from 'react';

import { BackDrop } from './Modal.styled';
import { MadalFace } from './Modal.styled';

function Modal({ toogleModal, largeImage }) {


  useEffect(() => {
    window.addEventListener('keydown', colseonEsc);

    return () => {
      window.removeEventListener('keydown', colseonEsc);
    };
  });



  const colseonEsc = ({ code }) => {
    if (code === 'Escape') {
      toogleModal();
    }
  };

  const closeOnClickBackDrop = e => {
    if (e.currentTarget === e.target) {
      toogleModal();
    }
  };

  return (
    <BackDrop onClick={closeOnClickBackDrop}>
      <MadalFace>
        <img src={largeImage} alt="" />
      </MadalFace>
    </BackDrop>
  );
}

export default Modal;
