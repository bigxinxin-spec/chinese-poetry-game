import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  useToast,
  Progress,
  Badge,
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { useGameStore } from '../store/gameStore';
import { poems } from '../data/poems';
import { SortableCharacter } from './SortableCharacter';

export const GamePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [poem, setPoem] = useState(poems.find(p => p.id === Number(id)));
  const [activeId, setActiveId] = useState<string | null>(null);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const toast = useToast();

  const {
    characters,
    setCharacters,
    score,
    mistakes,
    timeElapsed,
    isGameComplete,
    incrementScore,
    incrementMistakes,
    updateTime,
    setGameComplete,
    resetGame,
  } = useGameStore();

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor)
  );

  // 初始化游戏
  useEffect(() => {
    if (poem) {
      resetGame();
      const chars = poem.content
        .split('')
        .filter(char => char !== '，' && char !== '。')
        .map((char, index) => ({
          id: `${index}`,
          value: char,
          isCorrect: false,
          originalIndex: index,
        }));
      setCharacters(shuffleArray([...chars]));

      // 开始计时
      const interval = setInterval(() => {
        updateTime(timeElapsed + 1);
      }, 1000);
      setTimer(interval);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [poem]);

  // 检查游戏是否完成
  useEffect(() => {
    if (characters.length > 0 && characters.every(char => char.isCorrect)) {
      setGameComplete(true);
      if (timer) clearInterval(timer);
      toast({
        title: '恭喜！',
        description: `你完成了《${poem?.title}》的重组！\n用时：${timeElapsed}秒\n得分：${score}分\n失误：${mistakes}次`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [characters]);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = characters.findIndex(char => char.id === active.id);
      const newIndex = characters.findIndex(char => char.id === over.id);
      
      const newCharacters = arrayMove(characters, oldIndex, newIndex);
      setCharacters(newCharacters);
      
      // 检查是否放置正确
      const isCorrect = newCharacters[newIndex].originalIndex === newIndex;
      if (isCorrect) {
        incrementScore();
        const updatedCharacters = [...newCharacters];
        updatedCharacters[newIndex].isCorrect = true;
        setCharacters(updatedCharacters);
      } else {
        incrementMistakes();
      }
    }
    
    setActiveId(null);
  };

  if (!poem) {
    return <Container centerContent><Text>诗词未找到</Text></Container>;
  }

  return (
    <Container maxW="container.lg" py={8}>
      <VStack spacing={8}>
        <HStack w="100%" justify="space-between">
          <Button
            variant="ghost"
            onClick={() => navigate('/select')}
          >
            返回选择
          </Button>
          <Box textAlign="center">
            <Heading size="xl">{poem.title}</Heading>
            <Text mt={2} color="gray.600">{poem.author}</Text>
            <Badge colorScheme={
              poem.difficulty === 'easy' ? 'green' :
              poem.difficulty === 'medium' ? 'yellow' : 'red'
            }>{poem.difficulty}</Badge>
          </Box>
          <Box w="40px" /> {/* 为了保持标题居中 */}
        </HStack>

        <HStack spacing={4}>
          <Text>时间：{timeElapsed}秒</Text>
          <Text>得分：{score}分</Text>
          <Text>失误：{mistakes}次</Text>
        </HStack>

        <Progress
          value={(characters.filter(char => char.isCorrect).length / characters.length) * 100}
          w="100%"
          colorScheme="teal"
          hasStripe
          isAnimated
        />

        <Box w="100%" p={6} borderWidth={2} borderRadius="lg" bg="gray.50">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={characters} strategy={rectSortingStrategy}>
              <Box
                display="grid"
                gridTemplateColumns="repeat(auto-fill, minmax(60px, 1fr))"
                gap={4}
                p={4}
              >
                {characters.map((char) => (
                  <SortableCharacter key={char.id} character={char} />
                ))}
              </Box>
            </SortableContext>

            <DragOverlay>
              {activeId ? (
                <Box
                  p={4}
                  bg="white"
                  borderWidth={2}
                  borderRadius="md"
                  textAlign="center"
                  fontSize="xl"
                  boxShadow="lg"
                >
                  {characters.find(char => char.id === activeId)?.value}
                </Box>
              ) : null}
            </DragOverlay>
          </DndContext>
        </Box>

        {isGameComplete && (
          <Button
            colorScheme="teal"
            onClick={() => navigate('/select')}
          >
            选择其他诗词
          </Button>
        )}
      </VStack>
    </Container>
  );
};

// 打乱数组顺序的辅助函数
function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
