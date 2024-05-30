import { observer } from 'mobx-react-lite';
import { EditableNode } from 'src/components/Survey/EditableNode/EditableNode';

import { TDemoComponent } from 'src/core/types';

export const DemoEditableNode: TDemoComponent = observer(() => {
  return (
    <div className="DemoEditableNode">
      <EditableNode
        // prettier-ignore
        nodeId="test-id"
        editableType="text"
        value="Editable node"
        // value="test value extra mega super hyper buper long text"
      />
    </div>
  );
});

DemoEditableNode.__title = 'Editable node';
