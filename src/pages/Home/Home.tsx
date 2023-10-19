import React, {FC, useState} from "react";
import Modal from "../../components/Modal"
const Home: FC = () => {
  const [isModalActive, setModalActive] = useState(false);

  const handleModalOpen = () => {
    setModalActive(true);
  };
  const handleModalClose = () => {
    setModalActive(false);
  };
  return (
      <div className="App">
        <h1>Custom modal component</h1>
        <button className="button" type="button" onClick={handleModalOpen}>
          open modal
        </button>
        <div>
          {isModalActive && (
              <Modal title="some modal title" onClose={handleModalClose}>
                Hello world
              </Modal>
          )}
        </div>
      </div>
)
};

export default Home;
