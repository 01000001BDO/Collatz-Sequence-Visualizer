export interface Point {
    x: number;
    y: number;
    value: number;
    index: number;
  }
  
  export interface ChartDataPoint {
    step: number;
    value: number;
  }
  
  export type ViewMode = 'spiral' | 'graph';
  
  export interface VisualizerProps {
    currentIndex: number;
    sequence: number[];
    isAnimating: boolean;
  }
  
  export interface ControlsProps {
    startNumber: number;
    onStartNumberChange: (value: number) => void;
    onStart: () => void;
    isAnimating: boolean;
    view: ViewMode;
    onViewChange: (view: ViewMode) => void;
  }