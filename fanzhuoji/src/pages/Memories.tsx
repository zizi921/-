import { useState, useRef } from 'react';
import { Users, Utensils, CalendarDays, Camera, PartyPopper, Heart, X, ImagePlus, Type, Pencil, Trash2 } from 'lucide-react';

export const Memories = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [memoriesList, setMemoriesList] = useState<any[]>(() => {
    const saved = localStorage.getItem('fanzhuoji_memories');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.length > 0) return parsed;
      } catch (e) {}
    }
    // Default initial memory if nothing in localStorage
    return [{
      id: Date.now().toString(),
      title: '🥟🥟🥟🥟🥟',
      date: '2026.04.19',
      dishes: '🥟茴香猪肉/香菜牛肉/鱿鱼韭菜/西洋菜鲜虾/芹菜',
      memory: '好吃！',
      imageUrl: ''
    }];
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Save to localStorage whenever memoriesList changes
  const updateMemories = (newList: any[]) => {
    setMemoriesList(newList);
    localStorage.setItem('fanzhuoji_memories', JSON.stringify(newList));
  };

  const [newMemory, setNewMemory] = useState({
    title: '',
    date: '',
    dishes: '',
    memory: '',
    imageUrl: '',
  });

  const handleOpenModal = (memory?: any) => {
    if (memory) {
      setEditingId(memory.id);
      setNewMemory({
        title: memory.title,
        date: memory.date.replace(/\./g, '-'), // Convert back for input type="date"
        dishes: memory.dishes,
        memory: memory.memory,
        imageUrl: memory.imageUrl || '',
      });
    } else {
      setEditingId(null);
      setNewMemory({
        title: '',
        date: '',
        dishes: '',
        memory: '',
        imageUrl: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('确定要删除这条饭桌回忆吗？')) {
      updateMemories(memoriesList.filter(mem => mem.id !== id));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setNewMemory(prev => ({ ...prev, imageUrl: url }));
    }
  };

  const handleSave = () => {
    if (!newMemory.title || !newMemory.date) {
      alert('请至少填写日期和饭局名称哦！');
      return;
    }

    const formattedDate = newMemory.date.replace(/-/g, '.'); // Convert YYYY-MM-DD to YYYY.MM.DD
    
    if (editingId) {
      // Update existing memory
      updateMemories(memoriesList.map(mem => 
        mem.id === editingId 
          ? { ...mem, ...newMemory, date: formattedDate }
          : mem
      ));
    } else {
      // Add new memory
      const memoryToAdd = {
        id: Date.now().toString(),
        title: newMemory.title,
        date: formattedDate,
        dishes: newMemory.dishes || '一些好吃的',
        memory: newMemory.memory || '很开心的一顿饭！',
        imageUrl: newMemory.imageUrl,
      };
      updateMemories([memoryToAdd, ...memoriesList]);
    }
    
    setIsModalOpen(false);
    
    // Reset form
    setNewMemory({
      title: '',
      date: '',
      dishes: '',
      memory: '',
      imageUrl: '',
    });
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 border-2 border-slate-200 rounded-full text-brand font-bold text-sm mb-4">
            <Camera size={16} />
            留住每个好味道
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 flex items-center gap-3 drop-shadow-sm">
            <PartyPopper className="text-brand stroke-[2.5]" size={40} />
            饭桌回忆
          </h1>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="btn-primary flex items-center gap-2"
        >
          <Heart size={20} className="stroke-[3]" />
          记录新饭局
        </button>
      </div>

      {/* Memories List */}
      {memoriesList.length === 0 ? (
        <div className="card p-12 flex flex-col items-center justify-center text-center space-y-4 text-slate-400">
          <Camera size={48} className="text-slate-300" />
          <p className="font-bold text-lg">还没有记录饭局回忆哦，快去记录第一次吧！</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {memoriesList.map((memory) => (
            <div key={memory.id} className="card p-0 overflow-hidden flex flex-col md:flex-row group cursor-pointer relative">
              
              {/* Action Buttons (Absolute positioned on card) */}
              <div className="absolute top-4 right-4 md:top-6 md:right-6 z-20 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
                <button 
                  onClick={(e) => handleOpenModal(memory)}
                  className="p-2.5 bg-white text-slate-400 hover:text-brand hover:border-brand border-[3px] border-slate-100 rounded-xl shadow-sm transition-all"
                  title="编辑回忆"
                >
                  <Pencil size={20} strokeWidth={2.5} />
                </button>
                <button 
                  onClick={(e) => handleDelete(memory.id, e)}
                  className="p-2.5 bg-white text-slate-400 hover:text-red-500 hover:border-red-500 border-[3px] border-slate-100 rounded-xl shadow-sm transition-all"
                  title="删除回忆"
                >
                  <Trash2 size={20} strokeWidth={2.5} />
                </button>
              </div>

              {/* Left/Top: Image area */}
              <div className="md:w-[40%] bg-slate-50 flex flex-col justify-center border-b-[3px] md:border-b-0 md:border-r-[3px] border-slate-200 relative overflow-hidden min-h-[200px] md:min-h-full">
                {memory.imageUrl ? (
                  <div className="absolute inset-0 z-0">
                    <img src={memory.imageUrl} alt="饭局照片" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                ) : (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 group-hover:scale-110 transition-transform duration-500">
                    <Camera size={64} />
                  </div>
                )}
              </div>
              
              {/* Right/Bottom: Details */}
            <div className="flex-1 p-6 md:p-8 flex flex-col justify-center space-y-6 bg-white relative">
              <div>
                <span className="inline-block px-4 py-1.5 rounded-xl font-black text-sm mb-3 tracking-wider bg-white border-[3px] border-slate-200 text-slate-500 shadow-[0_2px_0_#e2e8f0]">
                  {memory.date}
                </span>
                <h3 className="text-3xl font-black text-slate-800 group-hover:text-brand transition-colors">
                  {memory.title}
                </h3>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white rounded-2xl border-[3px] border-slate-100 shrink-0 shadow-sm group-hover:border-brand-light transition-colors">
                  <Utensils size={24} className="text-brand stroke-[2.5]" />
                </div>
                <div className="pt-1">
                  <p className="text-sm font-bold text-slate-400 mb-1">吃了什么</p>
                  <p className="font-extrabold text-slate-700 text-lg leading-relaxed">{memory.dishes}</p>
                </div>
              </div>

              <div className="pt-6 mt-2 border-t-[3px] border-dashed border-slate-200">
                <p className="text-brand font-bold text-xl tracking-wide flex items-start gap-2">
                  <span className="text-brand-light font-black text-3xl leading-none">"</span>
                  <span className="pt-1">{memory.memory}</span>
                  <span className="text-brand-light font-black text-3xl leading-none">"</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      )}

      {/* Record Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="card w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white shadow-2xl animate-in zoom-in-95 duration-300 p-0">
            {/* Modal Header */}
            <div className="sticky top-0 z-10 bg-white border-b-[3px] border-slate-100 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
                <Camera className="text-brand" size={28} />
                {editingId ? '修改饭局回忆' : '记录新饭局'}
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors border-2 border-transparent hover:border-slate-200"
              >
                <X size={24} strokeWidth={3} />
              </button>
            </div>

            {/* Modal Body: Form */}
            <div className="p-6 md:p-8 space-y-6">
              
              {/* Image Upload Area */}
              <input 
                type="file" 
                accept="image/png, image/jpeg" 
                className="hidden" 
                ref={fileInputRef}
                onChange={handleImageUpload}
              />
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`w-full h-48 md:h-64 border-[3px] border-dashed rounded-3xl flex flex-col items-center justify-center transition-all cursor-pointer group relative overflow-hidden ${
                  newMemory.imageUrl 
                    ? 'border-brand-light/30 bg-slate-50' 
                    : 'border-slate-300 bg-slate-50 text-slate-400 hover:text-brand hover:border-brand hover:bg-orange-50/50'
                }`}
              >
                {newMemory.imageUrl ? (
                  <>
                    <img src={newMemory.imageUrl} alt="预览图" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white font-bold tracking-widest bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
                        点击更换照片
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-4 bg-white rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform">
                      <ImagePlus size={32} strokeWidth={2} />
                    </div>
                    <span className="font-bold tracking-widest">点击上传饭局照片</span>
                    <span className="text-sm font-medium mt-1 opacity-70">支持 JPG, PNG 格式</span>
                  </>
                )}
              </div>

              {/* Form Fields Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-extrabold text-slate-700 flex items-center gap-2">
                    <CalendarDays size={18} className="text-brand" />
                    日期
                  </label>
                  <input 
                    type="date" 
                    value={newMemory.date}
                    onChange={(e) => setNewMemory({...newMemory, date: e.target.value})}
                    className="w-full p-4 bg-slate-50 border-[3px] border-slate-200 rounded-2xl font-bold text-slate-600 focus:outline-none focus:border-brand focus:bg-white transition-colors" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-extrabold text-slate-700 flex items-center gap-2">
                    <PartyPopper size={18} className="text-brand" />
                    饭局名称
                  </label>
                  <input 
                    type="text" 
                    value={newMemory.title}
                    onChange={(e) => setNewMemory({...newMemory, title: e.target.value})}
                    placeholder="比如：周五火锅夜..." 
                    className="w-full p-4 bg-slate-50 border-[3px] border-slate-200 rounded-2xl font-bold text-slate-600 focus:outline-none focus:border-brand focus:bg-white transition-colors placeholder:text-slate-400 placeholder:font-medium" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-extrabold text-slate-700 flex items-center gap-2">
                  <Utensils size={18} className="text-brand" />
                  吃了什么
                </label>
                <textarea 
                  rows={2} 
                  value={newMemory.dishes}
                  onChange={(e) => setNewMemory({...newMemory, dishes: e.target.value})}
                  placeholder="牛油火锅、毛肚、小酥肉..." 
                  className="w-full p-4 bg-slate-50 border-[3px] border-slate-200 rounded-2xl font-bold text-slate-600 focus:outline-none focus:border-brand focus:bg-white transition-colors placeholder:text-slate-400 placeholder:font-medium resize-none"
                ></textarea>
              </div>

              <div className="space-y-2">
                <label className="font-extrabold text-slate-700 flex items-center gap-2">
                  <Type size={18} className="text-brand" />
                  一句话总结
                </label>
                <textarea 
                  rows={2} 
                  value={newMemory.memory}
                  onChange={(e) => setNewMemory({...newMemory, memory: e.target.value})}
                  placeholder="“吃得好撑，下次还来！”" 
                  className="w-full p-4 bg-slate-50 border-[3px] border-slate-200 rounded-2xl font-bold text-slate-600 focus:outline-none focus:border-brand focus:bg-white transition-colors placeholder:text-slate-400 placeholder:font-medium resize-none"
                ></textarea>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 z-10 bg-slate-50 border-t-[3px] border-slate-100 p-6 flex justify-end gap-4 rounded-b-3xl">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-3 rounded-2xl font-extrabold text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-colors"
              >
                取消
              </button>
              <button 
                onClick={handleSave}
                className="btn-primary"
              >
                保存回忆
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};