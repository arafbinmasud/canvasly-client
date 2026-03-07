import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import userLogo from "../assets/user.png";
import Swal from "sweetalert2"; 
import { toast } from "react-toastify";

const MyProfile = () => {
  const { user } = useAuth();
  const [artCount, setArtCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [dbUser, setDbUser] = useState(null);
  const [bioText, setBioText] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/artworks-count/${user.email}`)
      .then((res) => res.json())
      .then((data) => setArtCount(data));

    fetch(`http://localhost:5000/users/${user.email}`, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setDbUser(data);
        setBioText(data.bio);
        setIsLoading(false);
      });
  }, [user]);

  const handleBioUpdate = (e) => {
    e.preventDefault();
    console.log(bioText);

    fetch("http://localhost:5000/users/update-bio", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify({
        email: user.email,
        bio: bioText,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.modifiedCount) {
          setDbUser({ ...dbUser, bio: bioText });
          document.getElementById("bio_modal").close();
          Swal.fire("Success", "Bio updated successfully!", "success");
        }
        if (data.modifiedCount === 0) {
          toast.info("Updated with no change");
          document.getElementById("bio_modal").close();
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
    <section className="my-5 w-full max-w-350 mx-auto font-text px-4 md:px-2">
      <h1 className="text-3xl md:text-4xl font-heading font-bold mb-6">
        My Profile
      </h1>

      <div className="flex justify-center items-center min-h-[70vh] px-4">
        <div className="card w-full max-w-md bg-base-100 shadow-2xl border border-primary/10 overflow-hidden">
          <div className="h-32 bg-linear-to-r from-primary to-secondary"></div>

          <div className="px-6 pb-8">
            <div className="relative flex justify-center">
              <div className="avatar -mt-16">
                <div className="w-32 h-32 rounded-full border-4 border-base-100 shadow-lg">
                  <img src={user.photoURL || userLogo} alt="Profile" />
                </div>
              </div>
            </div>

            <div className="text-center mt-4">
              <h2 className="text-2xl font-bold">{user.displayName}</h2>
              <p className="text-sm opacity-60 italic">{user.email}</p>
            </div>

            <div className="divider opacity-50"></div>

            <div className="flex items-center justify-around mb-6 ">
              <div className="text-center">
                <span className="block text-2xl font-bold text-primary">
                  {artCount}
                </span>
                <span className="text-xs uppercase tracking-widest opacity-60">
                  Total Works
                </span>
              </div>
              <div className="text-center border-l pl-10">
                <span className="block text-2xl font-bold text-primary font-heading">
                  Artist
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="border border-gray-300 shadow-sm p-4 rounded-xl relative group">
                <h3 className="text-sm font-bold mb-2 opacity-70">Your Bio</h3>
                <p className="text-sm leading-relaxed">{dbUser?.bio}</p>
                <button
                  className="btn btn-xs btn-primary btn-outline mt-3 rounded-full"
                  onClick={() =>
                    document.getElementById("bio_modal").showModal()
                  }
                >
                  Update Bio
                </button>
              </div>
            </div>
          </div>
        </div>

        <dialog id="bio_modal" className="modal modal-middle px-4">
          <div className="modal-box w-full max-w-md">
            <h3 className="font-bold text-lg">Update Your Bio</h3>

            <form onSubmit={handleBioUpdate}>
              <textarea
                value={bioText}
                onChange={(e) => setBioText(e.target.value)}
                required
                placeholder="Tell the world about your art..."
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-full min-h-30 mt-4"
              ></textarea>

              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setBioText(dbUser.bio);
                    document.getElementById("bio_modal").close();
                  }}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </section>
  );
};

export default MyProfile;
