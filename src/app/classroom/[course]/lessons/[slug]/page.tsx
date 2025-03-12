import { getTaskBySlug } from "@/actions/getTaskBySlug";
import VideoComponent from "@/components/classroom/video";

type tParams = Promise<{ slug: string }>;

export default async function LessonPage(props: { params: tParams }) {
  const { slug } = await props.params;

  const data = await getTaskBySlug(slug);

  return (
    <div>
      {data?.type === "video" && (
        <VideoComponent
          title={data.title}
          description={data.description}
          src={data.video_url}
        />
      )}
      {data?.type === "article" && <p>Artigo bb</p>}
      {data?.type === "quiz" && <p>Quiz bb</p>}
    </div>
  );
}
