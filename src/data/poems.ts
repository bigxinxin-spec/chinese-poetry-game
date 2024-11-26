export interface Poem {
  id: number;
  title: string;
  author: string;
  content: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const poems: Poem[] = [
  {
    id: 1,
    title: '静夜思',
    author: '李白',
    content: '床前明月光，疑是地上霜。举头望明月，低头思故乡。',
    difficulty: 'easy'
  },
  {
    id: 2,
    title: '春晓',
    author: '孟浩然',
    content: '春眠不觉晓，处处闻啼鸟。夜来风雨声，花落知多少。',
    difficulty: 'easy'
  },
  {
    id: 3,
    title: '登鹳雀楼',
    author: '王之涣',
    content: '白日依山尽，黄河入海流。欲穷千里目，更上一层楼。',
    difficulty: 'easy'
  },
  {
    id: 4,
    title: '望庐山瀑布',
    author: '李白',
    content: '日照香炉生紫烟，遥看瀑布挂前川。飞流直下三千尺，疑是银河落九天。',
    difficulty: 'medium'
  },
  {
    id: 5,
    title: '送杜少府之任蜀州',
    author: '王勃',
    content: '城阙辅三秦，风烟望五津。与君离别意，同是宦游人。海内存知己，天涯若比邻。无为在歧路，儿女共沾巾。',
    difficulty: 'hard'
  }
];
