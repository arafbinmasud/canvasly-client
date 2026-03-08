import { useEffect, useState } from "react";
import ArtCard from "../components/ArtCard";

const ExploreArtworks = () => {
  const categories = [
    "All Works",
    "Cyberpunk",
    "Landscape",
    "Abstract",
    "Character Art",
  ];
  const [activeCategory, setActiveCategory] = useState("All Works");
  const [artworks, setArtworks] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://canvasly-server.vercel.app/all-artworks?category=${activeCategory}&search=${search}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setArtworks(data);
        setIsLoading(false);
      });
  }, [activeCategory, search]);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchText = e.target.search.value.trim();
    setSearch(searchText);
  };
  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setSearch("");
    }
  };

  return (
    <section className="my-5 w-full max-w-350 mx-auto font-text px-4 md:px-2 ">
      <h1 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-center uppercase">
        Explore <span className="text-primary">Art</span>works
      </h1>
      {/* search div  */}
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSearch} className="w-full">
          <div className="flex w-full border border-gray-300 rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-all">
            <input
              onChange={handleInputChange}
              name="search"
              type="text"
              placeholder="Search by title or artist"
              className="w-full px-4 py-2 outline-none"
            />

            <button className="px-6 py-2 bg-primary text-white font-medium hover:bg-primary/90 transition-colors cursor-pointer whitespace-nowrap">
              Search
            </button>
          </div>
        </form>
      </div>

      {/* tabs div  */}
      <div className="my-5 flex flex-wrap justify-center items-center gap-3 md:gap-5 ">
        {categories.map((cat, i) => (
          <button
            key={i}
            onClick={() => setActiveCategory(cat)}
            className={`
                            px-6 py-2 rounded-lg font-medium transition-all duration-300 cursor-pointer
                            ${
                              activeCategory === cat
                                ? "bg-primary text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-500 hover:text-white"
                            }
                        `}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* arts div  */}
      {isLoading ? (
        <div className="flex flex-col min-h-60 items-center justify-center text-primary">
          <span className="loading loading-spinner loading-xl"></span>
        </div>
      ) : (
        <div className="mt-10">
          <p className="my-3 tracking-wide font-medium">
            Total <span className="text-primary">{artworks.length}</span>{" "}
            Artworks Found
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {artworks.map((art) => (
              <ArtCard key={art._id} art={art} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default ExploreArtworks;
