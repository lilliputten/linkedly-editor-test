import { useEffect, useState } from 'react';
import { useStore } from 'reactflow';

export const ConnectionLine = ({
  fromX,
  fromY,
  toX,
  toY,
}: {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
}) => {
  const { connectionHandleId } = useStore<{ connectionHandleId: string }>(() => ({
    connectionHandleId: '',
  }));
  const [lineColor, setLineColor] = useState<string>('black');
  useEffect(() => {
    if (connectionHandleId === 'black') {
      setLineColor('green');
      return;
    }
    if (connectionHandleId === 'blue') {
      setLineColor('#0B66C2');
      return;
    }
    setLineColor(connectionHandleId);
  }, [connectionHandleId]);

  return (
    <g>
      <path
        fill="none"
        stroke={lineColor}
        d={`M${fromX},${fromY} C ${toX} ${fromY} ${toX} ${fromY} ${toX},${toY}`}
      />
      <circle cx={toX} cy={toY} fill="#fff" r={3} stroke={lineColor} />
    </g>
  );
};
