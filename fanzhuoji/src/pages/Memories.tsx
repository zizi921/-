import { mockMemories } from '../data/mock';
import { Users, Utensils, Calendar } from 'lucide-react';

export const Memories = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Utensils className="text-brand" />
          我们一起吃过的饭
        </h1>
        <button className="btn-primary py-2 px-4 text-sm">记录饭局</button>
      </div>

      <div className="space-y-4">
        {mockMemories.map(memory => (
          <div key={memory.id} className="card flex flex-col md:flex-row gap-4 hover:shadow-md transition-shadow">
            <div className="md:w-1/4 shrink-0 flex flex-col justify-center items-center p-4 bg-orange-50 rounded-2xl">
              <Calendar className="text-brand mb-2" size={24} />
              <span className="font-bold text-slate-800 text-lg">{memory.date}</span>
            </div>
            
            <div className="flex-1 space-y-3 py-2">
              <h3 className="text-xl font-bold text-slate-800">{memory.title}</h3>
              
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Users size={16} className="text-slate-400" />
                <span>{memory.people}</span>
              </div>
              
              <div className="flex items-start gap-2 text-sm text-slate-600">
                <Utensils size={16} className="text-slate-400 mt-0.5 shrink-0" />
                <p>{memory.dishes}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 mt-2">
                <p className="text-brand font-medium italic">"{memory.memory}"</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
