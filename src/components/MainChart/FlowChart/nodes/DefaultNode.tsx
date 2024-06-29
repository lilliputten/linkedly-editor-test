import React from 'react';
import { observer } from 'mobx-react-lite';
import { Handle, Position, useReactFlow } from 'reactflow';
import { useAppDataStore } from 'src/store/AppDataStore';
import { Close } from '@mui/icons-material';
import { IconButton } from '@mui/material';

import { defaultFontSizePx } from 'src/core/assets/scss';

interface TDefaultNodeProps {
  id: string;
  data: any;
  selected: boolean;
}

export const DefaultNode = observer((props: TDefaultNodeProps) => {
  const { id, data, selected } = props;
  const appDataStore = useAppDataStore();
  const { connectSource } = appDataStore;
  const { setNodes, setEdges, getNodes, getEdges } = useReactFlow();

  const onNodeCancel = React.useCallback(() => {
    let nodes = getNodes();
    let edges = getEdges();
    let parentNodeId = edges.find((p) => p.target === id)?.source || '';
    nodes.forEach((node) => {
      if (node.id === parentNodeId && node.id !== 'initial-node') {
        node.data.state.transitions = {
          success: 'end',
          fail: 'end',
        };
      }
    });
    setNodes(nodes.filter((node) => node.id !== id));
    setEdges((edges) => edges.filter((edge) => edge.source !== id && edge.target !== id));
    // setSelectedTask(null);
  }, [id, setNodes, setEdges, getNodes, getEdges]); // ???

  /* // UNUSED: Selected nodes...
   * useEffect(() => {
   *   const nodes = getNodes();
   *   //if all nodes.selected is false, set selectedTask to null
   *   //so we can hide the task component
   *   if (!nodes.find((node) => node.selected)) {
   *     setSelectedTask(null);
   *   }
   *   if (selected) {
   *     setSelectedTask({ ...data, id });
   *   }
   * }, [selected]);
   */

  const isConnecting = React.useMemo(() => {
    if (!connectSource) {
      return false;
    }
    const connectSourceNum = Number(connectSource.slice(8));
    const idNum = Number(id.slice(8));
    const isConnecting = connectSourceNum > idNum;
    /* console.log('[DefaultNode:isConnecting]', isConnecting, {
     *   connectSource,
     *   id,
     *   connectSourceNum,
     *   idNum,
     *   isConnecting,
     * });
     */
    return isConnecting;
  }, [connectSource, id]);

  const containerStyle = {
    backgroundColor: isConnecting ? 'gray' : selected ? '#E8EFFE' : 'white',
    borderColor: selected ? '#0B66C2' : 'E9E9EB',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: 4,
    opacity: isConnecting ? 0.3 : 1,
    padding: 8,
    fontSize: defaultFontSizePx,
  };

  const basicHandlerStyle: React.CSSProperties = {
    width: 12,
    height: 12,
    backgroundColor: '#FFE3E0',
    borderRadius: '100%',
    borderColor: 'red',
    cursor: 'crosshair',
    pointerEvents: 'all',
  };

  const showCancel = data.campaignStatus === 'draft' && selected;

  return (
    <div className="DefaultNode relative" style={{ position: 'relative' }}>
      <div
        // prettier-ignore
        className="DefaultNode_Container"
        style={containerStyle}
      >
        {data.label}
        {isConnecting ? (
          <></>
        ) : (
          <Handle
            type="target"
            position={Position.Top}
            style={{
              // backgroundColor: 'transparent',
              borderWidth: 0,
              width: 0,
              height: 0,
            }}
          />
        )}
        <Handle
          type="source"
          id="red"
          position={Position.Right}
          className="DefaultNode_HandleRed"
          style={{
            ...basicHandlerStyle,
            backgroundColor: '#FFE3E0',
            borderColor: 'red',
          }}
          isConnectable={data.campaignStatus === 'draft'}
        />
        <Handle
          type="source"
          id="black"
          position={Position.Left}
          className="DefaultNode_HandleGreen"
          style={{
            ...basicHandlerStyle,
            backgroundColor: '#E9FFF7',
            borderColor: 'green',
          }}
          isConnectable={data.campaignStatus === 'draft'}
        />
      </div>
      {showCancel ? (
        <IconButton
          aria-label="cancel"
          onClick={onNodeCancel}
          style={{
            position: 'absolute',
            zIndex: 20,
            top: -6,
            right: -6,
            backgroundColor: 'white',
            borderRadius: '100%',
            borderColor: 'gray',
            borderWidth: 1,
            borderStyle: 'solid',
            padding: 0,
          }}
          // size={16}
        >
          <Close
            sx={{
              width: 12,
              height: 12,
              color: 'gray',
            }}
          />
        </IconButton>
      ) : (
        <></>
      )}
    </div>
  );
});

export const DefaultNodeMemo = React.memo(DefaultNode);
