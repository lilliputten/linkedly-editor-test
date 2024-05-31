import { observer } from 'mobx-react-lite';
import { EditableNode } from 'src/components/Survey/EditableNode/EditableNode';

import { TDemoComponent } from 'src/core/types';

export const DemoEditableNode: TDemoComponent = observer(() => {
  return (
    <div className="DemoEditableNode">
      <EditableNode
        // prettier-ignore
        nodeId="test-select"
        editableType="select"
        title="Select Field"
        selectOptions={[
          { value: 'XXX', name: 'Test string' },
          { value: 1, name: 'Text' },
          { value: 3, name: 'Yes / No' },
        ]}
        value={3}
      />
      <EditableNode
        // prettier-ignore
        nodeId="test-textarea"
        editableType="textarea"
        title="Text Area Field"
        value="Editable text area"
      />
      <EditableNode
        // prettier-ignore
        nodeId="test-text"
        editableType="text"
        title="Text Field"
        value="Editable text"
        // value="test value extra mega super hyper buper long text"
      />
    </div>
  );
});

DemoEditableNode.__title = 'Editable node';
