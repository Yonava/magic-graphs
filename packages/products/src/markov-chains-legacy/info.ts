import type { ProductInfo } from 'src/types';

export const info: ProductInfo = {
  route: {
    path: '/markov-chains-legacy',
    redirect: 'https://cs240.netlify.app/',
  },
  name: 'Markov Chains (Legacy)',
  description:
    'Markov chains are a type of stochastic process that models a sequence of possible events in which the probability of each event depends only on the state attained in the previous event.',
  productId: 'markov-chains-legacy',
  menu: {
    name: 'Markov Chains (Legacy)',
    description: 'Build and analyze your very own Markov Chains.',
    thumbnail: '/products/thumbnails/markov-chains-legacy.png',
    category: 'math',
  },
};

export default info;
