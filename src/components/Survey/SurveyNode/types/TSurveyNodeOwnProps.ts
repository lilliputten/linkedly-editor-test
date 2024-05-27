import { TSurveyNodeBaseType, TSurveyNodeType } from 'src/entities/Survey/types';

export interface TSurveyNodeOwnProps {
  nodeType?: TSurveyNodeType;
  nodeBaseType?: TSurveyNodeBaseType;
  nodeId?: string | number;
  root?: boolean;
  indent?: boolean;
}
