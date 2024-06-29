import React from 'react';
import { Box } from '@mui/material';
import { Handle, Position } from 'reactflow';

import { defaultFontSizePx } from 'src/core/assets/scss';

import { TChartNodeData } from '../types';

interface TInputNodeProps {
  data: TChartNodeData;
}
export const InputNode: React.FC<TInputNodeProps> = ({ data }) => {
  return (
    <Box
      className="InputNode"
      sx={{
        padding: 1,
        backgroundColor: 'transparent',
        fontSize: defaultFontSizePx,
      }}
    >
      {data.label}
      <Handle
        type="source"
        position={Position.Bottom}
        className="InputNode_Handle"
        style={{
          opacity: 1,
        }}
      />
    </Box>
  );
};

export const InputNodeMemo = React.memo(InputNode);
