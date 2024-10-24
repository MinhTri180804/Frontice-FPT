import React, { useState } from 'react';
import './TableContents.scss';

interface Subsection {
  title: string;
  href: string;
}

interface Section {
  title: string;
  href: string;
  subsections?: Subsection[];
}

interface TableOfContentsProps {
  sections: Section[];
}

const TableContents: React.FC<TableOfContentsProps> = ({ sections }) => {
  const [activeSectionIndex, setActiveSectionIndex] = useState<number | null>(
    null,
  );
  const [activeSubIndex, setActiveSubIndex] = useState<number | null>(null);

  const handleSectionClick = (index: number) => {
    setActiveSectionIndex(index);
    setActiveSubIndex(null);
  };

  const handleSubClick =
    (subIndex: number, sectionIndex: number) => (e: React.MouseEvent) => {
      e.stopPropagation();
      setActiveSubIndex(subIndex);
      setActiveSectionIndex(sectionIndex);
    };

  return (
    <div className="container-table-of-content">
      <div className="title-table-of-contents" id="toc-title">
        Table of Contents
      </div>
      <ul>
        {sections.map((section, sectionIndex) => (
          <li
            className={`section ${activeSectionIndex === sectionIndex ? 'active' : ''}`}
            key={sectionIndex}
            onClick={() => handleSectionClick(sectionIndex)}
          >
            <a
              href={section.href}
              className={`section-title ${activeSectionIndex === sectionIndex ? 'active' : ''}`}
            >
              {section.title}
            </a>
            {section.subsections && section.subsections.length > 0 && (
              <ul>
                {section.subsections.map((sub, subIndex) => (
                  <li
                    className={`sub-section ${activeSubIndex === subIndex && activeSectionIndex === sectionIndex ? 'active' : ''}`}
                    key={subIndex}
                    onClick={handleSubClick(subIndex, sectionIndex)}
                  >
                    <a href={sub.href}>{sub.title}</a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableContents;
