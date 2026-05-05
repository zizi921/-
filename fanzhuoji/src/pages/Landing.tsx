import { useNavigate } from 'react-router-dom';

export const Landing = () => {
  const navigate = useNavigate();

  const handleEnter = () => {
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* 主插图 */}
      <div 
        onClick={handleEnter}
        className="w-full max-w-[32rem] md:max-w-[48rem] cursor-pointer"
      >
        <img 
          src="/chef3.png" 
          alt="开饭啦" 
          className="w-full h-auto object-contain"
        />
      </div>

      {/* 提示文字 */}
      <p className="mt-8 text-slate-400 font-medium text-sm tracking-widest">
        点击厨师头像进入主页
      </p>
    </div>
  );
};
