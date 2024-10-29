import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
import { IoClose } from 'react-icons/io5';
// import MainButton from './mainButton'; // Ensure you have a MainButton component
// import BorderButton from './borderButton'; // Ensure you have a BorderButton component

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  handleMain?: () => void; // Callback function for the main button
  handleMainTitle?: string; // Title for the main button
  children?: React.ReactNode; // Allow children to be passed
};

export default function MediumModal({
  isOpen,
  closeModal,
  // handleMain,
  // handleMainTitle,
  children,
}: Props) {
  return (
    <Dialog
      open={isOpen}
      onClose={closeModal}
      aria-labelledby="medium-modal-title"
      aria-describedby="medium-modal-description"
    >
      <div 
        className="p-0 px-2.5 py-2 rounded-full bg-gray-200 w-fit absolute right-2 top-2 z-10 cursor-pointer" 
        onClick={closeModal}
      >
        <IoClose />
      </div>

      <DialogContent>
        {children} {/* Render children here */}
      </DialogContent>

      {/* <DialogActions>
        <BorderButton title="Cancel" onClick={closeModal} />
        <MainButton title={handleMainTitle || 'Submit'} onClick={handleMain} />
      </DialogActions> */}
    </Dialog>
  );
}
