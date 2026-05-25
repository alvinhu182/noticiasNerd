import React from 'react';
import { motion } from 'motion/react';
import { ThumbsUp, MessageSquare, Clock } from 'lucide-react';
import { NewsItem } from '../types';

interface NewsCardProps {
  key?: string | number;
  item: NewsItem;
  onSelect: (item: NewsItem) => void;
}

export function NewsCard({ item, onSelect }: NewsCardProps) {
  // Determine premium color scheme based on category
  const categoryStyles = {
    GAMES: 'bg-cat-games-bg text-cat-games-text border-cat-games-border',
    'CINEMA & SÉRIES': 'bg-cat-cinema-bg text-cat-cinema-text border-cat-cinema-border',
    TECNOLOGIA: 'bg-cat-tech-bg text-cat-tech-text border-cat-tech-border'
  }[item.category];

  return (
    <motion.article
      id={`news-${item.id}`}
      onClick={() => onSelect(item)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-brand-border bg-brand-surface cursor-pointer hover:border-brand-accent/50 hover:shadow-2xl hover:shadow-brand-accent/5 transition-all news-card-hover-border"
    >
      {/* Article Image Container */}
      <div className="relative aspect-video w-full overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Abstract futuristic overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-surface via-transparent to-transparent opacity-95" />
        
        {/* Category Tag */}
        <span className={`absolute top-4 left-4 rounded-md border px-2.5 py-1 text-[10px] font-mono font-semibold tracking-wider ${categoryStyles}`}>
          {item.category}
        </span>
      </div>

      {/* Card Content Details */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2 mb-3 text-xs text-brand-text-s font-mono">
          <span>{item.date}</span>
          <span className="text-brand-text-s opacity-40">•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {item.readTime}
          </span>
        </div>

        <h3 className="font-display text-xl font-bold leading-snug text-brand-text-p group-hover:text-brand-accent transition-colors">
          {item.title}
        </h3>

        <p className="mt-3 text-sm text-brand-text-s line-clamp-2 leading-relaxed flex-1">
          {item.summary}
        </p>

        {/* Action Footnotes & Author */}
        <div className="mt-6 pt-4 border-t border-brand-border flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img
              src={item.author.avatar}
              alt={item.author.name}
              className="w-7 h-7 rounded-full ring-1 ring-brand-border object-cover"
              referrerPolicy="no-referrer"
            />
            <span className="text-xs font-medium text-brand-text-s group-hover:text-brand-text-p transition-colors">
              {item.author.name}
            </span>
          </div>

          <div className="flex items-center gap-3.5 text-xs text-brand-text-s/75 font-mono">
            <span className="flex items-center gap-1 hover:text-brand-accent transition-colors">
              <ThumbsUp className="w-3.5 h-3.5" />
              {item.likes}
            </span>
            <span className="flex items-center gap-1 hover:text-brand-cyan transition-colors">
              <MessageSquare className="w-3.5 h-3.5" />
              {item.comments}
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
