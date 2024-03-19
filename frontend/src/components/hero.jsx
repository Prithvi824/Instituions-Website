import hero_img from "../assests/images/hero.png";

function Hero() {
  return (
    <section className="w-full flex justify-center items-center mt-2 mb-4">
      <div className=" bg-light_pink w-11/12 pl-12 pr-12 pt-12 pb-4 flex justify-center items-center rounded-xl relative">
        <img src={hero_img} alt="" className="ml-8" />
        <div className="absolute lg:top-8 lg:left-8 top-4 left-4">
          <h1 className="lg:text-3xl text-xl metro">
            Get Quality <br />
            Education
          </h1>
          <p className="lg:text-lg lg:w-64 metro opacity-90 text-xs w-40 mt-1">
            Get high quality education to help you advance in Your carrer.
          </p>
        </div>
        <p className="absolute lg:text-3xl lg:top-8 lg:right-8 top-4 right-4 metro text-xl">
          Oxzon Classes
        </p>
      </div>
    </section>
  );
}

export default Hero;
