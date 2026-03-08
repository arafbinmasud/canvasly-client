import CommunityHighlights from "../components/home-page/CommunityHighlights";
import FeaturedArts from "../components/home-page/FeaturedArts";
import Hero from "../components/home-page/Hero";
import TopArtists from "../components/home-page/TopArtists";
import { Fade } from "react-awesome-reveal";

const Home = () => {
  return (
    <>
      <Hero />
      <Fade direction="up" triggerOnce={true} fraction={0.2}>
        <FeaturedArts />
      </Fade>
      <Fade direction="up" triggerOnce={true} fraction={0.2}>
        <TopArtists />
      </Fade>
      <Fade direction="up" triggerOnce={true} fraction={0.2}>
        <CommunityHighlights />
      </Fade>
    </>
  );
};

export default Home;
