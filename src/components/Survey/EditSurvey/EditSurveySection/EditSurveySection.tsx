import React from 'react';
import classNames from 'classnames';

import {
  TSurveyItem,
  TSurveyNodeChangeParams,
  TSurveyQuestion,
  TSurveySection,
} from 'src/entities/Survey/types';
import { EditSurveyQuestion } from 'src/components/Survey/EditSurvey/EditSurveyQuestion';
import {
  SurveyNode,
  SurveyNodeFoldedContent,
  SurveyNodeItemRow,
  SurveyNodeOwnContent,
  // SurveyNodeRemark,
} from 'src/components/Survey/SurveyNode';
import { useSortedSurveyItems } from 'src/components/Survey/SurveyNode/hooks';
import { SurveyNodeHeader } from 'src/components/Survey/SurveyNode/SurveyNodeHeader';
import {
  EditableNode,
  TEditableNodeChangeParams,
} from 'src/components/Survey/EditableNode/EditableNode';

interface TEditSurveySectionProps {
  sectionData: TSurveySection;
  className?: string;
  onChange?: (params: TSurveyNodeChangeParams) => void;
}

interface TSurveyItemProps {
  itemData: TSurveyItem;
  onChange?: (params: TSurveyNodeChangeParams) => void;
}

/** Render folderd section or question */
const EditSurveyItem: React.FC<TSurveyItemProps> = ({ itemData, onChange }) => {
  const isQuestion = !!(itemData as TSurveyQuestion).questionId;
  if (isQuestion) {
    return <EditSurveyQuestion questionData={itemData as TSurveyQuestion} onChange={onChange} />;
  } else {
    return <EditSurveySection sectionData={itemData as TSurveySection} onChange={onChange} />;
  }
};

const EditSurveySectionContent: React.FC<{
  sectionData: TSurveySection;
  handleChange: (params: TEditableNodeChangeParams) => void;
}> = (props) => {
  const { sectionData, handleChange } = props;
  const {
    // prettier-ignore
    sectionId,
    remark,
    orderNumber,
  } = sectionData;
  return (
    <>
      <SurveyNodeItemRow title="ID:" activeButtonId={`section-${sectionId}-id-button`}>
        <EditableNode
          // prettier-ignore
          key={`section-${sectionId}-id`}
          nodeId={`section-${sectionId}-id`}
          activeButtonId={`section-${sectionId}-id-button`}
          editableType="text"
          title="Section ID"
          value={sectionId || ''}
          valueId="sectionId"
          onChange={handleChange}
          isNumber
        />
      </SurveyNodeItemRow>
      <SurveyNodeItemRow
        title="Order Number:"
        activeButtonId={`section-${sectionId}-orderNumber-button`}
      >
        <EditableNode
          // prettier-ignore
          key={`section-${sectionId}-orderNumber`}
          nodeId={`section-${sectionId}-orderNumber`}
          activeButtonId={`section-${sectionId}-orderNumber-button`}
          editableType="text"
          title="Order Number"
          value={orderNumber}
          valueId="orderNumber"
          onChange={handleChange}
          isNumber
        />
      </SurveyNodeItemRow>
      <SurveyNodeItemRow title="Remark:" activeButtonId={`section-${sectionId}-remark-button`}>
        <EditableNode
          // prettier-ignore
          key={`section-${sectionId}-remark`}
          nodeId={`section-${sectionId}-remark`}
          activeButtonId={`section-${sectionId}-remark-button`}
          editableType="textarea"
          title="Remark Text"
          value={remark || ''}
          valueId="remark"
          onChange={handleChange}
        />
      </SurveyNodeItemRow>
    </>
  );
};

export const EditSurveySection: React.FC<TEditSurveySectionProps> = (props) => {
  const { sectionData, className, onChange } = props;
  const {
    sectionId,
    // orderNumber,
    // displayNumber,
    name,
    // remark,
    items,
  } = sectionData;
  // Sort items
  const sortedItems = useSortedSurveyItems(items);
  const handleItemChange = React.useCallback(
    (params: TSurveyNodeChangeParams) => {
      const { nodeId, nodeData } = params;
      // const isQuestion = !!(nodeData as TSurveyQuestion).questionId;
      const changedItems = sectionData.items.map((item) => {
        if (
          nodeId === (item as TSurveyQuestion).questionId ||
          nodeId === (item as TSurveySection).sectionId
        ) {
          return nodeData as TSurveyItem;
        }
        return item;
      });
      const changedSectionData: TSurveySection = { ...sectionData, items: changedItems };
      const valueId = 'items';
      const changedItemsParams: TSurveyNodeChangeParams = {
        nodeData: changedSectionData,
        nodeId: sectionId,
        value: changedItems,
        valueId,
      };
      console.log('[EditSurveySection:handleItemChange]', valueId, {
        changedItems,
        sectionId,
        params,
        sectionData,
        changedSectionData,
        changedItemsParams,
      });
      // debugger;
      if (onChange) {
        onChange(changedItemsParams);
      }
    },
    [sectionId, sectionData, onChange],
  );

  const handleChange = React.useCallback(
    (params: TEditableNodeChangeParams) => {
      const { valueId, value } = params;
      // Check if value id has defined...
      if (!valueId) {
        const error = new Error('No value id provided!');
        // eslint-disable-next-line no-console
        console.error(error);
        // eslint-disable-next-line no-debugger
        debugger;
      }
      const id = valueId as keyof TSurveySection;
      // Create updated question data object...
      const changedSectionData: TSurveySection = { ...sectionData, [id]: value };
      // Is reorder required for uplevel container? (TODO: Track the current node in viewpoint on re-order?)
      const reorderRequired = valueId === 'orderNumber';
      // Construct parameters data for up-level change handler
      const changedParams: TSurveyNodeChangeParams = {
        nodeData: changedSectionData,
        nodeId: sectionId,
        value,
        valueId,
        reorderRequired,
      };
      console.log('[EditSurveySection:handleChange]', valueId, {
        value,
        valueId,
        params,
        reorderRequired,
        sectionId,
        sectionData,
        changedSectionData,
        changedParams,
      });
      // debugger;
      if (onChange) {
        onChange(changedParams);
      }
    },
    [sectionId, sectionData, onChange],
  );

  const nameNode = React.useMemo(() => {
    return (
      <EditableNode
        // prettier-ignore
        nodeId={`section-${sectionId}-name`}
        editableType="text"
        title="Section Name"
        value={name}
        valueId="name"
        onChange={handleChange}
        flex={1}
      />
    );
  }, [sectionId, name, handleChange]);
  return (
    <SurveyNode nodeType="section" nodeId={sectionId} className={classNames(className)} indent>
      <SurveyNodeHeader
        // prettier-ignore
        // prefix={displayNumber}
        title={nameNode}
        icon="[SECTION]"
        toolbar="[TOOLBAR]"
      />
      <SurveyNodeOwnContent nodeBaseType="section-own-content">
        <EditSurveySectionContent sectionData={sectionData} handleChange={handleChange} />
      </SurveyNodeOwnContent>
      <SurveyNodeFoldedContent nodeBaseType="section-content">
        {sortedItems.map((itemData) => {
          const key =
            (itemData as TSurveyQuestion).questionId || (itemData as TSurveySection).sectionId;
          return <EditSurveyItem key={key} itemData={itemData} onChange={handleItemChange} />;
        })}
      </SurveyNodeFoldedContent>
    </SurveyNode>
  );
};
