import React, { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ThumbsUp, MessageSquare, Clock, Send, ShieldAlert, Check } from 'lucide-react';
import { NewsItem } from '../types';

interface ArticleModalProps {
  item: NewsItem | null;
  onClose: () => void;
}

interface Comment {
  author: string;
  text: string;
  time: string;
}

export function ArticleModal({ item, onClose }: ArticleModalProps) {
  // Local state for comments, like count and newly typed values
  const [likes, setLikes] = useState<number>(0);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [commentError, setCommentError] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false);

  // Initialize values when item changes
  useState(() => {
    if (item) {
      setComments([
        { author: 'Guilherme "Vader"', text: 'Sensacional essa análise técnica sobre as engines gráficas. A iluminação realmente muda tudo!', time: 'Há 5 minutos' },
        { author: 'Mariana_Nerd', text: 'Muito bom ler conteúdo de verdade sem aquele sensacionalismo barato de outros portais.', time: 'Há 2 horas' }
      ]);
      setLikes(item?.likes || 0);
      setHasLiked(false);
      setCommentError('');
      setCommentSuccess(false);
    }
  });

  const handleLike = () => {
    if (hasLiked) {
      setLikes(prev => prev - 1);
      setHasLiked(false);
    } else {
      setLikes(prev => prev + 1);
      setHasLiked(true);
    }
  };

  const handleAddComment = (e: FormEvent) => {
    e.preventDefault();
    setCommentError('');
    setCommentSuccess(false);

    if (!newCommentName.trim()) {
      setCommentError('Por favor, informe seu apelido Nerd.');
      return;
    }
    if (!newCommentText.trim()) {
      setCommentError('O texto do comentário não pode estar vazio.');
      return;
    }

    const newComment: Comment = {
      author: newCommentName.trim(),
      text: newCommentText.trim(),
      time: 'Agora mesmo'
    };

    setComments(prev => [newComment, ...prev]);
    setNewCommentName('');
    setNewCommentText('');
    setCommentSuccess(true);
    setTimeout(() => setCommentSuccess(false), 3000);
  };

  if (!item) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto">
        {/* Backdrop glass blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#07080b]/95 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="relative w-full max-w-3xl bg-brand-surface border border-brand-border rounded-2xl overflow-hidden shadow-2xl z-10 max-h-[85vh] flex flex-col"
        >
          {/* Close trigger button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-brand-bg/85 border border-brand-border text-brand-text-s hover:text-brand-text-p hover:bg-brand-accent transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Scrolling Content Area */}
          <div className="overflow-y-auto p-6 md:p-8 space-y-6">
            {/* Header / Meta / Cover */}
            <div className="space-y-4">
              <span className="font-mono text-xs font-semibold tracking-wider text-brand-accent bg-brand-accent/10 border border-brand-accent/20 px-3 py-1 rounded-full">
                {item.category}
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-black text-brand-text-p leading-tight">
                {item.title}
              </h2>
              
              <div className="flex flex-wrap items-center gap-4 text-xs text-brand-text-s font-mono">
                <div className="flex items-center gap-2">
                  <img src={item.author.avatar} alt={item.author.name} className="w-6 h-6 rounded-full object-cover" />
                  <span className="text-brand-text-p">{item.author.name}</span>
                </div>
                <span>•</span>
                <span>{item.date}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-brand-accent" />
                  {item.readTime}
                </span>
              </div>
            </div>

            {/* Simulated Hero image */}
            <div className="relative rounded-xl overflow-hidden border border-brand-border aspect-video">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-surface via-transparent to-transparent opacity-40" />
            </div>

            {/* Detailed text */}
            <div className="max-w-none text-brand-text-s font-normal leading-relaxed space-y-4 text-base">
              {item.content.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Trust badge */}
            <div className="p-4 rounded-xl bg-brand-bg/60 border border-brand-accent/20 flex flex-col md:flex-row gap-3 items-start md:items-center justify-between text-xs text-brand-text-s font-mono">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-brand-cyan flex-shrink-0" />
                <span>Checagem: Artigo revisado e aprovado. 100% livre de sensacionalismo.</span>
              </div>
              <span className="text-brand-accent font-semibold">CORTEX CONFIRMADO ✓</span>
            </div>

            {/* Live Likes & Social section */}
            <div className="flex items-center gap-4 py-4 border-y border-brand-border">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-mono text-sm transition-all cursor-pointer ${
                  hasLiked
                    ? 'bg-brand-accent border-brand-accent text-white shadow-lg shadow-brand-accent/20'
                    : 'bg-brand-bg/80 border-brand-border text-brand-text-s hover:text-brand-text-p hover:border-brand-accent/40'
                }`}
              >
                <ThumbsUp className={`w-4 h-4 ${hasLiked ? 'scale-110 fill-white' : ''} transition-transform`} />
                <span>{likes} Curtidas</span>
              </button>
              <div className="flex items-center gap-2 text-brand-text-s font-mono text-sm">
                <MessageSquare className="w-4 h-4 text-brand-text-s/70" />
                <span>{comments.length} Comentários</span>
              </div>
            </div>

            {/* Comments Space */}
            <div className="space-y-6 pt-2">
              <h3 className="font-display text-lg font-bold text-brand-text-p flex items-center gap-2">
                Fórum de Discussão
                <span className="text-xs font-mono font-normal text-brand-text-s px-2 py-0.5 rounded-md bg-brand-bg border border-brand-border">
                  Moderado
                </span>
              </h3>

              {/* Comment submission Form */}
              <form onSubmit={handleAddComment} className="space-y-3 bg-brand-bg/40 p-4 rounded-xl border border-brand-border">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Apelido Nerd (ex: ObiWan_99)"
                    value={newCommentName}
                    onChange={(e) => setNewCommentName(e.target.value)}
                    className="md:col-span-1 px-3 py-2 bg-brand-bg border border-brand-border rounded-lg text-sm text-brand-text-p placeholder:text-brand-text-s/50 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent"
                  />
                  <input
                    type="text"
                    placeholder="Deixe seu comentário construtivo..."
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    className="md:col-span-2 px-3 py-2 bg-brand-bg border border-brand-border rounded-lg text-sm text-brand-text-p placeholder:text-brand-text-s/50 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent"
                  />
                </div>

                {commentError && (
                  <p className="text-xs text-red-400 flex items-center gap-1 font-mono">
                    <ShieldAlert className="w-3 h-3" /> {commentError}
                  </p>
                )}

                {commentSuccess && (
                  <p className="text-xs text-green-400 flex items-center gap-1 font-mono">
                    <Check className="w-3 h-3" /> Comentário publicado com sucesso!
                  </p>
                )}

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-4 py-1.5 bg-brand-accent hover:bg-brand-accent/90 text-white rounded-lg text-xs font-mono font-semibold transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" /> Enviar
                  </button>
                </div>
              </form>

              {/* Comments Feed list */}
              <div className="space-y-4">
                {comments.map((comment, index) => (
                  <div key={index} className="p-4 rounded-xl bg-brand-bg/40 border border-brand-border space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold text-brand-accent">{comment.author}</span>
                      <span className="font-mono text-[10px] text-brand-text-s/60">{comment.time}</span>
                    </div>
                    <p className="text-sm text-brand-text-s leading-relaxed">
                      {comment.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
