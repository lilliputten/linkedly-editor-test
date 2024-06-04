import React from 'react';
import classNames from 'classnames';

import { TSurvey, TSurveyNodeChangeParams, TSurveyPage } from 'src/entities/Survey/types';
import { EditSurveyPage } from 'src/components/Survey/EditSurvey/EditSurveyPage';
import {
  SurveyNode,
  SurveyNodeFoldedContent,
  SurveyNodeItemRow,
  SurveyNodeOwnContent,
} from 'src/components/Survey/SurveyNode';
import { useSortedSurveyItems } from 'src/components/Survey/SurveyNode/hooks';
import {
  EditableNode,
  TEditableNodeChangeParams,
} from 'src/components/Survey/EditableNode/EditableNode';
import { SurveyNodeHeader } from 'src/components/Survey/SurveyNode/SurveyNodeHeader';

interface TEditSurveyProps {
  surveyData: TSurvey;
  className?: string;
  onChange?: (params: TSurveyNodeChangeParams) => void;
}

const EditSurveyRootContent: React.FC<{
  surveyData: TSurvey;
  handleChange: (params: TEditableNodeChangeParams) => void;
}> = (props) => {
  const { surveyData, handleChange } = props;
  const {
    // prettier-ignore
    id: surveyId,
    // orderNumber,
  } = surveyData;
  return (
    <>
      <SurveyNodeItemRow title="ID:" activeButtonId={`survey-${surveyId}-id-button`}>
        <EditableNode
          // prettier-ignore
          key={`survey-${surveyId}-id`}
          nodeId={`survey-${surveyId}-id`}
          activeButtonId={`survey-${surveyId}-id-button`}
          editableType="text"
          title="Survey ID"
          value={surveyId || ''}
          valueId="surveyId"
          onChange={handleChange}
        />
      </SurveyNodeItemRow>
    </>
  );
};

export const EditSurveyRoot: React.FC<TEditSurveyProps> = (props) => {
  const { surveyData, className, onChange } = props;
  const { id: surveyId, name, items } = surveyData;
  // Sort pages
  const sortedPages = useSortedSurveyItems(items);

  const handleItemChange = React.useCallback(
    (params: TSurveyNodeChangeParams) => {
      const { nodeId, nodeData } = params;
      // const isQuestion = !!(nodeData as TSurveyQuestion).questionId;
      const changedItems = surveyData.items.map((item) => {
        if (nodeId === item.pageId) {
          return nodeData as TSurveyPage;
        }
        return item;
      });
      const changedSurveyData: TSurvey = { ...surveyData, items: changedItems };
      const valueId = 'items';
      const changedItemsParams: TSurveyNodeChangeParams = {
        nodeData: changedSurveyData,
        nodeId: surveyId,
        value: changedItems,
        valueId,
      };
      console.log('[EditSurveyRoot:handleItemChange]', valueId, {
        changedItems,
        surveyId,
        params,
        surveyData,
        changedSurveyData,
        changedItemsParams,
      });
      // debugger;
      if (onChange) {
        onChange(changedItemsParams);
      }
    },
    [surveyId, surveyData, onChange],
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
      const id = valueId as keyof TSurvey;
      // Create updated question data object...
      const changedSurveyData: TSurvey = { ...surveyData, [id]: value };
      // Is reorder required for uplevel container? (TODO: Track the current node in viewpoint on re-order?)
      const reorderRequired = valueId === 'orderNumber'; // XXX: Is it used here?
      // Construct parameters data for up-level change handler
      const changedParams: TSurveyNodeChangeParams = {
        nodeData: changedSurveyData,
        nodeId: surveyId,
        value,
        valueId,
        reorderRequired,
      };
      console.log('[EditSurveyRoot:handleChange]', valueId, {
        value,
        valueId,
        params,
        reorderRequired,
        surveyId,
        surveyData,
        changedSurveyData,
        changedParams,
      });
      // debugger;
      if (onChange) {
        onChange(changedParams);
      }
    },
    [surveyId, surveyData, onChange],
  );

  const nameNode = React.useMemo(() => {
    return (
      <EditableNode
        // prettier-ignore
        nodeId={`survey-${surveyId}-name`}
        editableType="text"
        title="Survey Name"
        value={name || ''}
        valueId="name"
        onChange={handleChange}
        flex={1}
      />
    );
  }, [surveyId, name, handleChange]);
  return (
    <SurveyNode nodeType="root" nodeId={surveyId} className={classNames(className)} root>
      <SurveyNodeHeader
        // prettier-ignore
        title={nameNode}
        icon="[SURVEY]"
        toolbar="[TOOLBAR]"
      />
      <SurveyNodeOwnContent nodeBaseType="page-own-content">
        <EditSurveyRootContent surveyData={surveyData} handleChange={handleChange} />
      </SurveyNodeOwnContent>
      <SurveyNodeFoldedContent nodeBaseType="root-content" root indent>
        {sortedPages.map((pageData) => {
          return (
            <EditSurveyPage key={pageData.pageId} pageData={pageData} onChange={handleItemChange} />
          );
        })}
      </SurveyNodeFoldedContent>
    </SurveyNode>
  );
};
