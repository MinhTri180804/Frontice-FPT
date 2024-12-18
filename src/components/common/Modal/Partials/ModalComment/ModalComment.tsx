import { FC } from 'react';
import Modal from '../../Modal';

interface IModalCommentProps {
  isShow: boolean;
  taskId: string;
  onClose: () => void;
}
const ModalComment: FC<IModalCommentProps> = ({ isShow, onClose }) => {
  // const {} = useQuery({
  //   queryKey: ['taskSolutionComment', taskId],
  //   queryFn: async () => {},
  // });
  return (
    <Modal isOpen={isShow} onClose={onClose}>
      <div>this is modal</div>
    </Modal>
  );
};

export default ModalComment;
