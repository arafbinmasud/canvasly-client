import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyFavorites = () => {
  const [myFavorites, setMyFavorites] = useState([]);
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://canvasly-server.vercel.app/my-favorites?email=${user.email}`,
      {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      },
    )
      .then((res) => res.json())
      .then((data) => {
        setMyFavorites(data);
        setIsLoading(false);
      });
  }, [user]);

  const handleDelete = (id) => {
    
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff9b51",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://canvasly-server.vercel.app/favorites/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              setMyFavorites((prevFavorites) =>
                prevFavorites.filter((art) => art._id !== id),
              );
              Swal.fire({
                title: "Remove!",
                text: "Art is Removed from Favorite",
                icon: "success",
              });
            }
          });
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

  if (myFavorites.length === 0) {
    return (
      <div className=" min-h-100 mx-auto text-3xl mt-10 font-text text-center">
        <p className="px-1">No favorite artwork yet. Add your first one </p>
        <Link className="btn btn-primary mt-5" to="/explore-artworks">
          {" "}
          Explore ArtWorks{" "}
        </Link>
      </div>
    );
  }
  return (
    <section className="my-5 w-full max-w-350 mx-auto font-text px-4 md:px-2">
      <h1 className="text-3xl md:text-4xl font-heading font-bold mb-6">
        My Favorite Artworks
      </h1>

      <div className="overflow-x-auto shadow-xl rounded-xl border border-gray-300">
        <table className="table">
          <thead className="bg-primary text-white font-bold text-sm uppercase">
            <tr className="text-center">
              <th>Sl No</th>
              <th>Image </th>
              <th>Title & Medium</th>
              <th>Artist Name</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {myFavorites.map((art, i) => (
              <tr key={art._id} className="text-center">
                <td className="font-bold text-primary">{i + 1}</td>

                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle h-16 w-16">
                      <img src={art.image_url} alt={art.title} />
                    </div>
                  </div>
                </td>

                <td>
                  <p className="font-bold text-lg">{art.title}</p>
                  <p className="text-xs opacity-60 italic">
                    {art.medium_tools}
                  </p>
                </td>
                <td>
                  <p className="font-bold text-lg">{art.artist_name}</p>
                </td>

                <td>
                  <p className="font-medium">{art.category}</p>
                </td>

                <td>
                  <button
                    onClick={() => handleDelete(art._id)}
                    type="button"
                    className="px-2 py-1.5 rounded-md font-medium transition-all duration-300 cursor-pointer bg-red-500 text-white hover:opacity-80 text-xs active:scale-95"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default MyFavorites;
