import HeroSection from './components/heroSection';

const Home = () => {
  return (
    <div className='flex flex-col justify-center items-center m-4'>
      <h1 className='text-3xl text-gray-700 font-bold'>Kanban Todo Board</h1>
      <HeroSection />
    </div>
  );
};

export default Home;
