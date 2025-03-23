import TreeView from '../commponents/TreeView';
import {useState} from "react";

const treeData = [
    {
        id: 1,
        name: 'Root 1',
        children: [
            {
                id: 2,
                name: 'Child 1',
                children: [
                    {
                        id: 3,
                        name: 'Grandchild 1',
                        children: []
                    }
                ]
            },
            {
                id: 4,
                name: 'Child 2',
                children: []
            }
        ]
    },
    {
        id: 5,
        name: 'Root 2',
        children: []
    }
];

const App = () => {
    const [data] = useState(treeData)
    return (
        <div>
            <h1>Tree View Example</h1>
            <TreeView data={data} />
        </div>
    );
};

export default App;