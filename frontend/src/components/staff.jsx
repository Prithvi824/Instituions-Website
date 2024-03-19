import t1 from "../assests/images/teacher-1.png";
import t2 from "../assests/images/teacher-2.png";
import t3 from "../assests/images/teacher-3.png";

import Teacher_card from "../ui/teacher_card";

function Staff() {
  return (
    <section className="flex flex-col justify-center items-center mt-8">
      <div className="pl-12 pr-12 pt-3 pb-3 bg-light_peach rounded-lg drop-shadow-normal">
        Our Proud Staff
      </div>
      <div className="flex flex-col justify-center items-center">
        <Teacher_card
          background={"#FBA1B7"}
          subject={"Maths Teacher"}
          image={t1}
          name={"Rakesh sir"}
          description={
            "With his innovative teaching methods and unwavering dedication, Mr. Rakesh has transformed the way students engage with mathematics. "
          }
        />

        <Teacher_card
          background={"#FFCACC"}
          subject={"Accounts Teacher"}
          image={t2}
          name={"Anurag Sir"}
          description={
            "With his comprehensive understanding of accounting principles and his dedication to student success, Mr. Anurag creates a dynamic and engaging learning environment."
          }
        />

        <Teacher_card
          background={"#FBA1B7"}
          subject={"Maths Teacher"}
          image={t3}
          name={"Sunita Mam"}
          description={
            "Mr. Sunita’s passion for physics is evident in her engaging lessons and hands-on approach to learning. She has a unique ability to simplify complex concepts."
          }
        />
      </div>
    </section>
  );
}

export default Staff;
