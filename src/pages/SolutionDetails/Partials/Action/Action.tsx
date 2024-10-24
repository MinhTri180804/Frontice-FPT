import { Button } from '../../../../components/common';
import {
  CodeBracketSquareIcon,
  ComputerDesktopIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import './Action.scss';
const Action: React.FC = () => {
  return (
    <>
      <div className="container-action">
        <div className="list-action">
          <div className="view-source-code">
            <Button
              label="View Source Code"
              buttonSize="large"
              styleType="secondary"
              Icon={() => <CodeBracketSquareIcon />}
              iconPosition="left"
            />
          </div>
          <div className="view-preview-demo">
            <Button
              label="View Preview Demo"
              buttonSize="large"
              styleType="primary"
              Icon={() => <ComputerDesktopIcon />}
              iconPosition="left"
            />
          </div>
          <div className="button-report">
            <button>
              <div>
                <ExclamationTriangleIcon />
              </div>
              Report
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Action;
