import CommunityHighlights from "../components/home-page/CommunityHighlights";
import FeaturedArts from "../components/home-page/FeaturedArts";
import Hero from "../components/home-page/Hero";
import TopArtists from "../components/home-page/TopArtists";

const Home = () => {
  return (
    <>
      <Hero />
      <FeaturedArts/>
      <TopArtists />
      <CommunityHighlights />
    </>
  );
};

export default Home;
