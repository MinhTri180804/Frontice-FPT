import './CompanyFollow.scss';
interface Company {
  image: string;
  name: string;
  quantity: string;
}
const CompanyFollow: React.FC<Company> = ({ ...props }) => {
  const { image, name, quantity = '0' } = props;
  return (
    <>
      <div className="container-company-follow">
        <div className="company-follow">
          <div className="image-name-company">
            <div className="image">
              <img src={image} alt="pic company" />
            </div>
            <div className="name-company">{name}</div>
          </div>
          <div className="company-quantity">{quantity} Challenges</div>
        </div>
      </div>
    </>
  );
};

export default CompanyFollow;
