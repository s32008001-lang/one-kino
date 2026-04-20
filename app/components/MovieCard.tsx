const MovieCard = ({ title, image, age, genre }: any) => {
  return (
    <div className="group relative rounded-xl overflow-hidden bg-zinc-900 cursor-pointer transition hover:scale-105">

      {/* IMAGE */}
      <img
        src={image}
        className="w-full h-[250px] object-cover group-hover:scale-110 transition duration-500"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

      {/* INFO */}
      <div className="absolute bottom-0 p-3 w-full">
        <span className="text-[10px] bg-cyan-500 px-2 py-1 rounded-full">
          {age} yosh
        </span>

        <h3 className="text-sm font-bold mt-1">{title}</h3>
        <p className="text-xs text-gray-300">{genre}</p>

        <button className="mt-2 text-[10px] bg-white text-black px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition">
          ▶ Ko‘rish
        </button>
      </div>

    </div>
  );
};

export default MovieCard;