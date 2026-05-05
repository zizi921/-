import { useState } from 'react';
import { UtensilsCrossed, RefreshCw, Heart, Utensils, Coffee, Pizza, Soup, Users } from 'lucide-react';
import { mockRecipes } from '../data/mock';

export const Home = () => {
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
    <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto">
      
      {/* 第一屏内容：左右布局 */}
      <section className="flex flex-col md:flex-row gap-6 items-center">
        
        {/* 左侧：标题与操作 */}
        <div className="flex-1 flex flex-col justify-center items-start space-y-6">
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

        {/* 右侧：插画 */}
        <div className="flex-1 flex items-center justify-center relative">
          <img 
            src="/today-special.png" 
            alt="开饭啦" 
            className="w-full max-w-sm md:max-w-md h-auto object-contain mix-blend-multiply"
          />
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
      <section className="space-y-4 pb-8">
        <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
          <Soup size={24} className="text-brand" />
          按场景推荐
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {scenarios.map((scene, idx) => (
            <div key={idx} className="card p-3 md:p-4 cursor-pointer group flex flex-col gap-2">
              <div className="w-10 h-10 rounded-xl flex items-center justify-start text-brand group-hover:scale-110 transition-transform">
                <scene.icon size={24} strokeWidth={2.5} />
              </div>
              <div>
                <h4 className="font-black text-base text-slate-800 mb-0.5 group-hover:text-brand transition-colors">{scene.title}</h4>
                <p className="text-xs text-slate-500 font-bold tracking-wide">{scene.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
