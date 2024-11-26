import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Container maxW="container.md" centerContent>
      <VStack spacing={8} py={20}>
        <Box>
          <Heading
            as="h1"
            size="2xl"
            textAlign="center"
            bgGradient="linear(to-r, teal.500, blue.500)"
            bgClip="text"
          >
            古诗词连连看
          </Heading>
        </Box>

        <Text
          fontSize="xl"
          textAlign="center"
          color="gray.600"
        >
          体验中国传统诗词之美，提升记忆力与理解力
        </Text>

        <Button
          size="lg"
          colorScheme="teal"
          onClick={() => navigate('/select')}
        >
          开始游戏
        </Button>

        <Box
          mt={12}
          p={6}
          borderWidth={1}
          borderRadius="lg"
        >
          <VStack spacing={4}>
            <Heading size="md">游戏规则</Heading>
            <Text>1. 选择一首你喜欢的古诗</Text>
            <Text>2. 诗句会被打乱成单个字</Text>
            <Text>3. 通过拖拽将字重新排列成正确的顺序</Text>
            <Text>4. 正确放置会得到分数奖励</Text>
            <Text>5. 尽可能减少错误次数以获得更高分数</Text>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};
