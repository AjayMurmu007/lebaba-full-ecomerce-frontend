const SkeletonCard = () => (
    // A simple skeleton card component
    // <div className="animate-pulse bg-gray-200 rounded p-4 h-40 w-full md:w-60" />

    // Centered spinner
    //  <div className="flex justify-center items-center h-40">
    //   <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    // </div>

    // fancy skeleton card
    // <div className="flex justify-center items-center h-40">
    //   <div className="relative w-16 h-16">
    //     <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
    //     <div className="absolute inset-2 rounded-full border-4 border-primary border-b-transparent animate-spin-reverse" />
    //   </div>
    // </div>

    //glowing dot spinner
    // <div className="flex justify-center items-center h-40">
    //   <div className="relative w-5 h-5">
    //     <div className="absolute w-full h-full rounded-full bg-primary opacity-75 animate-ping" />
    //     <div className="relative w-full h-full rounded-full bg-primary" />
    //   </div>
    // </div>

    //Orbit spinner
   
    
    //dot bounse loader
    <div className="flex justify-center items-center h-20 space-x-2">
      <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
      <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
      <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
    </div>
);
export default SkeletonCard;