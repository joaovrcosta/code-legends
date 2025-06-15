// import { getCourse } from "@/actions/getCourse";
import { getTaskBySlug } from "@/actions/getTaskBySlug";
import { ComponentsArticle } from "@/components/classroom/article/components";
import VideoComponent from "@/components/classroom/video";

type tParams = Promise<{ course: string; slug: string }>;

export default async function LessonPage(props: { params: tParams }) {
  const { slug } = await props.params;

  const taskData = await getTaskBySlug(slug);
  // const courseData = await getCourse(course);

  return (
    <div>
      {taskData?.type === "video" && (
        <VideoComponent
          title={taskData.title}
          description={taskData.description}
          src={taskData.video_url}
        />
      )}
      {taskData?.type === "article" && <ComponentsArticle />}
      {taskData?.type === "quiz" && <p>Quiz bb</p>}
    </div>
  );
}
