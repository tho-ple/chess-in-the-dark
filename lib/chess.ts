export type PieceType = 'p' | 'n' | 'b' | 'r' | 'q' | 'k';
export type Color = 'w' | 'b';
export type Piece = { type: PieceType; color: Color };
export type Board = (Piece | null)[][];
export type Move = { from: string; to: string };

const FILES = 'abcdefgh';

const KNIGHT_DELTAS: [number, number][] = [
  [1, 2],
  [2, 1],
  [2, -1],
  [1, -2],
  [-1, -2],
  [-2, -1],
  [-2, 1],
  [-1, 2],
];

const KING_DELTAS: [number, number][] = [
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
  [0, -1],
  [1, -1],
];

const RAY_DELTAS: Record<'b' | 'r' | 'q', [number, number][]> = {
  b: [
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ],
  r: [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ],
  q: [
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ],
};

const inBounds = (file: number, rank: number) =>
  file >= 0 && file < 8 && rank >= 0 && rank < 8;

export const squareToCoords = (square: string): { file: number; rank: number } => ({
  file: FILES.indexOf(square[0].toLowerCase()),
  rank: parseInt(square[1]) - 1,
});

export const coordsToSquare = (file: number, rank: number): string =>
  FILES[file] + (rank + 1);

export const parseFen = (fen: string): Board => {
  const board: Board = Array.from({ length: 8 }, () =>
    Array<Piece | null>(8).fill(null)
  );
  const rows = fen.split(' ')[0].split('/');
  rows.forEach((row, i) => {
    const rank = 7 - i;
    let file = 0;
    for (const ch of row) {
      if (ch >= '1' && ch <= '8') {
        file += parseInt(ch);
      } else {
        const color: Color = ch === ch.toUpperCase() ? 'w' : 'b';
        board[rank][file] = { type: ch.toLowerCase() as PieceType, color };
        file++;
      }
    }
  });
  return board;
};

export const fenSideToMove = (fen: string): Color =>
  (fen.split(' ')[1] || 'w') === 'w' ? 'w' : 'b';

export const isSquareAttacked = (
  board: Board,
  file: number,
  rank: number,
  byColor: Color
): boolean => {
  const pieceAt = (f: number, r: number): Piece | null =>
    inBounds(f, r) ? board[r][f] : null;

  const pawnDir = byColor === 'w' ? 1 : -1;
  for (const df of [-1, 1]) {
    const p = pieceAt(file + df, rank - pawnDir);
    if (p && p.type === 'p' && p.color === byColor) return true;
  }

  for (const [df, dr] of KNIGHT_DELTAS) {
    const p = pieceAt(file + df, rank + dr);
    if (p && p.type === 'n' && p.color === byColor) return true;
  }

  for (const [df, dr] of KING_DELTAS) {
    const p = pieceAt(file + df, rank + dr);
    if (p && p.type === 'k' && p.color === byColor) return true;
  }

  const sliders: { type: PieceType; dirs: [number, number][] }[] = [
    { type: 'b', dirs: RAY_DELTAS.b },
    { type: 'r', dirs: RAY_DELTAS.r },
    { type: 'q', dirs: RAY_DELTAS.q },
  ];

  for (const { type, dirs } of sliders) {
    for (const [df, dr] of dirs) {
      let f = file + df;
      let r = rank + dr;
      while (inBounds(f, r)) {
        const p = board[r][f];
        if (p) {
          if (p.type === type && p.color === byColor) return true;
          break;
        }
        f += df;
        r += dr;
      }
    }
  }

  return false;
};

export const findKing = (
  board: Board,
  color: Color
): { file: number; rank: number } | null => {
  for (let r = 0; r < 8; r++) {
    for (let f = 0; f < 8; f++) {
      const p = board[r][f];
      if (p && p.type === 'k' && p.color === color) return { file: f, rank: r };
    }
  }
  return null;
};

export const cloneBoard = (board: Board): Board =>
  board.map((row) => row.map((p) => (p ? { ...p } : null)));

export const applyMove = (board: Board, from: string, to: string): Board => {
  const nb = cloneBoard(board);
  const { file: f1, rank: r1 } = squareToCoords(from);
  const { file: f2, rank: r2 } = squareToCoords(to);
  nb[r2][f2] = nb[r1][f1];
  nb[r1][f1] = null;
  return nb;
};

const generatePseudoMoves = (board: Board, color: Color): Move[] => {
  const moves: Move[] = [];

  const addMove = (f: number, r: number, from: string) => {
    moves.push({ from, to: coordsToSquare(f, r) });
  };

  for (let r = 0; r < 8; r++) {
    for (let f = 0; f < 8; f++) {
      const p = board[r][f];
      if (!p || p.color !== color) continue;
      const from = coordsToSquare(f, r);

      if (p.type === 'p') {
        const dir = p.color === 'w' ? 1 : -1;
        const startRank = p.color === 'w' ? 1 : 6;
        if (inBounds(f, r + dir) && !board[r + dir][f]) {
          addMove(f, r + dir, from);
          if (r === startRank && !board[r + 2 * dir][f]) {
            addMove(f, r + 2 * dir, from);
          }
        }
        for (const df of [-1, 1]) {
          const target =
            inBounds(f + df, r + dir) ? board[r + dir][f + df] : null;
          if (target && target.color !== color) {
            addMove(f + df, r + dir, from);
          }
        }
      } else if (p.type === 'n') {
        for (const [df, dr] of KNIGHT_DELTAS) {
          const f2 = f + df;
          const r2 = r + dr;
          if (!inBounds(f2, r2)) continue;
          const target = board[r2][f2];
          if (!target || target.color !== color) addMove(f2, r2, from);
        }
      } else if (p.type === 'k') {
        for (const [df, dr] of KING_DELTAS) {
          const f2 = f + df;
          const r2 = r + dr;
          if (!inBounds(f2, r2)) continue;
          const target = board[r2][f2];
          if (!target || target.color !== color) addMove(f2, r2, from);
        }
      } else {
        for (const [df, dr] of RAY_DELTAS[p.type]) {
          let f2 = f + df;
          let r2 = r + dr;
          while (inBounds(f2, r2)) {
            const target = board[r2][f2];
            if (!target) {
              addMove(f2, r2, from);
            } else {
              if (target.color !== color) addMove(f2, r2, from);
              break;
            }
            f2 += df;
            r2 += dr;
          }
        }
      }
    }
  }

  return moves;
};

export const isInCheck = (board: Board, color: Color): boolean => {
  const king = findKing(board, color);
  if (!king) return false;
  const opp: Color = color === 'w' ? 'b' : 'w';
  return isSquareAttacked(board, king.file, king.rank, opp);
};

export const generateLegalMoves = (board: Board, color: Color): Move[] =>
  generatePseudoMoves(board, color).filter((m) => {
    const nb = applyMove(board, m.from, m.to);
    return !isInCheck(nb, color);
  });

export const hasAnyLegalMove = (board: Board, color: Color): boolean =>
  generateLegalMoves(board, color).length > 0;

export const isCheckmate = (board: Board, color: Color): boolean =>
  isInCheck(board, color) && !hasAnyLegalMove(board, color);

export const findMateInOneMoves = (fen: string, sideToMove: Color): Move[] => {
  const board = parseFen(fen);
  const opp: Color = sideToMove === 'w' ? 'b' : 'w';
  return generateLegalMoves(board, sideToMove).filter((m) => {
    const nb = applyMove(board, m.from, m.to);
    return isCheckmate(nb, opp);
  });
};

export const describePosition = (
  fen: string
): { white: string; black: string } => {
  const board = parseFen(fen);
  const describe = (color: Color) => {
    const list: string[] = [];
    const pawns: string[] = [];
    for (let r = 7; r >= 0; r--) {
      for (let f = 0; f < 8; f++) {
        const p = board[r][f];
        if (!p || p.color !== color) continue;
        const sq = coordsToSquare(f, r);
        if (p.type === 'p') pawns.push(sq);
        else list.push(p.type.toUpperCase() + sq);
      }
    }
    const parts = list.sort();
    if (pawns.length) {
      parts.push(`Pawn${pawns.length > 1 ? 's' : ''} on ${pawns.join(', ')}`);
    }
    return parts.join(', ');
  };
  return { white: describe('w'), black: describe('b') };
};
