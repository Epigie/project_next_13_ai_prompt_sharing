import Feed from "@components/Feed";
import Finder from "@components/Finder";

const FinderResultsPage = () => (
  <section className="flex-col w-full flex-center">
    <Finder />
    <Feed />
  </section>
);

export default FinderResultsPage;
