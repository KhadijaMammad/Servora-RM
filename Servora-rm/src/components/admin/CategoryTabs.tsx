export const CategoryTabs = ({ activeCat, setActiveCat, categories }: any) => (
  <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
    <button
      onClick={() => setActiveCat("All")}
      className={`px-6 py-2 rounded-xl font-medium shrink-0 ${activeCat === "All" ? "bg-blue-600 text-white" : "bg-white border"}`}
    >
      All
    </button>
    {categories?.map((cat: any) => (
      <button
        key={cat.id}
        onClick={() => setActiveCat(cat.id)}
        className={`px-6 py-2 rounded-xl font-medium shrink-0 ${activeCat === cat.id ? "bg-blue-600 text-white" : "bg-white border"}`}
      >
        {cat.name}
      </button>
    ))}
  </div>
);
