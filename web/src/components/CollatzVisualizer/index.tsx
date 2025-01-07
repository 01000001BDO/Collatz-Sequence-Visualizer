import React, { useState } from 'react';
import { ViewMode } from '../../types';
import { useCollatzSequence } from '../../hooks/useCollatzSequence';
import Controls from './Controls';
import SpiralView from './SpiralView';
import GraphView from './GraphView';

const CollatzVisualizer: React.FC = () => {
  const [view, setView] = useState<ViewMode>('spiral');
  const {
    sequence,
    currentIndex,
    isAnimating,
    startNumber,
    handleNumberChange,
    startAnimation
  } = useCollatzSequence();

  return (
    <div className="p-4 bg-gray-900 text-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Collatz Conjecture Visualizer</h1>
        
        <Controls
          startNumber={startNumber}
          onStartNumberChange={handleNumberChange}
          onStart={startAnimation}
          isAnimating={isAnimating}
          view={view}
          onViewChange={setView}
        />

        <div className="bg-gray-800 p-4 rounded-lg mb-4">
          {view === 'spiral' ? (
            <SpiralView
              sequence={sequence}
              currentIndex={currentIndex}
              isAnimating={isAnimating}
            />
          ) : (
            <GraphView
              sequence={sequence}
              currentIndex={currentIndex}
              isAnimating={isAnimating}
            />
          )}
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Sequence:</h2>
          <div className="flex flex-wrap gap-2">
            {sequence.slice(0, currentIndex + 1).map((num, i) => (
              <span
                key={i}
                className="bg-blue-600 px-2 py-1 rounded"
              >
                {num}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollatzVisualizer;