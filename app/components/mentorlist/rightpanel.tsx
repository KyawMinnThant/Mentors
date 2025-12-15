import { Mentor } from "@/lib/types/type";
import Mentorlist from "./mentorlist";

type Props = {
  filteredMentors: Mentor[];
};

const Rightpanel: React.FC<Props> = ({ filteredMentors }) => {
  console.log(filteredMentors);
  return (
    <div>
      <Mentorlist mentor={filteredMentors} />
    </div>
  );
};

export default Rightpanel;
