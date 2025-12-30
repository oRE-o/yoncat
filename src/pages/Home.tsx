import Hero from "../components/sections/Hero";

const Home = () => {
  return (
    // Navbar가 fixed이므로 -mt-24 같은 음수 마진은 상황에 따라 조절이 필요할 수 있어.
    // 하지만 보내준 코드 스타일대로라면 Hero 자체가 min-h-screen이라 괜찮을 거야!
    <div className="animate-fade-in space-y-20">
      <Hero />
      {/* 필요하다면 여기에 "Featured Projects" 같은 섹션을 추가해도 좋아 */}
    </div>
  );
};

export default Home;
