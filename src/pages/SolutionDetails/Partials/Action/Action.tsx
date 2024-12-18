import {
  CodeBracketSquareIcon,
  ComputerDesktopIcon,
} from '@heroicons/react/24/outline';
import { Button } from '../../../../components/common';
import './Action.scss';

interface IActionProps {
  urlGithub?: string;
  urlLiveGithub?: string;
}

const Action: React.FC<IActionProps> = ({
  urlGithub = null,
  urlLiveGithub = null,
}) => {
  const handleClickNewTab = (url: string) => {
    const newTab = window.open(url, '_blank');
    if (newTab) {
      newTab.focus();
    }
  };
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
              disabled={urlGithub === null}
              onClick={() => handleClickNewTab(urlGithub as string)}
            />
          </div>
          <div className="view-preview-demo">
            <Button
              label="View Preview Demo"
              buttonSize="large"
              styleType="primary"
              Icon={() => <ComputerDesktopIcon />}
              iconPosition="left"
              disabled={urlLiveGithub === null}
              onClick={() => handleClickNewTab(urlLiveGithub as string)}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Action;
