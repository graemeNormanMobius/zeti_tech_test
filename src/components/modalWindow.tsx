import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { isUndefined } from 'lodash';
import { useModal } from "../context/modalContext.tsx";
import { Button } from "./button.tsx";
import { CloseIcon } from "./icons.tsx";

interface ModalWindowProps {
  modalTriggerLabel: string;
  modalTitle: string | undefined;
  modalDesc: string | undefined;
  actionType: 'link' | 'button';
  modalSize: 'sm' | 'lg' | 'xl' | undefined;
  fullScreen: true | 'sm-down' | 'md-down' | 'lg-down' | 'xl-down' | 'xxl-down' | undefined;
  modalRef: string;
  showModalTrigger: boolean;
  modalTriggerLabelClass?: string;
  actionButtonType?:
    | 'accent'
    | 'primary'
    | 'secondary'
    | 'ghost'
    | 'ghostSecondary'
    | 'destructive';
  disableModalTrigger: boolean;
  children: React.ReactNode;
}

export function ModalWindow({
  modalTriggerLabel,
  modalTitle,
  modalDesc,
  actionType,
  modalSize,
  fullScreen,
  modalRef,
  // showModalTrigger,
  modalTriggerLabelClass,
  actionButtonType,
  disableModalTrigger,
  children
}: ModalWindowProps) {
  const { currentModal, showModal, hideModal } = useModal();

  return (
    <>
      {actionType === 'link' && (
        <>
          {disableModalTrigger && (
            <span
              className={`${modalTriggerLabelClass} ${disableModalTrigger ? ' editUnavailable ' : ''} bodySmallEmp`}
            >
              {modalTriggerLabel}
            </span>
          )}
          {!disableModalTrigger && (
            <span
              className={`${modalTriggerLabelClass} ${disableModalTrigger ? ' editUnavailable ' : ''} bodySmallEmp`}
              onClick={() => showModal(modalRef)}
            >
              {modalTriggerLabel}
            </span>
          )}
        </>
      )}
      {actionType === 'button' && (
        <Button
          className="bodySmall"
          value={modalTriggerLabel}
          type={actionButtonType ?? 'accent'}
          size={'md'}
          state={'default'}
          hasIcon={'noIcon'}
          onClick={() => showModal(modalRef)}
          isSubmit={false}
          icon={''}
        />
      )}
      <Modal
        dialogClassName="mobiusModalWindow light-mode" // light-mode passed as ALL modals should ALWAYS show using light-mode tokens
        show={currentModal === modalRef}
        onHide={hideModal}
        size={modalSize}
        fullscreen={fullScreen}
        centered
      >
        <div className="modalHeader">
          <div className="modalName bodyLargeEmp">{!isUndefined(modalTitle) && modalTitle}</div>
          <Button
            className="bodySmall"
            value={''}
            type={'ghost'}
            size={'sm'}
            state={'default'}
            hasIcon={'leading'}
            onClick={hideModal}
            isSubmit={false}
            icon={<CloseIcon className="size-sm" />}
          />
        </div>
        <div className="modalBody">
          {!isUndefined(modalDesc) && <div className="contentDesc">{modalDesc}</div>}
          <div className="modelChildComponentContainer">{children && children}</div>
        </div>
      </Modal>
    </>
  );
}
