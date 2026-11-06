import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CommunityPost } from '../types';
import { 
  MessageSquare, 
  ThumbsUp, 
  Send, 
  PlusCircle, 
  Search, 
  Filter, 
  Tag, 
  Sparkles, 
  User, 
  Clock, 
  Share2, 
  CheckCircle2,
  X
} from 'lucide-react';

export const CommunitySection: React.FC = () => {
  const { currentUser, posts, comments, createPost, likePost, addComment, setActiveView } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePostComments, setActivePostComments] = useState<string | null>(null);
  const [commentInputs, setCommentInputs] = useState<{ [postId: string]: string }>({});

  // New Post Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<CommunityPost['category']>('Academic Discussion');
  const [newContent, setNewContent] = useState('');
  const [newTags, setNewTags] = useState('Algorithms, Placements');

  const categories = [
    'All',
    'Academic Discussion',
    'Campus Life',
    'Project Collaboration',
    'Career Advice',
    'Q&A'
  ];

  const filteredPosts = posts.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleCreatePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const parsedTags = newTags
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    createPost(newTitle.trim(), newContent.trim(), newCategory, parsedTags);

    setNewTitle('');
    setNewContent('');
    setIsModalOpen(false);
  };

  const handleCommentSubmit = (postId: string) => {
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;

    addComment(postId, text.trim());
    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-[11px] font-semibold uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Collegiate Academic Community</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Student Community & Academic Forum
          </h1>
          <p className="text-xs sm:text-sm text-indigo-200 max-w-xl">
            Ask questions, collaborate on engineering capstone projects, discuss course concepts, and seek peer guidance.
          </p>
        </div>

        <button
          onClick={() => {
            if (!currentUser) {
              alert('Please sign in or select a demo user to publish a community discussion.');
              return;
            }
            setIsModalOpen(true);
          }}
          className="px-5 py-3 rounded-xl bg-white text-indigo-900 font-semibold text-xs shadow-md hover:bg-indigo-50 transition-colors flex items-center gap-2 shrink-0"
        >
          <PlusCircle className="w-4 h-4 text-indigo-600" />
          <span>Start New Discussion</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
        {/* Categories as clean segmented controls (§1.A allowed for interactive buttons) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat 
                  ? 'bg-indigo-600 text-white shadow-2xs' 
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search discussions, topics, tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Posts List */}
      <div className="space-y-6">
        {filteredPosts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center space-y-3">
            <MessageSquare className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No discussions found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              There are no discussions matching your current search query or category filter. Be the first to start a conversation!
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-2 px-4 py-2 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700"
            >
              Post Question
            </button>
          </div>
        ) : (
          filteredPosts.map((post) => {
            const postComments = comments.filter(c => c.postId === post.id);
            const isCommentsOpen = activePostComments === post.id;

            return (
              <div 
                key={post.id} 
                className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs hover:border-slate-300 transition-all space-y-4"
              >
                {/* Author Info Bar */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center uppercase">
                      {post.authorName.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900">{post.authorName}</span>
                        <span className="text-[10px] text-slate-400 font-mono">({post.authorIdentifier})</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                          post.authorRole === 'faculty' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
                        }`}>
                          {post.authorRole} · {post.authorDepartment}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Dept of {post.authorDepartment} · Posted on {post.createdAt}
                      </div>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700">
                    {post.category}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                    {post.content}
                  </p>
                </div>

                {/* Tags (Zero-pill text separators per §1.A) */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-indigo-600 font-medium pt-1">
                  {post.tags.map((tag, idx) => (
                    <span key={idx} className="hover:underline cursor-pointer">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Interactions Row */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => likePost(post.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-100 text-slate-700 font-semibold transition-colors"
                    >
                      <ThumbsUp className="w-3.5 h-3.5 text-indigo-600" />
                      <span className="font-mono tabular-nums">{post.likes} Upvotes</span>
                    </button>

                    <button
                      onClick={() => setActivePostComments(isCommentsOpen ? null : post.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-100 text-slate-700 font-semibold transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-purple-600" />
                      <span className="font-mono tabular-nums">{postComments.length} Comments</span>
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText(window.location.href);
                      alert('Discussion link copied to clipboard!');
                    }}
                    className="flex items-center gap-1 text-slate-400 hover:text-slate-700 text-xs"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Share</span>
                  </button>
                </div>

                {/* Comments Thread */}
                {isCommentsOpen && (
                  <div className="pt-4 mt-2 border-t border-slate-100 space-y-4 bg-slate-50/70 p-4 rounded-xl">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Academic Discussion Thread ({postComments.length})
                    </h4>

                    {/* Existing Comments */}
                    <div className="space-y-3">
                      {postComments.length === 0 ? (
                        <p className="text-xs text-slate-400 italic">No comments yet. Share your insights!</p>
                      ) : (
                        postComments.map((c) => (
                          <div key={c.id} className="p-3 bg-white rounded-lg border border-slate-200 text-xs space-y-1">
                            <div className="flex items-center justify-between text-slate-500 text-[11px]">
                              <span className="font-bold text-slate-900">{c.authorName} ({c.authorRole})</span>
                              <span className="font-mono">{c.createdAt}</span>
                            </div>
                            <p className="text-slate-700 text-xs leading-relaxed">{c.content}</p>
                          </div>
                        ))
                      )}
                    </div>

                    {/* Add Comment Input */}
                    {currentUser ? (
                      <div className="flex gap-2 pt-2">
                        <input
                          type="text"
                          placeholder="Write a constructive response or answer..."
                          value={commentInputs[post.id] || ''}
                          onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleCommentSubmit(post.id);
                          }}
                          className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500"
                        />
                        <button
                          onClick={() => handleCommentSubmit(post.id)}
                          className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center gap-1 shrink-0"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Reply</span>
                        </button>
                      </div>
                    ) : (
                      <p className="text-xs text-slate-500">
                        Please sign in to reply to this academic discussion.
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* NEW POST MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-900 px-6 py-4 flex items-center justify-between text-white border-b border-slate-800">
              <h3 className="text-base font-bold">Create New Community Discussion</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePostSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Discussion Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Best resources for learning React & Spring Boot in Semester 5?"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Category *
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Academic Discussion">Academic Discussion</option>
                  <option value="Campus Life">Campus Life</option>
                  <option value="Project Collaboration">Project Collaboration</option>
                  <option value="Career Advice">Career Advice</option>
                  <option value="Q&A">Q&A</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Details & Question *
                </label>
                <textarea
                  required
                  rows={4}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Elaborate on your question or project proposal..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder="e.g. Java, DBMS, Projects, Hackathon"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md"
                >
                  Post Discussion
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
