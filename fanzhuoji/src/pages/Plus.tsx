import { Sparkles, Bot, ListChecks, Image as ImageIcon } from 'lucide-react';

export const Plus = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto text-center py-10">
      <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-brand-light to-brand text-white rounded-full mb-2 shadow-lg">
        <Sparkles size={48} />
      </div>
      
      <div>
        <h1 className="text-4xl font-extrabold text-slate-800 mb-4 tracking-tight">
          开饭啦 <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand-light">Plus</span>
        </h1>
        <p className="text-slate-500 text-lg">
          让每一顿饭更好安排，也更值得记录。
        </p>
      </div>

      <div className="space-y-4 text-left mt-10">
        <div className="card p-6 flex gap-4 items-start border-2 border-transparent hover:border-orange-100 transition-colors">
          <div className="bg-orange-100 text-brand p-3 rounded-2xl">
            <Bot size={28} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-1">AI 帮你安排一桌饭</h3>
            <p className="text-slate-500">不知道吃什么？告诉 AI 你的喜好和冰箱里剩下的食材，自动生成搭配完美的一桌菜。</p>
          </div>
        </div>

        <div className="card p-6 flex gap-4 items-start border-2 border-transparent hover:border-orange-100 transition-colors">
          <div className="bg-orange-100 text-brand p-3 rounded-2xl">
            <ListChecks size={28} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-1">自动生成购物清单</h3>
            <p className="text-slate-500">根据这周的菜单自动计算所需食材，按蔬菜、肉类、调料分类，买菜不再遗漏。</p>
          </div>
        </div>

        <div className="card p-6 flex gap-4 items-start border-2 border-transparent hover:border-orange-100 transition-colors">
          <div className="bg-orange-100 text-brand p-3 rounded-2xl">
            <ImageIcon size={28} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-1">生成饭局纪念卡</h3>
            <p className="text-slate-500">为每一场有意义的饭局生成精美长图或卡片，一键分享给一起吃饭的朋友们。</p>
          </div>
        </div>
      </div>

      <div className="pt-8">
        <button className="btn-primary w-full md:w-auto md:px-12 py-4 text-lg shadow-xl shadow-brand/20 cursor-default">
          敬请期待
        </button>
      </div>
    </div>
  );
};
