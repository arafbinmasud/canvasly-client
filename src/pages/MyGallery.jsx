import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Link } from "react-router";

const MyGallery = () => {
  const { user } = useAuth();
  const [myArtworks, setMyArtworks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedArt, setSelectedArt] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/my-artworks?email=${user.email}`, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMyArtworks(data);
        setIsLoading(false);
      });
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Your art will be lost forever!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff9b51",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/all-artworks/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
              const remaining = myArtworks.filter((art) => art._id !== id);
              setMyArtworks(remaining);
            }
          });
      }
    });
  };

  const handleUpdate = (art) => {
    setSelectedArt(art);
    document.getElementById("my_modal_5").showModal();
  };

  const handleUpdateArt = (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedArt = {
      image_url: form.image_url.value,
      title: form.title.value,
      category: form.category.value,
      medium_tools: form.medium_tools.value,
      description: form.description.value,
      dimensions: form.dimensions.value || "N/A",
      price: parseFloat(form.price.value) || 0,
      visibility: form.visibility.value,
    };

    fetch(`http://localhost:5000/update-art/${selectedArt._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify(updatedArt),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          toast.success("Art updated successfully!");
          setMyArtworks((prevArtworks) =>
            prevArtworks.map((art) =>
              art._id === selectedArt._id ? { ...art, ...updatedArt } : art,
            ),
          );
          setSelectedArt(null)
          document.getElementById("my_modal_5").close();
        }
        if(data.modifiedCount===0) {
            toast.info('Updated With No Change!')
            document.getElementById("my_modal_5").close();
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

  if(myArtworks.length===0) {
    return <div className=" min-h-100 mx-auto text-3xl mt-10 capitalize text-center" >
        <p >No Artwork to show!  Please Add your first art </p>
        <Link className="btn btn-primary mt-5" to="/add-artworks"> Add Artwork </Link>
    </div>
    
  }

  return (
    <section className="my-5 w-full max-w-350 mx-auto font-text px-4 md:px-2">
      <h1 className="text-3xl md:text-4xl font-heading font-bold mb-6">
        My Art Gallery
      </h1>

      <div className="overflow-x-auto shadow-xl rounded-xl border border-gray-300">
        <table className="table">
          <thead className="bg-primary text-white font-bold text-sm uppercase">
            <tr className="text-center">
              <th>Sl No</th>
              <th>Image </th>
              <th>Title & Medium</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {myArtworks.map((art, i) => (
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
                  <p className="font-medium">{art.category}</p>
                </td>

                <td>
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => handleUpdate(art)}
                      type="button"
                      className="px-2 py-1.5 rounded-md font-medium transition-all duration-300 cursor-pointer bg-primary text-white hover:opacity-90 active:scale-95 text-xs"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(art._id)}
                      type="button"
                      className="px-2 py-1.5 rounded-md font-medium transition-all duration-300 cursor-pointer bg-red-500 text-white hover:opacity-80 text-xs active:scale-95"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle px-4"
      >
        <div className="modal-box max-w-300" key={selectedArt?._id}>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-center">
            Update <span className="text-primary">Art</span>work
          </h2>
          <form
            onSubmit={handleUpdateArt}
            className="flex flex-col max-w-4xl mx-auto border border-primary/40 p-8 rounded-2xl shadow-xl"
          >
            {/* Img URL  */}
            <label className="mb-1 font-semibold opacity-80">
              Art Image URL
            </label>
            <input
              defaultValue={selectedArt?.image_url}
              name="image_url"
              required
              type="text"
              placeholder="Image URL of your art"
              className="px-4 py-2 mb-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10">
              <div className="left">
                {/* Title */}
                <label className="mb-1 font-semibold opacity-80">
                  Art Title
                </label>

                <input
                  defaultValue={selectedArt?.title}
                  name="title"
                  required
                  placeholder="Title of your work"
                  className="w-full px-4 py-2 mb-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />

                {/* Medium/Tools */}
                <label className="mb-1 font-semibold opacity-80">
                  Medium/Tools
                </label>

                <input
                  defaultValue={selectedArt?.medium_tools}
                  name="medium_tools"
                  required
                  placeholder="Medium/ Tools used behind this art"
                  className="w-full px-4 py-2 mb-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />

                {/* Visibility */}
                <label className="mb-1 font-semibold opacity-80">
                  Visibility
                </label>

                <select
                  defaultValue={selectedArt?.visibility}
                  name="visibility"
                  required
                  className="w-full px-4 py-2 mb-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option className="bg-base-100" value="Public">
                    Public
                  </option>
                  <option className="bg-base-100" value="Private">
                    Private
                  </option>
                </select>

                {/* User Name */}
                <label className="mb-1 font-semibold opacity-80">
                  User Name
                </label>

                <input
                  value={user.displayName}
                  disabled
                  className="w-full px-4 py-2 mb-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="right">
                {/* Category */}
                <label className="mb-1 font-semibold opacity-80">
                  Category
                </label>

                <select
                  name="category"
                  required
                  defaultValue={selectedArt?.category}
                  className="w-full px-4 py-2 mb-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  <option className="bg-base-100" value="Cyberpunk">
                    Cyberpunk
                  </option>
                  <option className="bg-base-100" value="Landscape">
                    Landscape
                  </option>
                  <option className="bg-base-100" value="Abstract">
                    Abstract
                  </option>
                  <option className="bg-base-100" value="Character Art">
                    Character Art
                  </option>
                </select>

                {/* price */}
                <label className="mb-1 font-semibold opacity-80">
                  Price (optional)
                </label>

                <input
                  defaultValue={selectedArt?.price}
                  name="price"
                  placeholder="Price"
                  className="w-full px-4 py-2 mb-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {/* Dimensions */}
                <label className="mb-1 font-semibold opacity-80">
                  Dimensions (optional)
                </label>

                <input
                  defaultValue={selectedArt?.dimensions}
                  name="dimensions"
                  placeholder="Dimension of your art"
                  className="w-full px-4 py-2 mb-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {/* User Email */}
                <label className="mb-1 font-semibold opacity-80">
                  User Email
                </label>

                <input
                  value={user.email}
                  disabled
                  className="w-full px-4 py-2 mb-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <label className="mb-1 font-semibold opacity-80">Description</label>

            <textarea
              defaultValue={selectedArt?.description}
              name="description"
              required
              className="w-full px-4 py-2 mb-5 border h-28 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="btn md:w-1/2 mx-auto btn-primary text-accent rounded-full mt-5">
              Update ArtWork
            </button>
          </form>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-outline btn-primary">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </section>
  );
};

export default MyGallery;
