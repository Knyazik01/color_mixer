import { useState } from 'react';
import ColorPickerModal from '../ColorPickerModal';
import { addNewColor } from '../../helpers';
import Button from '../Button';
import { ReactComponent as Paint } from '../../assets/icons/paint.svg';
import styles from './AddColorButton.module.scss';
import { STATUSES } from '../../constants';
import PopUpMessage from '../PopUpMessage';

const AddColorButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = (isOpen = !isModalOpen) => {
    setIsModalOpen(isOpen);
  };

  const [showPopUp, setShowPopUp] = useState(false);
  const [messageInfo, setMessageInfo] = useState({});

  const showMessagePopUp = (message, status) => {
    setMessageInfo({
      status,
      message,
    });
    setShowPopUp(true);
  };

  const addColor = (color) => {
    const { status, message } = addNewColor(color);
    if (status === STATUSES.SUCCESS) {
      toggleModal(false);
    } else {
      showMessagePopUp(message, status);
    }
  };
  return (
    <>
      <Button
        className={styles.content}
        onClick={() => toggleModal(true)}
      >
        <Paint />
        Add color
      </Button>
      {
        isModalOpen && (
          <ColorPickerModal
            onSelect={addColor}
            closeModal={() => toggleModal(false)}
          />
        )
      }
      {
        showPopUp && (
          <PopUpMessage
            {...messageInfo}
            hideMessage={() => setShowPopUp(false)}
          />
        )
      }
    </>

  );
};

export default AddColorButton;