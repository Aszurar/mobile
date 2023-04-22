export type TechnologiesProps =
  | 'React'
  | 'React Native'
  | 'NodeJs'
  | 'JavaScript'
  | 'Python'
  | 'HTML'
  | 'CSS'
  | 'Java'
  | 'TypeScript'
  | 'Flutter'
  | 'Dart'
  | 'PostgreSQL'
  | 'SQL'
  | 'Django'
  | 'Spring'
  | 'Nest'
  | 'Expo'
  | 'MySQL'
  | 'Next';

export type ProjectTypeProps =
  | 'game'
  | 'mobile'
  | 'web'
  | 'desktop'
  | 'backend'
  | 'ai'
  | 'other';

export type ProjectProps = {
  id: string;
  name: string;
  description: string;
  type: ProjectTypeProps;
  image: string;
  publishLink: string;
  remoteRepository: string;
  technologies: TechnologiesProps[];
};

export type ProjectErrorMessagesProps = {
  name: string;
  description: string;
  remoteRepository: string;
  technologies: string;
  type: string;
};

export type InputTextProjectProps = Pick<
  ProjectProps,
  'name' | 'description' | 'remoteRepository' | 'publishLink'
>;

const PROJECT_ERROR_MESSAGES_DEFAULT = {
  name: '',
  description: '',
  remoteRepository: '',
  technologies: '',
  type: '',
};

const INPUT_TEXT_PROJECT_DEFAULT = {
  name: '',
  description: '',
  remoteRepository: '',
  publishLink: '',
};

export type ProjectTypesDefaultProps = {
  label: string;
  value: string;
};

const PROJECT_TYPES_DEFAULT: ProjectTypesDefaultProps[] = [
  {
    label: 'Mobile App',
    value: 'mobile',
  },
  {
    label: 'Site',
    value: 'web',
  },
  {
    label: 'Desktop App',
    value: 'desktop',
  },
  {
    label: 'API',
    value: 'backend',
  },
  {
    label: 'Jogo',
    value: 'game',
  },
  {
    label: 'IA',
    value: 'ai',
  },
];

const TECHNOLOGIES_DEFAULT: TechnologiesProps[] = [
  'React',
  'React Native',
  'NodeJs',
  'JavaScript',
  'Python',
  'HTML',
  'CSS',
  'Java',
  'TypeScript',
  'Flutter',
  'Dart',
  'PostgreSQL',
  'SQL',
  'Django',
  'Spring',
  'Nest',
  'Expo',
  'MySQL',
  'Next',
];

const PROJECTS_DEFAULT: ProjectProps[] = [
  {
    id: '1',
    name: 'imHere',
    description:
      'O projeto imHere é um aplicativo mobile que lista os participantes de um evento e detalhes desse evento como nome e data. Baixe e instale em seus dispositivo Android pela Google Play Store',
    type: 'mobile',
    image:
      'https://play-lh.googleusercontent.com/buP96EQ4eKv0hXSCNY8D3q810bbolTMAoMXDOvjxEwWaGqecj-todxGAffmadZvvZQ=w240-h480-rw',
    publishLink:
      'https://play.google.com/store/apps/details?id=com.aszurar.imhere',
    remoteRepository: 'https://remoteRepository.com/Aszurar/imHere',
    technologies: ['React', 'TypeScript', 'Expo'],
  },
  {
    id: '2',
    name: 'MySkills',
    description:
      'O 1º projeto do bootcamp Ignite na trilha react-native, nele é apresentado os conceitos básicos de desenvolvimento mobile.',
    type: 'mobile',
    image:
      'https://lh3.googleusercontent.com/xnbHXmfsZ8TJ1zw7dAhbLioFwLej2tyi5gctFI2qdfx4ZOypU0-UrZVFt64SEK8J9Lc',
    publishLink: 'https://www.google.com',
    remoteRepository: 'https://remoteRepository.com/Aszurar/myskills',
    technologies: ['React', 'TypeScript'],
  },
  {
    id: '3',
    name: 'Project 3',
    description: 'Project 3 description',
    type: 'web',
    image: '',
    publishLink: 'https://www.google.com',
    remoteRepository: 'https://www.google.com',
    technologies: ['React', 'TypeScript', 'NodeJs'],
  },
  {
    id: '4',
    name: 'Project 4',
    description: 'Project 4 description',
    type: 'backend',
    image: '',
    publishLink: 'https://www.google.com',
    remoteRepository: 'https://www.google.com',
    technologies: ['React', 'TypeScript', 'NodeJs'],
  },
  {
    id: '5',
    name: 'Project 5',
    description: 'Project 5 description',
    type: 'game',
    image: '',
    publishLink: 'https://www.google.com',
    remoteRepository: 'https://www.google.com',
    technologies: [
      'React',
      'TypeScript',
      'NodeJs',
      'Django',
      'Python',
      'SQL',
      'PostgreSQL',
      'Dart',
      'Flutter',
    ],
  },
  {
    id: '6',
    name: 'Project 6',
    description: 'Project 6 description',
    type: 'backend',
    image: '',
    publishLink: 'https://www.google.com',
    remoteRepository: 'https://www.google.com',
    technologies: ['React', 'TypeScript', 'NodeJs'],
  },
];

export {
  PROJECTS_DEFAULT,
  PROJECT_TYPES_DEFAULT,
  TECHNOLOGIES_DEFAULT,
  INPUT_TEXT_PROJECT_DEFAULT,
  PROJECT_ERROR_MESSAGES_DEFAULT,
};
