import { Button, Modal } from "flowbite-react";
import React from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

interface WarningModalProps {
  title?: string;
  showModal: boolean;
  acceptButtonColor?: string;
  closeModal: (arg: boolean) => void;
  handleAccept: () => void;
}

export default function WarningModal({
  title,
  showModal,
  acceptButtonColor = "blue",
  closeModal,
  handleAccept,
}: WarningModalProps) {
  return (
    <Modal show={showModal} size="md" onClose={() => closeModal(false)} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            {title || "Are you sure?"}
          </h3>
          <div className="flex justify-center gap-4">
            <Button color={acceptButtonColor || "blue"} onClick={handleAccept}>
              Yes, I&apos;m sure
            </Button>
            <Button
              color="gray"
              onClick={() => {
                closeModal(false);
              }}
            >
              No, cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
