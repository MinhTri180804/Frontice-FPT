import './RecruiterDescription.scss';

const RecruiterDescription: React.FC = () => {
  const paragraph = (
    <>
      <p>
        The NAB Innovation Centre Vietnam is owned by NAB - Australia’s largest
        business bank.
      </p>
      <p>
        The NAB Innovation Centre Vietnam (NAB Vietnam) is part of National
        Australia Bank (NAB) Technology & Enterprise Operations division. The
        mission of the NAB Vietnam is to connect the talents of Vietnam to NAB
        and together improve the lives of those in the Vietnam technology
        community.
      </p>
      <p>
        As Australia’s largest business bank, NAB is focused on delivering great
        experiences for customers. To do this it uses modern technologies,
        alongside great technology talent including leading software engineers,
        cloud experts and quality engineers.
      </p>
      <p>
        We’re working on interesting projects to help NAB’s 10 million
        customers: By joining us, local software engineers will have access to a
        wide variety of projects and opportunities, working closely with
        colleagues in Australia and with global partners such as AWS and
        Microsoft to take advantage of the latest modern technologies.
      </p>
      <p>
        We’re investing in you: We strive to create not only a great place to
        work, but also the best technology centre for tech engineers to thrive.
      </p>
      <p>It’s more than just a career!</p>
      <p>
        We believe in people with ideas and dreams, and we want you to achieve
        your aspirations. If you have an appetite to learn, grow and elevate
        others around you, this is the place for you!
      </p>
    </>
  );

  return (
    <div className="recruiter-description-container">
      <div className="recruiter-description-paragraph">{paragraph}</div>
    </div>
  );
};

export default RecruiterDescription;
