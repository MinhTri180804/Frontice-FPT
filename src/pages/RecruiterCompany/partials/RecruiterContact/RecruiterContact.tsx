import { RecruiterContactItem } from './Partials';
import './RecruiterContact.scss';

const RecruiterContact: React.FC = () => {
  return (
    <div className="recruiter-contact-container">
      <div className="recruiter-contact-list">
        <RecruiterContactItem
          contactLabel="Website"
          contactValue={{
            content: 'https://k-tech.vn',
            to: 'https://k-tech.vn',
            blank: true,
          }}
        />
        <RecruiterContactItem
          contactLabel="Linkedin"
          contactValue={{
            content: 'https://linkedin.com/k-tech-vn',
            to: 'https://linkedin.com/k-tech-vn',
            blank: true,
          }}
        />
        <RecruiterContactItem
          contactLabel="Facebook"
          contactValue={{
            content: 'https://facebook.com/k-tech-vn',
            to: 'https://facebook.com/k-tech-vn',
            blank: true,
          }}
        />
      </div>
    </div>
  );
};

export default RecruiterContact;
