
import type { Challenge } from '@/types/challenge';

const challenges: Challenge[] = [
  {
    id: 'instagram',
    title: 'Instagram',
    description: '在 SITCON 的 Instagram 上,似乎藏著什麼祕密....',
    completed: true,
    current: true,
    link: 'https://sitcon.org/instagram',
  },
  {
    id: 'prompt-injection',
    title: 'Prompt Injection',
    description: '',
    completed: true,
    current: false,
    link: 'https://sitcon.org/prompt-injection',
  },
  {
    id: 'worker-recruitment',
    title: 'SITCON 工人招募',
    description: '',
    completed: false,
    current: false,
    link: 'https://sitcon.org/worker-recruitment',
  },
  {
    id: 'elf-text',
    title: '精靈文',
    description: '',
    completed: false,
    current: false,
    link: 'https://sitcon.org/elf-text',
  },
  {
    id: 'git-leak',
    title: 'Git Leak',
    description: '',
    completed: false,
    current: false,
    link: 'https://sitcon.org/git-leak',
  },
  {
    id: 'python-jail',
    title: 'Python Jail',
    description: '',
    completed: false,
    current: false,
    link: 'https://sitcon.org/python-jail',
  },
  {
    id: 'about-sitcon',
    title: '關於 SITCON',
    description: '',
    completed: false,
    current: false,
    link: 'https://sitcon.org/about-sitcon',
  },
];

export default challenges;