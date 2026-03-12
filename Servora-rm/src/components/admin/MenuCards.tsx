export const MenuCard = ({ item }: { item: any }) => (
  <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition">
    <img
      src={item.imageUrl}
      alt={item.name}
      className="w-full h-48 object-cover"
    />
    <div className="p-5">
      <h3 className="font-bold text-lg text-blue-950">{item.name}</h3>
      <p className="text-sm text-slate-500 line-clamp-2">{item.description}</p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-blue-600 font-bold">{item.price} AZN</span>
        <button className="text-xs bg-slate-100 px-3 py-1 rounded-full text-slate-600">
          Edit
        </button>
      </div>
    </div>
  </div>
);
