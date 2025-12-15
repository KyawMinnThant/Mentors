import MentorDetail from "@/app/components/home/mentordetail";

type MentorDetailProps = {
  params: Promise<{ id: string }>;
};

const MentorSingle = async ({ params }: MentorDetailProps) => {
  const { id } = await params;
  // console.log(await params);

  return (
    <main className="max-w-7xl mx-auto mt-10 px-4 md:px-10 flex gap-8">
      {/* Left side: Mentor info */}
      <MentorDetail mentorid={id} />
    </main>
  );
};

export default MentorSingle;
