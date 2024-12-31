'use dom';

import { DIALOG_CONTAINER_ID } from '@/helpers/getDialogContainerElement';

const DialogContainer = () => {
  return <div id={DIALOG_CONTAINER_ID} className="absolute" />;
};

export default DialogContainer;
