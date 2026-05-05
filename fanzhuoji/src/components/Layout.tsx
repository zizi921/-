import { Outlet, NavLink } from 'react-router-dom';
import { ChefHat, BookHeart, PartyPopper, CalendarDays, Sparkles } from 'lucide-react';

const NavItemDesktop = ({ to, icon: Icon, label }: { to: string, icon: any, label: string }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `group flex items-center space-x-2 px-5 py-2.5 rounded-2xl transition-all duration-300 border-[3px] border-transparent ${
        isActive 
          ? 'bg-brand text-white font-extrabold shadow-[0_4px_0_#232221] -translate-y-1 is-active' 
          : 'text-slate-500 hover:bg-white hover:text-brand hover:-translate-y-1 hover:shadow-[0_4px_0_#3A3836] hover:border-brand bg-white'
      }`
    }
  >
    <Icon size={22} strokeWidth={2.5} className="transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-12 group-[.is-active]:scale-125 group-[.is-active]:-rotate-12" />
    <span className="tracking-wider">{label}</span>
  </NavLink>
);

const NavItem = ({ to, icon: Icon, label }: { to: string, icon: any, label: string }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `group flex flex-col items-center justify-center space-y-1 w-full py-2 transition-all duration-300 ${
        isActive ? 'text-brand font-extrabold -translate-y-2 is-active' : 'text-slate-400 hover:text-brand hover:-translate-y-1'
      }`
    }
  >
    <div className="relative p-2 bg-white rounded-xl group-[.is-active]:bg-slate-100 group-[.is-active]:shadow-[0_2px_0_#3A3836] border-[2px] border-transparent group-[.is-active]:border-brand transition-all duration-300">
      <Icon size={24} strokeWidth={2.5} className="transition-transform group-hover:scale-110 group-hover:-rotate-12 group-[.is-active]:scale-110 group-[.is-active]:-rotate-12" />
    </div>
    <span className="text-[11px] tracking-wider">{label}</span>
  </NavLink>
);

export const Layout = () => {
  return (
    <div className="min-h-screen bg-transparent flex flex-col font-sans">
      {/* Desktop Header */}
      <header className="hidden md:flex bg-white sticky top-0 z-50 border-b-[3px] border-brand shadow-sm overflow-visible">
        <div className="w-full flex items-stretch justify-between max-w-[1600px] mx-auto relative pl-0">
          {/* Single Custom Image on the left */}
          <div className="absolute left-8 bottom-0 flex-shrink-0 z-20 pointer-events-none overflow-hidden h-[115px]">
            <img 
              src="/nav-chefs.png" 
              alt="Chefs" 
              className="h-[135px] max-w-none mix-blend-multiply object-top"
            />
          </div>
          
          <div className="flex-1"></div>
          
          <div className="py-4 pr-8 shrink-0 flex items-center">
            <nav className="flex space-x-3 relative z-10">
              <NavItemDesktop to="/home" icon={ChefHat} label="今天吃啥" />
              <NavItemDesktop to="/recipes" icon={BookHeart} label="我的菜谱" />
              <NavItemDesktop to="/memories" icon={PartyPopper} label="💡家宴灵感" />
              <NavItemDesktop to="/menu" icon={CalendarDays} label="这周菜单" />
              <NavItemDesktop to="/plus" icon={Sparkles} label="Plus" />
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full pl-[250px] sm:pl-[300px] lg:pl-[350px] xl:pl-[400px] pr-4 lg:pr-8 py-8 md:py-12 pb-32 md:pb-12 max-w-[1400px] mx-auto">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t-[3px] border-brand z-50 pb-safe rounded-t-[2rem] shadow-[0_-8px_20px_rgba(0,0,0,0.1)]">
        <div className="flex justify-around items-center h-20 px-2">
          <NavItem to="/home" icon={ChefHat} label="今天吃啥" />
          <NavItem to="/recipes" icon={BookHeart} label="我的菜谱" />
          <NavItem to="/memories" icon={PartyPopper} label="💡家宴灵感" />
          <NavItem to="/menu" icon={CalendarDays} label="这周菜单" />
          <NavItem to="/plus" icon={Sparkles} label="Plus" />
        </div>
      </nav>
    </div>
  );
};
