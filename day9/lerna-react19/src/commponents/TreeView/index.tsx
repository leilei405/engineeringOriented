import { useState } from 'react';

const TreeView = ({ data }: {data: any}) => {
  const [isExpanded, setIsExpanded] = useState(false);


  const renderNode = (node: any) => {
    const toggleExpand = () => {
      setIsExpanded(!isExpanded);
    };

    return (
        <div>
          <div onClick={toggleExpand}>
            {node.children && (isExpanded ? '▼ ' : '▶ ')}
            {node.name}
          </div>
          {isExpanded && node.children && (
              <div style={{ marginLeft: '20px' }}>
                {node?.children?.map((child: any) => (
                    <div key={child.id}>{renderNode(child)}</div>
                ))}
              </div>
          )}
        </div>
    );
  };

  return (
      <div>
        {data?.map((node: any) => (
            <div key={node?.id}>{renderNode(node)}</div>
        ))}
      </div>
  );
};

export default TreeView;