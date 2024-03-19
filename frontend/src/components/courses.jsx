import Subject from "../ui/subject_card";

import physics from "../assests/images/physics.png";
import Biology from "../assests/images/Biology.png";
import accounts from "../assests/images/accounts.png";
import chemistry from "../assests/images/chemistry.png";
import economics from "../assests/images/economics.png";
import maths from "../assests/images/maths.png";

function Courses() {
  return (
    <section className="flex flex-col justify-center items-center mt-6">
      <div className="lg:text-2xl pl-10 pr-10 pt-2 pb-2 bg-light_green rounded-xl drop-shadow-normal">
        What we Teach
      </div>
      <div className="lg:grid-cols-3 lg:grid-rows-2 w-11/12 grid grid-cols-2 grid-rows-3 gap-x-2 gap-y-3 mt-4 drop-shadow-normal">
        <Subject sub="Physics" color="AAC6FC" image={physics} />
        <Subject sub="Chemistry" color="f6e049" image={chemistry} />
        <Subject sub="Biology" color="AAC6FC" image={Biology} />
        <Subject sub="Accounts" color="f6e049" image={accounts} />
        <Subject sub="Economics" color="AAC6FC" image={economics} />
        <Subject sub="Maths" color="f6e049" image={maths} />
      </div>
    </section>
  );
}

export default Courses;
