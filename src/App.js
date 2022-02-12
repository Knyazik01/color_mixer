import { useState } from 'react';
import ColorPickerModal from './components/ColorPickerModal';
import './App.css';

const App = () => {
  const onColorSelect = (color) => {
    console.log(color);
  };
  const [isModalOpen, setIsModalOpen] = useState(true);
  const toggleModal = (isOpen = !isModalOpen) => {
    setIsModalOpen(isOpen);
  };

  return (
    <div className='App'>
      {
        isModalOpen && <ColorPickerModal
          onSelect={onColorSelect}
          closeModal={() => toggleModal(false)}
        />
      }
    </div>
  );
};

export default App;
