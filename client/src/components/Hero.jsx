import HeroImage from "../assets/HeroImage.png";

const Hero = () => {
  return (
    <section className="flex gap-[35px] justify-between items-end text-textMain py-[30px] w-[80%] mx-auto">
      <div className="flex flex-col gap-6 max-lg:text-center">
        <h1 className="text-6xl font-bold">
          Read the most interesting articles
        </h1>
        <p className="text-xl leading-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua
        </p>
      </div>
      <img
        loading={"lazy"}
        className="w-[50%] max-lg:hidden"
        src={HeroImage}
        alt="People are reading an article"
      />
    </section>
  );
};

export default Hero;
