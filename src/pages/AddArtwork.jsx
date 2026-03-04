import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";

const AddArtwork = () => {
  const { user } = useAuth();
  const { displayName, email, accessToken } = user;
  
  
  
  const handleAddArtwork = (e) => {
    e.preventDefault();
    const form = e.target;

    const artworkData = {
      image_url: form.image_url.value,
      title: form.title.value,
      category: form.category.value, 
      medium_tools: form.medium_tools.value,
      description: form.description.value,
      dimensions: form.dimensions.value || "N/A",
      price: parseFloat(form.price.value) || 0,
      visibility: form.visibility.value, 
      likes: 0,
      user_name: displayName,
      user_email: email,
      created_at: new Date(),
    };
    console.log(artworkData);

    fetch("http://localhost:5000/artworks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify(artworkData)
    })
    .then(res=>res.json())
    .then(data => {
        if(data.insertedId){
            toast.success("ArtWork added Successfully!")
            form.reset();
        }
        
    })
    
  }

  return (
    <section className="my-5 w-full max-w-350 mx-auto font-text px-4 md:px-2">
      <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-center">
        Add New <span className="text-primary">Art</span>work
      </h2>
      <form onSubmit={handleAddArtwork} className="flex flex-col max-w-4xl mx-auto border border-primary/40 p-8 rounded-2xl shadow-xl">
        {/* Img URL  */}
        <label className="mb-1 font-semibold opacity-80">Art Image URL</label>
        <input
          name="image_url"
          required
          type="text"
          placeholder="Image URL of your art"
          className="px-4 py-2 mb-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10">
          <div className="left">
            {/* Title */}
            <label className="mb-1 font-semibold opacity-80">Art Title</label>

            <input
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
              name="medium_tools"
              required
              placeholder="Medium/ Tools used behind this art"
              className="w-full px-4 py-2 mb-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />

            {/* Visibility */}
            <label className="mb-1 font-semibold opacity-80">Visibility</label>

            <select
              name="visibility"
              required
              className="w-full px-4 py-2 mb-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option className="bg-base-100" value="Public">Public</option>
              <option className="bg-base-100" value="Private">Private</option>
            </select>

            {/* User Name */}
            <label className="mb-1 font-semibold opacity-80">User Name</label>

            <input
              value={displayName}
              disabled
              className="w-full px-4 py-2 mb-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="right">
            {/* Category */}
            <label className="mb-1 font-semibold opacity-80">Category</label>

            <select
              name="category"
              required
              defaultValue=""
              className="w-full px-4 py-2 mb-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="" disabled>
                Select Category
              </option>
              <option className="bg-base-100" value="Cyberpunk">Cyberpunk</option>
              <option className="bg-base-100" value="Landscape">Landscape</option>
              <option className="bg-base-100" value="Abstract">Abstract</option>
              <option className="bg-base-100" value="Character Art">Character Art</option>
            </select>

            {/* price */}
            <label className="mb-1 font-semibold opacity-80">
              Price (optional)
            </label>

            <input
              name="price"
              placeholder="Price"
              className="w-full px-4 py-2 mb-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {/* Dimensions */}
            <label className="mb-1 font-semibold opacity-80">
              Dimensions (optional)
            </label>

            <input
              name="dimensions"
              placeholder="Dimension of your art"
              className="w-full px-4 py-2 mb-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {/* User Email */}
            <label className="mb-1 font-semibold opacity-80">User Email</label>

            <input
              value={email}
              disabled
              className="w-full px-4 py-2 mb-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
        <label className="mb-1 font-semibold opacity-80">Description</label>

        <textarea
          name="description"
          required
          className="w-full px-4 py-2 mb-5 border h-28 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button className="btn w-1/2 mx-auto btn-primary text-accent rounded-full mt-5 h-12">
          Add ArtWork
        </button>
      </form>
    </section>
  );
};

export default AddArtwork;
