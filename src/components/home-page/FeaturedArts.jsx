import { useEffect, useState } from "react";
import ArtCard from "../ArtCard";

const FeaturedArts = () => {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/featured-artworks")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setArtworks(data);
      });
  }, []);

  console.log(artworks);
  return (
    <section className="mt-5 mb-5 md:mb-20 w-full max-w-350 mx-auto font-text">
      <h2 className="text-3xl md:text-5xl text-center font-heading font-bold mt-5 mb-10">
        Featured <span className="text-primary">Art</span>works
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-4 md:px-2 ">
        {
            artworks.map(art => <ArtCard key={art._id} art={art}/>)
        }
      </div>
    </section>
  );
};

export default FeaturedArts;
