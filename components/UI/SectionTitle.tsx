const SectionTitle: React.FC<{ title: string }> = props => {
    return (
      <div className="relative -z-10">
        <h2 className="pb-1 text-center text-black text-xl md:text-2xl lg:text-3xl uppercase font-semibold">
          {props.title}
        </h2>
        <div className="flex flex-row justify-center items-center">
            <div className="w-10 h-[3px] bg-gray-400 mr-2"></div>
            <div className="w-2 h-2 bg-secondaryColor transform rotate-45 mr-1"></div>
            <div className="w-2 h-2 bg-secondaryColor transform rotate-45"></div>
            <div className="w-2 h-2 bg-secondaryColor transform rotate-45 ml-1"></div>
            <div className="w-10 h-[3px] bg-gray-400 ml-2"></div>
        </div>
      </div>
    );
  };
  
  export default SectionTitle;
  