import { BookBookmarkIcon } from "@phosphor-icons/react/dist/ssr";

export default function MyLearningPage() {
  return (
    <div className="py-4 lg:px-12 px-0">
      <div className="flex items-center justify-start space-x-2 py-6">
        <BookBookmarkIcon className="text-[#00C8FF]" size={28} weight="fill" />
        <span className="font-bold bg-blue-gradient-500 bg-clip-text text-transparent text-lg">
          Meu Aprendizado
        </span>
        {/* <div>
          <Tabs />
        </div> */}
      </div>
      <div className="flex items-center justify-center">
        <div className="max-w-7xl mx-auto">Meu Aprendizado Page</div>
      </div>
    </div>
  );
}
