import { useNavigate } from 'react-router-dom';

export const Landing = () => {
  const navigate = useNavigate();

  const handleEnter = () => {
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 relative z-10 overflow-hidden w-full">
      {/* 主插图 */}
      <div 
        onClick={handleEnter}
        className="w-full max-w-[24rem] md:max-w-[36rem] lg:max-w-[42rem] cursor-pointer relative z-10 hover:scale-105 transition-transform duration-500"
      >
        <img 
          src="/chef3.png" 
          alt="开饭啦" 
          className="w-full h-auto object-contain"
        />
      </div>

      {/* 提示文字 */}
      <p className="mt-8 text-slate-500 font-bold tracking-wide">
        纪录今天吃什么，也纪录我们一起吃过的饭。
      </p>
    </div>
  );
};
