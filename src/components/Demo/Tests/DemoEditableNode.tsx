import { TDemoComponent } from 'src/core/types';
import { EditableNode } from 'src/components/Survey/EditableNode/EditableNode';

export const DemoEditableNode: TDemoComponent = () => {
  return (
    <div className="DemoEditableNode">
      <EditableNode
        // prettier-ignore
        nodeId="test-text"
        editableType="text"
        title="Text Field"
        // value="Editable text"
        value="Fake question with an extra long text data to check flex adaptive layout"
      />
      {/*
      <EditableNode
        // prettier-ignore
        nodeId="test-textarea"
        editableType="textarea"
        title="Text Area Field"
        value="Editable text area"
      />
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
      */}
    </div>
  );
};

DemoEditableNode.__title = 'Editable node';
