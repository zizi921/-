import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChefHat, UtensilsCrossed, RefreshCw, Plus, Heart, Sparkles, Utensils, Coffee, Pizza, Soup, Users } from 'lucide-react';
import { mockRecipes } from '../data/mock';

export const Home = () => {
  const navigate = useNavigate();
  const [randomDish, setRandomDish] = useState('');
  const [activeFilter, setActiveFilter] = useState('随便吃');

  const filters = ['随便吃', '家常菜', '快手饭', '清淡点', '重口味', '一人食', '朋友聚餐', '想喝汤'];
  
  const scenarios = [
    { title: '下班很累', desc: '省事、热乎、少洗碗', icon: Coffee },
    { title: '想认真吃饭', desc: '有菜有肉，有仪式感', icon: Heart },
    { title: '不想出门', desc: '冰箱里有什么就做什么', icon: Pizza },
    { title: '朋友来家里', desc: '好看、好吃、不容易翻车', icon: Users },
  ];

  const handleRandomDish = () => {
    const random = mockRecipes[Math.floor(Math.random() * mockRecipes.length)];
    setRandomDish(random.name);
    setTimeout(() => setRandomDish(''), 3000);
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto">
      
      {/* 第一屏内容：左右布局 */}
      <section className="flex flex-col md:flex-row gap-8 items-stretch">
        
        {/* 左侧：标题与操作 */}
        <div className="flex-1 flex flex-col justify-center items-start space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 border-2 border-brand-light rounded-full text-brand font-bold text-sm">
            <Sparkles size={16} />
            今天也要好好吃饭
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black text-slate-800 tracking-wider drop-shadow-sm">
            今天吃啥？
          </h1>
          
          <p className="text-slate-500 text-lg md:text-xl max-w-md font-bold tracking-wide leading-relaxed">
            不想纠结的时候，让饭桌记帮你随机一顿好好吃的饭。
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4 w-full md:w-auto relative">
            <button onClick={handleRandomDish} className="btn-primary flex items-center gap-2">
              <RefreshCw size={20} className="stroke-[3]" />
              帮我随机
            </button>
            <button className="btn-secondary flex items-center gap-2">
              <UtensilsCrossed size={20} className="stroke-[3]" />
              按条件选
            </button>

            {/* Toast for Random Dish */}
            {randomDish && (
              <div className="absolute -top-14 left-0 bg-slate-800 text-white px-8 py-3 rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.2)] whitespace-nowrap animate-in slide-in-from-bottom-4 fade-in font-bold tracking-widest text-lg z-50">
                不如今天吃：<span className="text-brand-light">{randomDish}</span>
              </div>
            )}
          </div>
        </div>

        {/* 右侧：今日推荐卡片 */}
        <div className="flex-1">
          <div className="card h-full flex flex-col justify-between bg-gradient-to-br from-white to-orange-50/50">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-black text-brand tracking-widest flex items-center gap-2">
                <ChefHat size={20} className="stroke-[2.5]" />
                今日推荐
              </h2>
            </div>
            
            <div className="flex-1 flex items-center justify-center py-6 relative">
              <div className="absolute opacity-10 blur-[2px] right-0 top-0 text-[100px]">🍅</div>
              <div className="absolute opacity-10 blur-[2px] left-0 bottom-0 text-[80px]">🍚</div>
              <div className="text-center z-10">
                <h3 className="text-4xl font-black text-slate-800 mb-3">番茄牛腩饭</h3>
                <p className="text-slate-500 font-bold tracking-wide mb-6">热乎乎的一碗，适合认真吃饭的一天。</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {['家常', '下饭', '晚餐', '约 45 分钟'].map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white border-2 border-brand-light/30 text-slate-600 text-sm rounded-xl font-bold">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t-2 border-brand-light/20 mt-4">
              <button className="flex-1 py-3 px-4 rounded-xl font-extrabold text-slate-600 bg-white border-[3px] border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all flex justify-center items-center gap-2">
                <RefreshCw size={18} className="stroke-[2.5]" />换一道
              </button>
              <button className="flex-1 py-3 px-4 rounded-xl font-extrabold text-white bg-brand border-[3px] border-brand-dark hover:bg-brand-dark transition-all flex justify-center items-center gap-2 shadow-[0_4px_0_#232221] active:translate-y-1 active:shadow-none">
                <Plus size={18} className="stroke-[2.5]" />加入本周菜单
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 今天想吃什么类型 */}
      <section className="space-y-4">
        <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
          <Utensils size={24} className="text-brand" />
          今天想吃什么类型？
        </h3>
        <div className="flex flex-wrap gap-3">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2.5 rounded-2xl font-extrabold transition-all border-[3px] hover:-translate-y-1 ${
                activeFilter === filter
                  ? 'bg-slate-800 text-white border-slate-900 shadow-[0_4px_0_#000]'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-brand-light hover:text-brand shadow-[0_4px_0_#e2e8f0]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      {/* 按场景推荐 */}
      <section className="space-y-4">
        <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
          <Soup size={24} className="text-brand" />
          按场景推荐
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {scenarios.map((scene, idx) => (
            <div key={idx} className="card p-5 cursor-pointer group flex flex-col gap-3">
              <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-brand group-hover:scale-110 transition-transform">
                <scene.icon size={24} strokeWidth={2.5} />
              </div>
              <div>
                <h4 className="font-black text-lg text-slate-800 mb-1 group-hover:text-brand transition-colors">{scene.title}</h4>
                <p className="text-sm text-slate-500 font-bold tracking-wide">{scene.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
