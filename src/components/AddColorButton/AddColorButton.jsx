import { useState } from 'react';
import ColorPickerModal from '../ColorPickerModal';
import { addNewColor } from '../../helpers';
import Button from '../Button';
import { ReactComponent as Paint } from '../../assets/icons/paint.svg';
import styles from './AddColorButton.module.scss';
import { MESSAGES } from '../../constants';

const AddColorButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = (isOpen = !isModalOpen) => {
    setIsModalOpen(isOpen);
  };

  const addColor = (color) => {
    const addStatus = addNewColor(color);
    if (addStatus === MESSAGES.SUCCESS) {
      toggleModal(false);
    } else {
      alert(addStatus);
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
    </>

  );
};

export default AddColorButton;