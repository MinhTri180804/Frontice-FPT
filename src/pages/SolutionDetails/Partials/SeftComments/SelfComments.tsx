import useSelfCommentsStore from '../../../../store/seftCommentsStore';
import Comment from '../Comments/Comments';

const SelfComments = () => {
  const selfComments = useSelfCommentsStore((state) => state.comments);
  console.log('[Self Comments]: ', selfComments);
  return (
    <>
      {selfComments.map((comment, index) => (
        <Comment commentData={comment} key={`${index}`} />
      ))}
    </>
  );
};

export default SelfComments;
