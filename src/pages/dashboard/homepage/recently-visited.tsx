interface RecentModule {
  name: string;
  word_count: number;
}

const modules: RecentModule[] = [
  {
    name: "Module 1",
    word_count: 20,
  },
  {
    name: "Module 2",
    word_count: 18,
  },
  {
    name: "Module 3",
    word_count: 13,
  },
  {
    name: "Module 4",
    word_count: 44,
  },
];

// export const RecentlyVisited = ({ modules }: { modules: RecentModule[] }) => {
export const RecentlyVisited = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-primary-foreground pb-4">
        Recent modules
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-20">
        {modules.map((module: RecentModule) => (
          <div className="h-40 rounded-xl p-5 bg-white drop-shadow-l text-primary-foreground">
            <p className="text-xl font-semibold ">{module.name}</p>
            <p>{module.word_count} words</p>
          </div>
        ))}
      </div>
    </div>
  );
};
