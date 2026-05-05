import { Outlet, NavLink } from 'react-router-dom';
import { ChefHat, BookHeart, PartyPopper, CalendarDays, Sparkles } from 'lucide-react';

const NavItem = ({ to, icon: Icon, label }: { to: string, icon: any, label: string }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex flex-col items-center justify-center space-y-1 w-full py-2 transition-colors ${
        isActive ? 'text-brand font-bold' : 'text-slate-400 hover:text-brand-light'
      }`
    }
  >
    <Icon size={24} />
    <span className="text-xs">{label}</span>
  </NavLink>
);

const NavItemDesktop = ({ to, icon: Icon, label }: { to: string, icon: any, label: string }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${
        isActive ? 'bg-orange-100 text-brand font-bold' : 'text-slate-500 hover:bg-orange-50 hover:text-brand-light'
      }`
    }
  >
    <Icon size={20} />
    <span>{label}</span>
  </NavLink>
);

export const Layout = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* Desktop Header */}
      <header className="hidden md:flex bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-orange-100 shadow-sm">
        <div className="max-w-5xl mx-auto w-full px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-brand font-bold text-xl">
            <ChefHat size={28} />
            <span>开饭啦</span>
          </div>
          <nav className="flex space-x-2">
            <NavItemDesktop to="/home" icon={ChefHat} label="今天吃啥" />
            <NavItemDesktop to="/recipes" icon={BookHeart} label="我的菜谱" />
            <NavItemDesktop to="/memories" icon={PartyPopper} label="饭桌回忆" />
            <NavItemDesktop to="/menu" icon={CalendarDays} label="这周菜单" />
            <NavItemDesktop to="/plus" icon={Sparkles} label="Plus" />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-6 md:py-10 pb-24 md:pb-10">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-orange-100 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50 pb-safe">
        <div className="flex justify-around items-center h-16 px-2">
          <NavItem to="/home" icon={ChefHat} label="今天吃啥" />
          <NavItem to="/recipes" icon={BookHeart} label="我的菜谱" />
          <NavItem to="/memories" icon={PartyPopper} label="饭桌回忆" />
          <NavItem to="/menu" icon={CalendarDays} label="这周菜单" />
          <NavItem to="/plus" icon={Sparkles} label="Plus" />
        </div>
      </nav>
    </div>
  );
};
