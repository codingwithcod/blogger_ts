import LoadingBlogCard from "./LoadingBlogCard";

const LoadingProfile = () => {
  return (
    <div className=" w-full h-full ">
      <div className="flex  flex-col bg-gray-50">
        <div className="top-box flex flex-col sm:flex-row justify-between  gap-5 p-2  md:max-w-[80%]  ">
          <div className="top-box flex gap-5 p-5 w-full sm:w-[50%]  ">
            {/* -------------------------- */}
            <div className="  rounded-md p-4 w-full    mx-auto">
              <div className="animate-pulse flex space-x-4">
                <div className="w-full flex gap-5">
                  <div className="rounded-full bg-slate-300 h-16 w-16 sm:h-24 sm:w-24"></div>
                  <div className="flex-1 space-y-4 py-1">
                    <div className="h-4 bg-slate-300 w-[30%] rounded"></div>
                    <div className="h-4 bg-slate-300 w-[50%] rounded"></div>
                    <div className="space-y-3">
                      <div className="h-7 bg-slate-300 w-[25%] rounded-3xl"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* -------------------------- */}
          </div>
          <div className="animate-pulse flex flex-col justify-center items-center p-1 w-full  sm:w-[15%]">
            <div className="h-4 bg-slate-300 w-[50%] sm:w-[90%] mt-4 rounded"></div>
          </div>
          <div className="animate-pulse flex flex-col justify-center items-center p-1  w-full  sm:w-[15%]">
            <div className="h-4 bg-slate-300 w-[50%] sm:w-[90%] mt-4 rounded"></div>
          </div>
        </div>

        <div className="p-2 pb-0 flex mx-5 gap-2 border-b"></div>
      </div>
      <div className="mt-10 ">
        <LoadingBlogCard />
        <LoadingBlogCard />
      </div>
    </div>
  );
};

export default LoadingProfile;
