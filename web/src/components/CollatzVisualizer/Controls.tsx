import React from 'react';
import { ControlsProps } from '../../types';

const Controls: React.FC<ControlsProps> = ({
  startNumber,
  onStartNumberChange,
  onStart,
  isAnimating,
  view,
  onViewChange
}) => {
  return (
    <div className="mb-6 flex gap-4 items-center">
      <div className="flex items-center gap-2">
        <label htmlFor="startNumber" className="text-white">
          Start Number:
        </label>
        <input
          id="startNumber"
          type="number"
          value={startNumber}
          onChange={(e) => onStartNumberChange(Number(e.target.value))}
          className="bg-gray-800 text-white px-3 py-2 rounded w-24"
          min="1"
          disabled={isAnimating}
        />
      </div>

      <button
        onClick={onStart}
        className={`px-4 py-2 rounded transition-colors ${
          isAnimating 
            ? 'bg-gray-600 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
        disabled={isAnimating}
      >
        {isAnimating ? 'Animating...' : 'Start Animation'}
      </button>

      <div className="flex gap-2">
        <button
          onClick={() => onViewChange('spiral')}
          className={`px-4 py-2 rounded transition-colors ${
            view === 'spiral' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
          }`}
        >
          Spiral View
        </button>
        <button
          onClick={() => onViewChange('graph')}
          className={`px-4 py-2 rounded transition-colors ${
            view === 'graph' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
          }`}
        >
          Graph View
        </button>
      </div>

      {isAnimating && (
        <span className="text-blue-400 animate-pulse">
          Visualizing sequence...
        </span>
      )}
    </div>
  );
};

export default Controls;