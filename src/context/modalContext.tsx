import React, { createContext, useState, useContext, ReactNode, ReactElement } from 'react';

interface ModalContextType {
  currentModal: string | null;
  isModalVisible: boolean;
  // showModal: (content: React.ReactNode) => void;
  showModal: (modalId: string) => void; // content: ReactNode
  hideModal: () => void;
  modalContent: React.ReactNode;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: React.ReactNode }): ReactElement => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentModal, setCurrentModal] = useState<string | null>(null);
  const [modalContent] = useState<ReactNode>(null);

  const showModal = (modalId: any) => {
    // setModalContent(content);
    setCurrentModal(modalId);
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setCurrentModal(null);
    setIsModalVisible(false);
    // setModalContent(null);
  };

  return (
    <ModalContext.Provider
      value={{ currentModal, isModalVisible, showModal, hideModal, modalContent }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
