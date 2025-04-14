export type ConnectSquaresScenario = {
    id: number;
    piece: string;
    squareA: string;
    squareB: string;
    squareC?: string;
    correctAnswer: string | string[];
    explanation: string;
};
