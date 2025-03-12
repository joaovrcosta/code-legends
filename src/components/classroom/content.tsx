import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SidebarContentProps } from "@/types/course-types";
import { Info, PlayCircle } from "@phosphor-icons/react/dist/ssr";

export async function Content({ course }: SidebarContentProps) {
  return (
    <div className="mb-[43px] lg:hidden block w-full">
      <Tabs defaultValue="account">
        <TabsList className="bg-transparent w-full h-[64px] border-b-[1px] border-[#25252A]">
          <TabsTrigger
            value="account"
            className="flex-1 h-[64px] text-[#8d8d99]"
          >
            <Info size={28} />
          </TabsTrigger>
          <TabsTrigger
            value="password"
            className="flex-1 h-[64px] text-[#8d8d99]"
          >
            <PlayCircle size={28} />
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          {/* <div className="p-4 lg:p-7 lg:block hidden">
            <span className="bg-blue-gradient-500 bg-clip-text text-transparent text-[20px] font-bold">
              {title}
            </span>
            <p className="text-[14px] mt-4 max-w-[800px]">{description}</p>
          </div> */}
          <p>oi</p>
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
}
