import { getCourse } from "@/actions/getCourse";
import { getTaskBySlug } from "@/actions/getTaskBySlug";
import VideoComponent from "@/components/classroom/video";

type tParams = Promise<{ course: string; slug: string }>;

export default async function LessonPage(props: { params: tParams }) {
  const { slug, course } = await props.params;

  console.log(course);

  const taskData = await getTaskBySlug(slug);
  const courseData = await getCourse(course);

  console.log(courseData, "COURSE");

  return (
    <div>
      {taskData?.type === "video" && (
        <VideoComponent
          title={taskData.title}
          description={taskData.description}
          src={taskData.video_url}
        />
      )}
      {taskData?.type === "article" && <p>Artigo bb</p>}
      {taskData?.type === "quiz" && <p>Quiz bb</p>}
    </div>
  );
}
