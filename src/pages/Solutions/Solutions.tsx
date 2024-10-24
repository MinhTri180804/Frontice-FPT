import { Button } from '../../components/common';
import Solution from '../../components/common/Solution';
import { PlusIcon } from '@heroicons/react/24/outline';
import './Solution.scss';
import image from '../../asset/images/solution.png';
import userAvatar from '../../asset/images/avatar.png';
import React, { useEffect, useState } from 'react';
interface DataItemSolution {
  time: string;
  name: string;
  tech: string[];
  id: string;
}
const Solutions: React.FC = () => {
  const [dataSolution, setDataSolution] = useState<DataItemSolution[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data.json'); //duong dan file data.json
        const result = await response.json();
        setDataSolution(result);
      } catch (error) {
        console.error('Error', error);
      } finally {
        // Sau khi tải xong thì tắt trạng thái loading
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="container-solution-list-page">
        <div className="header">
          <div className="title">Solution List</div>
          <Button
            style={{ width: 'fit-content' }}
            label="Filter"
            buttonSize="small"
            iconPosition="left"
            styleType="secondary"
            Icon={() => <PlusIcon />}
          />
        </div>
        <div className="solution-list">
          <div className="cols">
            {dataSolution.map((solutionItem) => (
              <Solution
                key={solutionItem.id}
                image={image} // Hình ảnh mặc định
                name={solutionItem.name}
                time={solutionItem.time}
                tech={solutionItem.tech}
                userAvatar={userAvatar}
              />
            ))}
          </div>
          <div className="cols">
            {dataSolution.map((solutionItem) => (
              <Solution
                key={solutionItem.id}
                image={image} // Hình ảnh mặc định
                name={solutionItem.name}
                time={solutionItem.time}
                tech={solutionItem.tech}
                userAvatar={userAvatar}
                isShowDesc={true}
              />
            ))}
          </div>
          <div className="cols">
            {dataSolution.map((solutionItem) => (
              <Solution
                key={solutionItem.id}
                image={image} // Hình ảnh mặc định
                name={solutionItem.name}
                time={solutionItem.time}
                tech={solutionItem.tech}
                userAvatar={userAvatar}
              />
            ))}
          </div>
          <div className="cols">
            {dataSolution.map((solutionItem) => (
              <Solution
                key={solutionItem.id}
                image={image} // Hình ảnh mặc định
                name={solutionItem.name}
                time={solutionItem.time}
                tech={solutionItem.tech}
                userAvatar={userAvatar}
                isShowDesc
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default Solutions;
