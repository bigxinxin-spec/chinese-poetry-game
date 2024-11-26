import {
  Box,
  Container,
  Input,
  SimpleGrid,
  VStack,
  Text,
  Heading,
  Card,
  CardBody,
  Button,
  HStack,
  Badge,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { poems } from '../data/poems';

export const SelectPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPoems = poems.filter(
    poem => 
      poem.title.includes(searchTerm) || 
      poem.author.includes(searchTerm) ||
      poem.content.includes(searchTerm)
  );

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8}>
        <HStack w="100%" justify="space-between">
          <Button
            onClick={() => navigate('/')}
            variant="ghost"
          >
            返回首页
          </Button>
          <Heading>选择诗词</Heading>
          <Box w="40px" /> {/* 为了保持标题居中 */}
        </HStack>
        
        <Input
          placeholder="搜索诗词或作者..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          maxW="600px"
        />

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} w="100%">
          {filteredPoems.map((poem) => (
            <Card
              key={poem.id}
              cursor="pointer"
              onClick={() => navigate(`/game/${poem.id}`)}
            >
              <CardBody>
                <VStack align="start" spacing={2}>
                  <HStack justify="space-between" w="100%">
                    <Heading size="md">{poem.title}</Heading>
                    <Badge colorScheme={
                      poem.difficulty === 'easy' ? 'green' :
                      poem.difficulty === 'medium' ? 'yellow' : 'red'
                    }>
                      {poem.difficulty === 'easy' ? '简单' :
                       poem.difficulty === 'medium' ? '中等' : '困难'}
                    </Badge>
                  </HStack>
                  <Text color="gray.600">{poem.author}</Text>
                  <Text noOfLines={2}>{poem.content}</Text>
                </VStack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>

        {filteredPoems.length === 0 && (
          <Text color="gray.500">未找到匹配的诗词</Text>
        )}
      </VStack>
    </Container>
  );
};
