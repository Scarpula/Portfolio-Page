import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface SnakeGameTextureProps {
  isActive: boolean;
  onScoreChange?: (score: number) => void;
}

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };

const GRID_SIZE = 20;
const CELL_SIZE = 32;
const CANVAS_SIZE = GRID_SIZE * CELL_SIZE;
const GAME_SPEED = 150;

export const useSnakeGameTexture = ({ isActive, onScoreChange }: SnakeGameTextureProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const textureRef = useRef<THREE.CanvasTexture | null>(null);
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const directionRef = useRef<Direction>('RIGHT');
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  // Canvas 초기화
  useEffect(() => {
    if (!canvasRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = CANVAS_SIZE;
      canvas.height = CANVAS_SIZE;
      canvasRef.current = canvas;
      textureRef.current = new THREE.CanvasTexture(canvas);
      textureRef.current.needsUpdate = true;
    }
  }, []);

  // 새로운 음식 위치 생성
  const generateFood = (currentSnake: Position[]): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      };
    } while (currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  };

  // 게임 리셋
  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 15, y: 15 });
    setDirection('RIGHT');
    directionRef.current = 'RIGHT';
    setGameOver(false);
    setScore(0);
    if (onScoreChange) onScoreChange(0);
  };

  // 키보드 입력
  useEffect(() => {
    if (!isActive || gameOver) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const currentDir = directionRef.current;

      if ((key === 'arrowup' || key === 'w') && currentDir !== 'DOWN') {
        directionRef.current = 'UP';
        e.preventDefault();
      } else if ((key === 'arrowdown' || key === 's') && currentDir !== 'UP') {
        directionRef.current = 'DOWN';
        e.preventDefault();
      } else if ((key === 'arrowleft' || key === 'a') && currentDir !== 'RIGHT') {
        directionRef.current = 'LEFT';
        e.preventDefault();
      } else if ((key === 'arrowright' || key === 'd') && currentDir !== 'LEFT') {
        directionRef.current = 'RIGHT';
        e.preventDefault();
      } else if (key === 'r' && gameOver) {
        resetGame();
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isActive, gameOver]);

  // 게임 루프
  useEffect(() => {
    if (!isActive || gameOver) {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
        gameLoopRef.current = null;
      }
      return;
    }

    gameLoopRef.current = setInterval(() => {
      setSnake(prevSnake => {
        const head = prevSnake[0];
        const currentDir = directionRef.current;
        let newHead: Position;

        switch (currentDir) {
          case 'UP':
            newHead = { x: head.x, y: head.y - 1 };
            break;
          case 'DOWN':
            newHead = { x: head.x, y: head.y + 1 };
            break;
          case 'LEFT':
            newHead = { x: head.x - 1, y: head.y };
            break;
          case 'RIGHT':
            newHead = { x: head.x + 1, y: head.y };
            break;
        }

        // 벽 충돌
        if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
          setGameOver(true);
          return prevSnake;
        }

        // 자기 자신과 충돌
        if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // 음식 먹기
        if (newHead.x === food.x && newHead.y === food.y) {
          const newScore = score + 10;
          setScore(newScore);
          if (onScoreChange) onScoreChange(newScore);
          setFood(generateFood(newSnake));
          return newSnake;
        }

        newSnake.pop();
        return newSnake;
      });

      setDirection(directionRef.current);
    }, GAME_SPEED);

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
        gameLoopRef.current = null;
      }
    };
  }, [isActive, gameOver, food, score]);

  // Canvas 렌더링
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 배경
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (!isActive) {
      // 시작 화면
      ctx.fillStyle = '#00ff41';
      ctx.font = 'bold 48px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('SNAKE GAME', CANVAS_SIZE / 2, CANVAS_SIZE / 2 - 60);

      ctx.font = '24px monospace';
      ctx.fillStyle = '#888';
      ctx.fillText('Click mouse to start', CANVAS_SIZE / 2, CANVAS_SIZE / 2);
      ctx.fillText('Arrow keys or WASD to move', CANVAS_SIZE / 2, CANVAS_SIZE / 2 + 40);

      if (textureRef.current) {
        textureRef.current.needsUpdate = true;
      }
      return;
    }

    // 그리드
    ctx.strokeStyle = '#1a1a1a';
    ctx.lineWidth = 1;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, CANVAS_SIZE);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE);
      ctx.lineTo(CANVAS_SIZE, i * CELL_SIZE);
      ctx.stroke();
    }

    // 뱀
    snake.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? '#00ff41' : '#00cc33';
      ctx.fillRect(
        segment.x * CELL_SIZE + 2,
        segment.y * CELL_SIZE + 2,
        CELL_SIZE - 4,
        CELL_SIZE - 4
      );

      // 뱀 머리 눈
      if (index === 0) {
        ctx.fillStyle = '#000';
        const eyeSize = 4;
        ctx.fillRect(
          segment.x * CELL_SIZE + 8,
          segment.y * CELL_SIZE + 8,
          eyeSize,
          eyeSize
        );
        ctx.fillRect(
          segment.x * CELL_SIZE + CELL_SIZE - 12,
          segment.y * CELL_SIZE + 8,
          eyeSize,
          eyeSize
        );
      }
    });

    // 음식
    ctx.fillStyle = '#ff006e';
    ctx.beginPath();
    ctx.arc(
      food.x * CELL_SIZE + CELL_SIZE / 2,
      food.y * CELL_SIZE + CELL_SIZE / 2,
      CELL_SIZE / 2 - 4,
      0,
      Math.PI * 2
    );
    ctx.fill();

    // 점수
    ctx.fillStyle = '#00ff41';
    ctx.font = 'bold 24px monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`Score: ${score}`, 20, 35);

    // 게임 오버
    if (gameOver) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

      ctx.fillStyle = '#ff006e';
      ctx.font = 'bold 48px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('GAME OVER', CANVAS_SIZE / 2, CANVAS_SIZE / 2 - 40);

      ctx.fillStyle = '#fff';
      ctx.font = '24px monospace';
      ctx.fillText(`Final Score: ${score}`, CANVAS_SIZE / 2, CANVAS_SIZE / 2 + 20);

      ctx.fillStyle = '#00ff41';
      ctx.font = '20px monospace';
      ctx.fillText('Press R to restart', CANVAS_SIZE / 2, CANVAS_SIZE / 2 + 60);
    }

    if (textureRef.current) {
      textureRef.current.needsUpdate = true;
    }
  }, [snake, food, score, gameOver, isActive]);

  return { texture: textureRef.current, resetGame };
};
