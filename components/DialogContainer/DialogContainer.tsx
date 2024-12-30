'use dom'

import { DIALOG_CONTAINER_ID } from '@/helpers/getDialogContainerElement';

const DialogContainer = () => {
  return (
    <div
      id={DIALOG_CONTAINER_ID}
      className="z-50 bg-black absolute top-0 left-0 right-0 bottom-0"
    />
  );
};

export default DialogContainer;