export const Footer = () => {
  return (
    <footer className="bg-white dark:bg-black font-orbitron relative">
      <div className="flex items-center justify-center text-[clamp(48px,12vw,200px)] w-full h-[100px] md:h-[500px] font-orbitron">
        Lok Gubhaju
      </div>
      <div className="container mx-auto md:px-4 py-16 md:py-20">
        <p className="text-center text-gray-500">
          &copy; {new Date().getFullYear()} Lok Gubhaju. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
