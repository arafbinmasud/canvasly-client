import { useParams } from "react-router";
import userLogo from "../assets/user.png";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import ArtCard from "../components/ArtCard";

const ArtistProfile = () => {
  const { email } = useParams();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [arts, setArts] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [artist, setArtist] = useState({});

  useEffect(() => {
    setIsLoading(true);
    let loadedCount = 0;
    const checkLoading = () => {
      loadedCount++;
      if (loadedCount === 3) {
        setIsLoading(false);
      }
    };
    fetch(
      `https://canvasly-server.vercel.app/artist-works?artist_email=${email}&user_email=${user?.email}`,
      {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      },
    )
      .then((res) => res.json())
      .then((data) => {
        setArts(data);
        checkLoading();
      });

    fetch(`https://canvasly-server.vercel.app/followers?artist_email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        setFollowers(data);
        checkLoading();
      });

    fetch(`https://canvasly-server.vercel.app/artists/${email}`)
      .then((res) => res.json())
      .then((data) => {
        setArtist(data);
        checkLoading();
      });
  }, [email, user]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center text-primary">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  return (
    <section className="pb-20 w-full font-text">
      <div className="relative h-48 md:h-80 bg-linear-to-r from-primary to-secondary">
        <div className="absolute left-0 right-0 -bottom-16 flex justify-center">
          <div className="avatar">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-base-100 shadow-2xl">
              <img src={artist?.photo || userLogo} alt={artist?.name} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20 px-4 max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-heading font-bold">
          {artist?.name}
        </h1>

        <div className=" flex justify-center gap-8 my-6">
          <div className="text-center">
            <span className="block text-2xl font-bold text-primary">
              {arts.length}
            </span>
            <span className="text-xs uppercase tracking-widest opacity-60">
              ArtWorks
            </span>
          </div>
          <div className="divider divider-horizontal mx-0"></div>
          <div className="text-center">
            <span className="block text-2xl font-bold text-primary">
              {followers.length}
            </span>
            <span className="text-xs uppercase tracking-widest opacity-60">
              Followers
            </span>
          </div>
        </div>

        <div className="p-6 mb-10">
          <h3 className="text-lg font-bold mb-2 opacity-80">Artist Bio</h3>
          <p className="text-sm md:text-base leading-relaxed opacity-70 italic max-w-3xl mx-auto">
            "{artist.bio}"
          </p>
        </div>
      </div>

      <div className="max-w-350 mx-auto px-4 md:px-2 mb-10">
        <h3 className="text-xl font-bold mb-4 opacity-80 text-center md:text-left">
          Followers ({followers.length})
        </h3>

        <div className="flex flex-wrap justify-center md:justify-start gap-4">
          {followers.length > 0 ? (
            followers.map((f) => (
              <div
                key={f._id}
                className="flex items-center gap-3 p-2 pr-4 rounded-full border border-primary/20 shadow-sm"
              >
                <div className="avatar">
                  <div className="w-10 h-10 rounded-full ring ring-primary">
                    <img src={f.photo || userLogo} alt={f.name} />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-bold">{f.name}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm opacity-50 italic">No followers yet.</p>
          )}
        </div>
      </div>

      <div className="divider max-w-350 mx-auto px-4 md:px-2">Artworks</div>

      <div className="max-w-350 mx-auto px-4 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {arts.map((art) => (
            <ArtCard key={art._id} art={art}></ArtCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArtistProfile;
