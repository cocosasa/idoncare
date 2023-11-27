import TopMenu from "../components/main/TopMenu";
import BottomMenu from "../components/main/BottomMenu";
import BottomNav from "../components/common/BottomNav";

const Home = () => {
  return (
    <div>
      <TopMenu />
      <div className="mx-8">
        <BottomMenu />
      </div>
      <BottomNav />
    </div>
  );
};

export default Home;
