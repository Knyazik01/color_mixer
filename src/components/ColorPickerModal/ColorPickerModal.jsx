import Modal from '../Modal';
import ColorPicker from '../ColorPicker';
import styles from './ColorPickerModal.module.scss';

const ColorPickerModal = ({ closeModal, onSelect, initColor }) => (
  <Modal
    onBackDropClick={closeModal}
    className={styles.modal}
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