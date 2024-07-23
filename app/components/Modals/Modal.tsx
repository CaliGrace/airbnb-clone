"use client";
import React, { useState, useEffect, useCallback } from "react";
import { IoMdClose } from "react-icons/io";

import Button from "../Button";


interface ModalProps {
  isOpen: boolean;
  disabled?: boolean;
  title?: string;
  header?: React.ReactElement;
  footer?: React.ReactElement;
  body?: React.ReactElement;
  onClose: () => void;
  onSubmit: () => void;
  actionLabel:string;
  secondaryAction?: () => void;
  secondaryActionLabel?: string
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  header,
  footer,
  body,
  disabled,
  onClose,
  onSubmit,
  actionLabel,
  secondaryActionLabel,
  secondaryAction
}) => {
  const [showModal, setShowModal] = useState(isOpen);
  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSecondaryAction = () => {}

  const handleSubmit = () => {onSubmit()}

  if(!isOpen) {
    return null;
  }

  return (
    <>
      <div className={`fixed z-50 ${showModal ? 'bg-neutral-700/80' : 'bg-transparent'} inset-0 overflow-x-hidden overflow-y-hidden flex flex-col items-center justify-center`}>
        <div className="relative w-full md:4/6 lg:w-3/6 xl:w-2/6 my-6 py-6 rounded-sm mx-auto md:h-auto">
          {/* CONTENT */}
          <div className={`h-full translate duration-300 ${showModal ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
            <div className="translate relative bg-white w-full flex flex-col h-full rounded-t">
             
              {/* HEADER */}
              <div className="flex relative items-center justify-center py-6 w-full border-b-[1px]">
                  <button onClick={handleClose} className="cursor-pointer absolute left-9">
                    <IoMdClose />
                  </button>
                  <div className="font-semibold">{title}</div>
              </div>

              {/* BODY */}

                <div className="p-6 relative flex-auto">{body}
                 {/* {count} */}
                </div>

              {/* FOOTER */}
              <div className="flex flex-col px-6 gap-2 w-full">
                <Button label={actionLabel}  onClick={handleSubmit}/>
                {
                  secondaryAction && secondaryActionLabel && (

                <div className="flex items-center w-full">
                  <Button label={secondaryActionLabel} outline onClick={handleSecondaryAction}/>
                </div>
                  )
                }
              </div>

              {footer}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
