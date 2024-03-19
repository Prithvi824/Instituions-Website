import Hero from "../components/hero";
import Staff from "../components/staff";
import Courses from "../components/courses";
import About from "../components/about";
import Contact from "../components/contact";

function Index() {
  return (
    <section className="w-full flex flex-col justify-center items-center">
      <Hero />
      <Courses />
      <Staff />
      <About />
      <Contact />
    </section>
  );
}

export default Index;
