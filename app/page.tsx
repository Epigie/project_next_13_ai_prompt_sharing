import Feed from "@components/Feed";

const Home = () => (
  <section className="flex-col w-full flex-center">
    <h1 className="text-center head_text">
      Discover Specialised
      <br className="max-md:hidden" />
      <span className="text-center purple_gradient"> Hospitals Worldwide</span>
    </h1>
    <p className="text-center desc">
      Hospital finder helps you to discover world's best specialised hospitals
      with ease
    </p>

    <Feed />
  </section>
);

export default Home;
