import { Link } from "react-router";
import img1 from "../../assets/c_img-1.jpg";
import img3 from "../../assets/c_img-3.jpg";

const CommunityHighlights = () => {
  return (
    <section className="mt-5 mb-5 md:mb-20 w-full max-w-350 mx-auto font-text">
      <div className="top flex flex-col md:flex-row items-center justify-between px-4 md:px-2 mb-20 gap-10">
        <div className="left">
          <h4 className=" hidden border md:inline-block px-2 rounded-full border-primary text-sm bg-base-200 text-white/80">
            Empowering Creators
          </h4>
          <h2 className="text-3xl md:text-5xl text-center md:text-left font-heading font-bold my-5">
            Where Passion <span className="text-primary">Meets</span>{" "}
            Opportunity
          </h2>
          <p className=" max-w-175 opacity-60 text-center md:text-justify">
            Canvasly is more than just a gallery; it's a home for visionaries.
            We provide the tools and the platform for emerging artists to
            showcase their soul to a global audience. Whether you are a
            traditional painter or a digital wizard, your journey starts here.
          </p>
        </div>

        <div className="right max-h-120 max-w-120 rounded-3xl overflow-hidden">
          <img className="h-full w-full object-cover" src={img1} alt="artist" />
        </div>
      </div>

      <div className="bottom flex flex-col-reverse md:flex-row items-center justify-between px-4 md:px-2 gap-10">
        <div className="left max-h-120 max-w-120 rounded-3xl overflow-hidden">
          <img className="h-full w-full object-cover" src={img3} alt="" />
        </div>
        <div className="right">
          <h4 className=" hidden border md:inline-block px-2 rounded-full border-primary text-sm bg-base-200 text-white/80">
            Join the Movement
          </h4>
          <h2 className="text-3xl md:text-5xl text-center md:text-left font-heading font-bold my-5">
            A Thriving <span className="text-primary">Global Art</span> <br />{" "}
            Community
          </h2>
          <p className=" max-w-175 opacity-60 text-center md:text-justify">
            Connect with thousands of fellow artists and collectors from around
            the world. Share your techniques, get inspired by weekly challenges,
            and grow your professional career through our dedicated community
            support and exhibitions.
          </p>
        
        </div>
      </div>
    </section>
  );
};

export default CommunityHighlights;
