const LoadingBlogDetail = () => {
  return (
    <div className=" flex  justify-center items-center flex-row gap-1 sm:gap-5  border-b border-gray-300 m-2 md:m-5 h-auto  ">
      <div className=" w-[90vw]  ">
        <div className="  rounded-md p-4  mx-auto ">
          <div className="animate-pulse flex space-x-4">
            <div className="w-full flex gap-5">
              <div className="rounded-full bg-slate-300  h-12 w-12"></div>
              <div className="flex-1 space-y-6 py-1">
                <div className="h-6 bg-slate-300 w-[30%] rounded"></div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-6 bg-slate-300 rounded col-span-2"></div>
                    <div className="h-6 bg-slate-300 rounded col-span-1"></div>
                  </div>
                  <div className="h-6 bg-slate-300 rounded"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="animate-pulse rounded-sm mt-5 bg-slate-300  w-full h-[46vh] "></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingBlogDetail;
