import { NewsItem, CoreValue } from './types';

// Referencing generated images directly as relative URLs to prevent TypeScript import errors
const imgGaming = '/src/assets/images/news_gaming_1779748385076.png';
const imgScifi = '/src/assets/images/news_scifi_1779748403040.png';
const imgTech = '/src/assets/images/news_tech_1779748417916.png';

export const NEWS_DATABASE: NewsItem[] = [
  {
    id: '1',
    category: 'GAMES',
    title: 'O Impacto dos Motores Gráficos de Última Geração na Imersão de RPGs',
    summary: 'Análise detalhada do uso de iluminação global em tempo real e geração procedural de alta precisão para criar ecossistemas interativos e vibrantes de forma orgânica.',
    content: 'A evolução recente das engines gráficas redefiniu completamente o paradigma de desenvolvimento para jogos de mundo aberto. Tecnologias como Ray Tracing em tempo real, aliadas a sistemas avançados de compressão e streaming direto do SSD, removem as barreiras tradicionais de telas de carregamento.\n\nMais do que fotorrealismo, a imersão moderna trata-se de simulação física realista: o vento que deforma individualmente os ramos das folhagens, a variação meteorológica que afeta a aderência do relevo e os ciclos diurnos dinâmicos que alteram o ecossistema de inteligência artificial dos inimigos. O resultado final é um mundo que responde ao jogador como se estivesse genuinamente vivo.',
    date: '25 de Maio, 2026',
    image: imgGaming,
    author: {
      name: 'Eduardo "Pixel" Souza',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
    },
    readTime: '6 min de leitura',
    likes: 342,
    comments: 54
  },
  {
    id: '2',
    category: 'CINEMA & SÉRIES',
    title: 'De Duna a Novas Fronteiras da Ópera Espacial na Ficção Científica',
    summary: 'Por que a cinematografia contemporânea e a narrativa focada em realismo ecológico e geopolítico redefiniram a receptividade do público a adaptações complexas.',
    content: 'O cinema de ficção científica ocidental passou por uma transformação conceitual na última década. O tradicional escapismo espacial abriu espaço para adaptações literárias maduras, marcadas por debates geopolíticos densos, misticismo ecológico e design de produção tátil.\n\nDiretores modernos de ponta provaram que o grande público está pronto para longas de ritmo cerebral, desde que suportados por um design sonoro imersivo e cenários que pareçam habitados. Esse renascimento da "ópera espacial dura" estimulou novos estúdios a darem sinal verde a romances clássicos da ficção que antes eram considerados inadaptáveis.',
    date: '24 de Maio, 2026',
    image: imgScifi,
    author: {
      name: 'Beatriz "Valkyrie" Mendes',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
    },
    readTime: '8 min de leitura',
    likes: 498,
    comments: 73
  },
  {
    id: '3',
    category: 'TECNOLOGIA',
    title: 'Arquitetura Quantum no Silício: Próxima Revolução Além dos 2 Nanômetros',
    summary: 'Pesquisadores de semicondutores anunciam sucesso na integração estável de portas lógicas quânticas diretamente em circuitos de silício convencional.',
    content: 'Em uma conquista histórica para o hardware de computação, cientistas conseguiram superar o limite físico das correntes parasitas térmicas em transistores tradicionais. Ao integrar portas lógicas de spin-qubit dentro de wafers de silício puro sob condições menos críticas de superresfriamento, a indústria ganha um atalho rumo a coprocessadores auxiliares de alto desempenho.\n\nEsta arquitetura híbrida não substitui o computador desktop comum, mas otimizará maciçamente criptografia local avançada, simulações moleculares precisas para novos materiais e treinamento local de redes neurais sem precisar enviar dados para grandes fazendas de servidores em nuvem comercial.',
    date: '23 de Maio, 2026',
    image: imgTech,
    author: {
      name: 'Dr. Lucas "Byte" Almeida',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80'
    },
    readTime: '5 min de leitura',
    likes: 289,
    comments: 42
  }
];

export const CORE_VALUES: CoreValue[] = [
  {
    id: 'value_1',
    title: 'Jornalismo sem Fake News',
    description: 'Aqui o compromisso é com a verdade factual. Não publicamos rumores não verificados, clickbaits vazios ou sensacionalismo barato. Todas as fontes são checadas minuciosamente.',
    iconName: 'ShieldCheck'
  },
  {
    id: 'value_2',
    title: 'Análises Críticas Profundas',
    description: 'Nossa equipe de especialistas não fica apenas na superfície de especificações. Entramos em detalhes sobre engenharia de hardware, roteiros literários e impactos socioculturais das obras.',
    iconName: 'BookOpen'
  },
  {
    id: 'value_3',
    title: 'Comunidade Ativa & Saudável',
    description: 'Fomentamos um ambiente seguro para debates saudáveis e apaixonantes. Fóruns moderados, respeito mútuo e comemoração conjunta das novidades que amamos.',
    iconName: 'Users'
  }
];
