export type CategoryKey =
  | 'breastfeeding'
  | 'formula'
  | 'sleep'
  | 'wake'
  | 'pee'
  | 'poop'
  | 'bath';

type CategoryInfo = {
  key: CategoryKey;
  label: string;
  emoji: string;
  color: string;
};

export const categories: CategoryInfo[] = [
  {
    key: 'breastfeeding',
    label: 'Breast',
    emoji: '🤱',
    color: '#f4b4b4',
  },
  {
    key: 'formula',
    label: 'Formula',
    emoji: '🍼',
    color: '#f6c37d',
  },
  {
    key: 'sleep',
    label: 'Sleep',
    emoji: '😴',
    color: '#a79ee0',
  },
  {
    key: 'wake',
    label: 'Wake-up',
    emoji: '🌞',
    color: '#92d2ec',
  },
  {
    key: 'pee',
    label: 'Pee',
    emoji: '💧',
    color: '#c0e6e2',
  },
  {
    key: 'poop',
    label: 'Poop',
    emoji: '💩',
    color: '#e8b36d',
  },
  {
    key: 'bath',
    label: 'Baths',
    emoji: '🛁',
    color: '#d9cbbf',
  },
];
