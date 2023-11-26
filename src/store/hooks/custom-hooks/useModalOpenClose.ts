import { useCallback, useState } from "react";

const useModalOpenClose = (initialModalActive: boolean = false) => {
  const [isModalActive, setModalActive] = useState(initialModalActive);

  const handleModalOpen = useCallback(() => {
    setModalActive(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setModalActive(false);
  }, []);

  return { isModalActive, handleModalOpen, handleModalClose };
};

export default useModalOpenClose;
