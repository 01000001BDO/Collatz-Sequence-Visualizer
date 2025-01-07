import React, { useMemo } from 'react';
import { Point, VisualizerProps } from '../../types';

const SpiralView: React.FC<VisualizerProps> = ({ sequence, currentIndex }) => {
  const spiralPoints: Point[] = useMemo(() => {
    return sequence.map((num, i) => {
      const angle: number = (i * Math.PI * 2) / 10;
      const radius: number = 100 + Math.log(num) * 10;
      return {
        x: 200 + Math.cos(angle) * radius,
        y: 200 + Math.sin(angle) * radius,
        value: num,
        index: i
      };
    });
  }, [sequence]);

  return (
    <svg width="400" height="400" className="w-full">
      <g>
        {spiralPoints.slice(0, currentIndex + 1).map((point, i) => {
          if (i === 0) return null;
          const prevPoint = spiralPoints[i - 1];
          return (
            <line
              key={i}
              x1={prevPoint.x}
              y1={prevPoint.y}
              x2={point.x}
              y2={point.y}
              stroke="#60A5FA"
              strokeWidth="2"
            />
          );
        })}
        {spiralPoints.slice(0, currentIndex + 1).map((point, i) => (
          <g key={i}>
            <circle
              cx={point.x}
              cy={point.y}
              r="4"
              fill="#2563EB"
            />
            <text
              x={point.x + 10}
              y={point.y}
              fill="white"
              fontSize="12"
            >
              {point.value}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
};

export default SpiralView;