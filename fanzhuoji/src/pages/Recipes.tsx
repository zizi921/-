import { mockRecipes } from '../data/mock';
import { Clock, ChefHat, Info } from 'lucide-react';

export const Recipes = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <ChefHat className="text-brand" />
          我的拿手菜
        </h1>
        <button className="btn-primary py-2 px-4 text-sm">添加菜谱</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockRecipes.map(recipe => (
          <div key={recipe.id} className="card hover:shadow-md transition-shadow cursor-pointer group">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-bold text-slate-800 group-hover:text-brand transition-colors">
                {recipe.name}
              </h3>
              <div className="flex gap-2">
                {recipe.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-orange-100 text-brand text-xs rounded-md font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
              <div className="flex items-center gap-1">
                <Clock size={16} />
                <span>{recipe.time}</span>
              </div>
              <div className="flex items-center gap-1">
                <ChefHat size={16} />
                <span>{recipe.difficulty}</span>
              </div>
            </div>

            <div className="bg-cream p-3 rounded-xl flex items-start gap-2 text-sm text-slate-600">
              <Info size={16} className="text-brand mt-0.5 shrink-0" />
              <p>{recipe.note}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
