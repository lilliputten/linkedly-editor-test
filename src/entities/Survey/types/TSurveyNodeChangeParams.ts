import { TSurveyGenericItem, TSurveyItemId } from 'src/entities/Survey/types';
import { TEditableNodeChangeParams } from 'src/components/Survey/EditableNode/EditableNode';

export interface TSurveyNodeChangeParams {
  nodeData: TSurveyGenericItem; // TSurvey | TSurveyPage | TSurveySection | TSurveyQuestion;
  nodeId: TSurveyItemId;
  reorderRequired?: boolean;
  valueId: TEditableNodeChangeParams['valueId'];
  value: TEditableNodeChangeParams['value'] | TSurveyGenericItem[];
}
