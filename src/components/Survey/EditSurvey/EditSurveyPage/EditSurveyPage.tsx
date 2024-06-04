import React from 'react';
import classNames from 'classnames';

import {
  TSurveyItem,
  TSurveyItemId,
  TSurveyPage,
  TSurveyQuestion,
  TSurveySection,
} from 'src/entities/Survey/types';
import {
  EditSurveySection,
  TSurveySectionChangeParams,
} from 'src/components/Survey/EditSurvey/EditSurveySection';
import {
  SurveyNode,
  SurveyNodeFoldedContent,
  SurveyNodeItemRow,
  SurveyNodeOwnContent,
} from 'src/components/Survey/SurveyNode';
import { useSortedSurveyItems } from 'src/components/Survey/SurveyNode/hooks';
import { SurveyNodeHeader } from 'src/components/Survey/SurveyNode/SurveyNodeHeader';
import {
  EditableNode,
  TEditableNodeChangeParams,
} from 'src/components/Survey/EditableNode/EditableNode';

export interface TSurveyPageChangeParams {
  nodeData: TSurveyPage;
  nodeId: TSurveyItemId;
  reorderRequired?: boolean;
  valueId: TEditableNodeChangeParams['valueId'];
  value: TEditableNodeChangeParams['value'] | TSurveyItem[];
}

export type TSurveyPageItemChangeParams = TSurveySectionChangeParams;

// type TSurveySectionItemChangeParams = TSurveySectionChangeParams | TSurveyQuestionChangeParams;

interface TEditSurveyPageProps {
  pageData: TSurveyPage;
  className?: string;
  onChange?: (params: TSurveyPageChangeParams) => void;
}

const EditSurveyPageContent: React.FC<{
  pageData: TSurveyPage;
  handleChange: (params: TEditableNodeChangeParams) => void;
}> = (props) => {
  const { pageData, handleChange } = props;
  const {
    // prettier-ignore
    pageId,
    orderNumber,
  } = pageData;
  return (
    <>
      <SurveyNodeItemRow title="ID:" activeButtonId={`page-${pageId}-id-button`}>
        <EditableNode
          // prettier-ignore
          key={`page-${pageId}-id`}
          nodeId={`page-${pageId}-id`}
          activeButtonId={`page-${pageId}-id-button`}
          editableType="text"
          title="Page ID"
          value={pageId || ''}
          valueId="pageId"
          onChange={handleChange}
        />
      </SurveyNodeItemRow>
      <SurveyNodeItemRow title="Order Number:" activeButtonId={`page-${pageId}-orderNumber-button`}>
        <EditableNode
          // prettier-ignore
          key={`page-${pageId}-orderNumber`}
          nodeId={`page-${pageId}-orderNumber`}
          activeButtonId={`page-${pageId}-orderNumber-button`}
          editableType="text"
          title="Order Number"
          value={orderNumber}
          valueId="orderNumber"
          onChange={handleChange}
          isNumber
        />
      </SurveyNodeItemRow>
    </>
  );
};

export const EditSurveyPage: React.FC<TEditSurveyPageProps> = (props) => {
  const { pageData, className, onChange } = props;
  const { pageId, name, items } = pageData;
  // Sort sections
  const sortedSections = useSortedSurveyItems(items);

  const handleItemChange = React.useCallback(
    (params: TSurveyPageItemChangeParams) => {
      const { nodeId, nodeData } = params;
      // const isQuestion = !!(nodeData as TSurveyQuestion).questionId;
      const changedItems = pageData.items.map((item) => {
        if (nodeId === (item as TSurveySection).sectionId) {
          return nodeData;
        }
        return item;
      });
      const changedPageData: TSurveyPage = { ...pageData, items: changedItems };
      const valueId = 'items';
      const changedItemsParams: TSurveyPageChangeParams = {
        nodeData: changedPageData,
        nodeId: pageId,
        value: changedItems,
        valueId,
      };
      console.log('[EditSurveyPage:handleItemChange]', valueId, {
        changedItems,
        pageId,
        params,
        pageData,
        changedPageData,
        changedItemsParams,
      });
      debugger;
      if (onChange) {
        onChange(changedItemsParams);
      }
    },
    [pageId, pageData, onChange],
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
      const id = valueId as keyof TSurveyQuestion;
      // Create updated question data object...
      const changedPageData: TSurveyPage = { ...pageData, [id]: value };
      // Is reorder required for uplevel container? (TODO: Track the current node in viewpoint on re-order?)
      const reorderRequired = valueId === 'orderNumber';
      // Construct parameters data for up-level change handler
      const changedParams: TSurveyPageChangeParams = {
        nodeData: changedPageData,
        nodeId: pageId,
        value,
        valueId,
        reorderRequired,
      };
      console.log('[EditSurveyPage:handleChange]', valueId, {
        value,
        valueId,
        params,
        reorderRequired,
        pageId,
        pageData,
        changedPageData,
        changedParams,
      });
      debugger;
      if (onChange) {
        onChange(changedParams);
      }
    },
    [pageId, pageData, onChange],
  );

  const nameNode = React.useMemo(() => {
    return (
      <EditableNode
        // prettier-ignore
        nodeId={`page-${pageId}-name`}
        editableType="text"
        title="Page Name"
        value={name || ''}
        valueId="name"
        onChange={handleChange}
        flex={1}
      />
    );
  }, [pageId, name, handleChange]);
  return (
    <SurveyNode nodeType="page" nodeId={pageId} className={classNames(className)}>
      <SurveyNodeHeader
        // prettier-ignore
        title={nameNode}
        icon="[PAGE]"
        toolbar="[TOOLBAR]"
      />
      <SurveyNodeOwnContent nodeBaseType="page-own-content">
        <EditSurveyPageContent pageData={pageData} handleChange={handleChange} />
      </SurveyNodeOwnContent>
      <SurveyNodeFoldedContent nodeBaseType="page-content" indent>
        {sortedSections.map((sectionData) => {
          return (
            <EditSurveySection
              key={sectionData.sectionId}
              sectionData={sectionData}
              onChange={handleItemChange}
            />
          );
        })}
      </SurveyNodeFoldedContent>
    </SurveyNode>
  );
};
