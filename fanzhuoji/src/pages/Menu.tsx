import { useState } from 'react';
import { mockMenu, mockShoppingList } from '../data/mock';
import { CalendarDays, ShoppingBag, CheckSquare, Square } from 'lucide-react';

export const Menu = () => {
  const [shoppingList, setShoppingList] = useState(mockShoppingList);

  const toggleItem = (id: string) => {
    setShoppingList(prev => 
      prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item)
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <CalendarDays className="text-brand" />
          这周吃什么
        </h1>
        <button className="btn-primary py-2 px-4 text-sm">生成菜单</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Menu Plan */}
        <div className="md:col-span-2 space-y-3">
          {mockMenu.map((item, index) => (
            <div key={index} className="card py-4 flex items-center justify-between hover:border-brand transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg
                  ${index < 5 ? 'bg-orange-100 text-brand' : 'bg-slate-100 text-slate-500'}
                `}>
                  {item.day.replace('周', '')}
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">{item.day}</div>
                  <div className="text-lg font-bold text-slate-800">{item.dish}</div>
                </div>
              </div>
              <button className="text-brand hover:bg-orange-50 p-2 rounded-full transition-colors">
                换一个
              </button>
            </div>
          ))}
        </div>

        {/* Shopping List */}
        <div className="md:col-span-1">
          <div className="card bg-orange-50/50 sticky top-24">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4">
              <ShoppingBag className="text-brand" />
              购物清单
            </h2>
            <div className="space-y-1">
              {shoppingList.map(item => (
                <div 
                  key={item.id} 
                  className="flex items-center gap-3 p-3 hover:bg-white rounded-xl cursor-pointer transition-colors"
                  onClick={() => toggleItem(item.id)}
                >
                  {item.checked ? (
                    <CheckSquare className="text-brand shrink-0" />
                  ) : (
                    <Square className="text-slate-300 shrink-0" />
                  )}
                  <span className={`flex-1 transition-all ${item.checked ? 'text-slate-400 line-through' : 'text-slate-700 font-medium'}`}>
                    {item.item}
                  </span>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 btn-secondary py-2">
              添加食材
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
