import { Link } from "react-router";
import { FaArrowRight, FaUserAlt } from "react-icons/fa";

const ArtCard = ({ art }) => {
  const { _id, image_url, title, user_name, category } = art;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col font-text">
      <div className="relative h-64 overflow-hidden">
        <img
          src={image_url}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute top-4 left-4">
          <span className="bg-white/90 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase shadow-sm">
            {category}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col grow">
        <h3 className="text-xl font-heading font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-primary transition-colors">
          {title}
        </h3>

        <div className="flex items-center gap-2 text-gray-500 mb-6">
          <FaUserAlt className="text-xs" />
          <span className="text-sm font-medium">By {user_name}</span>
        </div>

        
        <div className="mt-auto">
          <Link
            className="flex items-center justify-center w-full gap-2 bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-primary transition-all duration-300 group/btn"
          >
            View Details
            <FaArrowRight className="text-sm transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArtCard;
