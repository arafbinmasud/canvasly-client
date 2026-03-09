import { Link } from "react-router";
import artist1 from "../../assets/artist-1.webp";
import artist2 from "../../assets/artist-2.webp";
import artist3 from "../../assets/artist-3.webp";
import artist4 from "../../assets/artist-4.webp";

const TopArtists = () => {

  const artists = [
    {
      id: 1,
      name: "Elena Rosetti",
      role: "Classical Oil Portrait Artist",
      img: artist1,
    },
    {
      id: 2,
      name: "Julian Vance",
      role: "Master of Abstract Expressionism",
      img: artist2,
    },
    {
      id: 3,
      name: "Maya Thorne",
      role: "Surrealist Sculptor & Painter",
      img: artist3,
    },
    {
      id: 4,
      name: "Arlo Sterling",
      role: "Contemporary Digital Illustrator",
      img: artist4,
    },
  ];

  return (
    <section className="mt-5 mb-5 md:mb-20 w-full max-w-350 mx-auto font-text">

      <div className="container mx-auto w-full px-4 md:px-2">
        
        <div className="top flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0 ">
          <div className="left">
            <h4 className=" hidden border md:inline-block px-2 rounded-full border-primary text-sm bg-base-200 text-white/80">
              TRENDING NOW
            </h4>
            <h2 className="text-3xl md:text-5xl text-center md:text-left font-heading font-bold my-5">
              Meet the Visionaries <br />{" "}
              <span className="text-primary">of the</span> Week
            </h2>
            <p className=" max-w-175 opacity-60 text-center md:text-left">
              Our gallery is home to thousands of creators, but these few have
              captured the world's eye. See why these artists are the talk of
              the community and explore their latest collections.
            </p>
          </div>
          <div className="right">
            <Link to="/explore-artworks" className="btn btn-sm md:btn-md btn-primary text-accent rounded-full">
              Explore ArtWorks
            </Link>
          </div>
        </div>

        <div className="bottom my-10 grid gap-5 grid-cols-1 md:grid-cols-4">
          {artists.map((artist) => (
            <div
              key={artist.id}
              className="relative h-125 rounded-3xl shadow-sm overflow-hidden group"
            >
              <img
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                src={artist.img}
                alt={artist.name}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent"></div>

              <div className="absolute bottom-5 left-5 right-10 text-white">
                <h4 className="text-lg font-bold">{artist.name}</h4>
                <p className="opacity-80 text-sm">{artist.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopArtists;
