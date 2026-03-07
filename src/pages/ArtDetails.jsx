import { FaHeart, FaThumbsUp } from "react-icons/fa";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
const ArtDetails = () => {
  const { id } = useParams();
  const [artwork, setArtwork] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [artCount, setArtCount] = useState(0);
  const { user } = useAuth();

  const {
    description,
    image_url,
    medium_tools,
    title,
    artist_email,
    artist_name,
    artist_photo,
    category,
    likes,
  } = artwork;

  useEffect(() => {
    fetch(`http://localhost:5000/artwork/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setArtwork(data);
      });
  }, [id, user]);

  useEffect(() => {
    if (artist_email) {
      fetch(`http://localhost:5000/artworks-count/${artist_email}`)
        .then((res) => res.json())
        .then((data) => {
          setArtCount(data);
          setIsLoading(false);
        });
    }
  }, [artist_email]);

  const handleLikeCount = () => {
    fetch(`http://localhost:5000/likes-count/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify({ user_email: user.email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          setArtwork((prev) => ({ ...prev, likes: prev.likes + 1 }));
        }
      });
  };

  const handleAddToFavorites = () => {
    const { _id } = artwork;
    const favoriteData = {
      artwork_id: _id,
      user_email: user.email,
      added_at: new Date(),
    };

    fetch("http://localhost:5000/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify(favoriteData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          toast.success("Successfully Added to Favorites!");
        } else if (data.message === "Already in favorites") {
          toast.error("Art is Already in Favorites");
        }
      });
  };
  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center text-primary">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }
  return (
    <section className="mt-5 mb-5 md:mb-20 w-full max-w-350 mx-auto font-text px-4 md:px-2">
      <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2 uppercase">
        {title}
      </h1>
      <div className="w-full flex flex-col md:flex-row gap-5 md:gap-20">
        <div className="left overflow-hidden rounded-3xl max-h-120 md:max-h-180 flex-1">
          <img
            className="w-full h-full object-cover"
            src={image_url}
            alt={title}
          />
        </div>
        <div className="right flex-1">
          <p className="font-medium text-lg tracking-wider ">
            {" "}
            <span className="font-bold">Artist</span> : {artist_name}
          </p>
          <p className="font-medium opacity-90">
            <span className="font-bold">Total Artworks</span> : {artCount}{" "}
          </p>
          <div className="rounded-lg overflow-hidden border border-primary h-50 w-50 my-2">
            <img
              className="w-full h-full object-cover"
              src={artist_photo}
              alt="Artist Photo"
            />
          </div>
          <p className="font-medium opacity-90">
            <span className="font-bold">Medium</span> : {medium_tools}{" "}
          </p>
          <p className="font-medium opacity-90">
            <span className="font-bold">Category</span> : {category}{" "}
          </p>
          <p className="font-medium opacity-90 ">
            <span className="font-bold">Description</span> : {description}{" "}
          </p>

          <div className="mt-5 flex items-center justify-center gap-5">
            <button
              onClick={handleLikeCount}
              type="button"
              className=" flex items-center justify-center gap-2 px-3 md:px-6 py-2 rounded-lg font-medium transition-all duration-300 cursor-pointer bg-primary text-white hover:opacity-90 active:scale-95 md:w-full"
            >
              {" "}
              <FaThumbsUp /> Like ({likes})
            </button>
            <button
              onClick={handleAddToFavorites}
              type="button"
              className=" flex items-center justify-center gap-2 px-3 md:px-6 py-2 rounded-lg font-medium transition-all duration-300 cursor-pointer border-2 border-primary hover:opacity-90 hover:bg-primary hover:text-white active:scale-95 md:w-full"
            >
              {" "}
              <FaHeart /> Add to Favorites
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtDetails;
