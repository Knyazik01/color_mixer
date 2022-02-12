// import styles from './ColorPickerModal.module.scss';

import Modal from '../Modal';
import ColorPicker from '../ColorPicker';

const ColorPickerModal = ({closeModal, onSelect, initColor}) => (
  <Modal
    onBackDropClick={closeModal}
  >
    <ColorPicker
      onSelect={(color) => {
        onSelect(color);
        closeModal();
      }}
      initColor={initColor}
    />
  </Modal>
);

export default ColorPickerModal;