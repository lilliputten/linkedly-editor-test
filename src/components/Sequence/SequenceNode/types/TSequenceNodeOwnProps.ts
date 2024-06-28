import { TSequenceNodeBaseType, TSequenceNodeType } from 'src/entities/Sequence/types';

export interface TSequenceNodeOwnProps {
  nodeType?: TSequenceNodeType;
  nodeBaseType?: TSequenceNodeBaseType;
  nodeId?: string | number;
  root?: boolean;
  indent?: boolean;
}
