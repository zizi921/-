import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChefHat, BookHeart, PartyPopper, CalendarDays } from 'lucide-react';
import { mockRecipes, mockMemories, mockMenu } from '../data/mock';

export const Home = () => {
  const navigate = useNavigate();
  const [randomDish, setRandomDish] = useState('');

  const handleRandomDish = () => {
    const random = mockRecipes[Math.floor(Math.random() * mockRecipes.length)];
    setRandomDish(random.name);
    // Auto clear after 3 seconds
    setTimeout(() => setRandomDish(''), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-8">
        <div className="inline-flex items-center justify-center p-4 bg-orange-100 text-brand rounded-full mb-2">
          <ChefHat size={48} />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight">
          开饭啦
        </h1>
        <p className="text-slate-500 text-lg md:text-xl max-w-md mx-auto">
          记录今天吃什么，也记录我们一起吃过的饭。
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 relative">
          <button onClick={handleRandomDish} className="btn-primary w-full sm:w-auto flex justify-center">
            随机一顿饭
          </button>
          <button onClick={() => navigate('/memories')} className="btn-secondary w-full sm:w-auto flex justify-center">
            记录一场饭局
          </button>
          
          {/* Toast for Random Dish */}
          {randomDish && (
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-6 py-2 rounded-full shadow-lg whitespace-nowrap animate-in slide-in-from-bottom-2 fade-in">
              不如今天吃：<span className="text-brand-light font-bold">{randomDish}</span>
            </div>
          )}
        </div>
      </section>

      {/* Today's Recommendation */}
      <section>
        <div className="card bg-gradient-to-br from-orange-50 to-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
            <ChefHat size={120} className="text-brand" />
          </div>
          <div className="relative z-10">
            <h2 className="text-sm font-bold text-brand mb-2 tracking-wider">今日推荐</h2>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">番茄牛腩饭</h3>
            <p className="text-slate-500">热乎乎的一碗，适合认真吃饭的一天。</p>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div onClick={() => navigate('/recipes')} className="card cursor-pointer hover:shadow-md hover:border-brand transition-all flex flex-col items-center text-center space-y-3">
          <div className="bg-orange-100 p-3 rounded-2xl text-brand">
            <BookHeart size={28} />
          </div>
          <h3 className="font-bold text-lg text-slate-800">记录我的拿手菜</h3>
          <p className="text-sm text-slate-500">把喜欢的菜谱都存下来</p>
        </div>
        <div onClick={() => navigate('/memories')} className="card cursor-pointer hover:shadow-md hover:border-brand transition-all flex flex-col items-center text-center space-y-3">
          <div className="bg-orange-100 p-3 rounded-2xl text-brand">
            <PartyPopper size={28} />
          </div>
          <h3 className="font-bold text-lg text-slate-800">收藏饭桌回忆</h3>
          <p className="text-sm text-slate-500">每一次相聚都值得纪念</p>
        </div>
        <div onClick={() => navigate('/menu')} className="card cursor-pointer hover:shadow-md hover:border-brand transition-all flex flex-col items-center text-center space-y-3">
          <div className="bg-orange-100 p-3 rounded-2xl text-brand">
            <CalendarDays size={28} />
          </div>
          <h3 className="font-bold text-lg text-slate-800">安排每周菜单</h3>
          <p className="text-sm text-slate-500">不再纠结每天吃什么</p>
        </div>
      </section>

      {/* Previews */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Memories */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800">最近饭局</h2>
            <button onClick={() => navigate('/memories')} className="text-sm text-brand font-medium">查看全部</button>
          </div>
          <div className="card space-y-4">
            {mockMemories.slice(0, 2).map(memory => (
              <div key={memory.id} className="border-b border-slate-100 last:border-0 pb-4 last:pb-0">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-slate-800">{memory.title}</h4>
                  <span className="text-xs text-slate-400">{memory.date}</span>
                </div>
                <p className="text-sm text-slate-500 truncate">{memory.dishes}</p>
              </div>
            ))}
          </div>
        </section>

        {/* This Week's Menu Preview */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800">本周菜单</h2>
            <button onClick={() => navigate('/menu')} className="text-sm text-brand font-medium">查看全部</button>
          </div>
          <div className="card space-y-3">
            {mockMenu.slice(0, 3).map((item, index) => (
              <div key={index} className="flex justify-between items-center bg-cream p-3 rounded-xl">
                <span className="font-medium text-slate-600">{item.day}</span>
                <span className="font-bold text-slate-800">{item.dish}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
