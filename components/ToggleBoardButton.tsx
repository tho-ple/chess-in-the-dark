'use client';
import { useState } from 'react';
import { Chessboard } from 'react-chessboard';

type ToggleBoardButtonProps = {
  position?: string;
};

export const ToggleBoardButton = ({ position = 'empty' }: ToggleBoardButtonProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="mt-2">
      <button
        onClick={() => setVisible(!visible)}
        className="ml-4 text-sm text-white/60 hover:underline"
      >
        {visible ? 'Hide Board' : 'Show Board'}
      </button>

      {visible && (
        <div className="mt-4 max-w-sm mx-auto">
          <Chessboard
            boardWidth={300}
            position={position}
            customDarkSquareStyle={{ backgroundColor: '#111' }}
            customLightSquareStyle={{ backgroundColor: '#eee' }}
            showBoardNotation={false}
          />
        </div>
      )}
    </div>
  );
};
