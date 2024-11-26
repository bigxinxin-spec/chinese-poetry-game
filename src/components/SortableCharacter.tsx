import { Box } from '@chakra-ui/react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Character {
  id: string;
  value: string;
  isCorrect: boolean;
}

interface Props {
  character: Character;
}

export function SortableCharacter({ character }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: character.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Box
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      p={4}
      bg={character.isCorrect ? 'green.100' : 'white'}
      borderWidth={2}
      borderColor={character.isCorrect ? 'green.500' : 'gray.200'}
      borderRadius="md"
      textAlign="center"
      fontSize="xl"
      cursor="grab"
      userSelect="none"
      _hover={{
        bg: character.isCorrect ? 'green.200' : 'gray.100',
      }}
      _active={{
        cursor: 'grabbing',
        borderColor: 'blue.500',
      }}
    >
      {character.value}
    </Box>
  );
}
