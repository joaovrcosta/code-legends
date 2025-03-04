export default function ClassroomPage() {
  return (
    <div className="">
      <video
        className="w-full max-h-[712px] min-h-[358px] object-cover"
        controls
        autoPlay={false}
      >
        <source src="/videos/aula-exemplo.mp4" type="video/mp4" />
        Seu navegador não suporta vídeos.
      </video>
      <div className="lg:p-7 p-4">
        <span className="bg-blue-gradient-500 bg-clip-text text-transparent text-[20px] font-bold">
          Bundles & Compilers
        </span>
        <p className="text-[14px] mt-4 max-w-[800px]">
          João codes a basic React component. The component is rendered to the
          page, replacing the not rendered text in the div tag. The React and
          ReactDOM libraries are imported using script tags, so no build script
          is required to run the application.
        </p>
      </div>
    </div>
  );
}
