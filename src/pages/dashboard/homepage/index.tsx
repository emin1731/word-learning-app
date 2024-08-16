export const HomePage = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-primary pb-4">
        Recent modules
      </h1>
      <div className="flex justify-start gap-4 mb-20">
        {/*Recent modules */}
        <div className="w-80 h-40 rounded-xl p-5 bg-white drop-shadow-l text-primary">
          <p className="text-xl font-semibold ">Name of the module </p>
          <p>20 words</p>
        </div>
        <div className="w-80 h-40 rounded-xl p-5 bg-white drop-shadow-l text-primary">
          <p className="text-xl font-semibold ">Name of the module </p>
          <p>20 words</p>
        </div>
      </div>
    </div>
  );
};
