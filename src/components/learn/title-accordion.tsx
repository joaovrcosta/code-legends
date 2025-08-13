import { MessageCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface TitleAccordinProps {
  title: string | undefined;
}

export function TitleAccordion({ title }: TitleAccordinProps) {
  return (
    <>
      <Accordion type="single" collapsible className="mt-4">
        <AccordionItem value="item-1">
          <div className="w-full max-w-[1020px] mx-auto rounded-[20px] bg-[#0C0C0F] border border-[#2A2A2A] shadow-xl mb-4">
            <AccordionTrigger className="group w-full lg:px-8 px-6 lg:py-8 py-6">
              <div className="flex justify-between w-full items-center">
                <div>
                  <span className="bg-blue-gradient-500 bg-clip-text text-transparent lg:text-[20px] text-[16px] font-bold">
                    {title}
                  </span>
                  <p className="lg:text-sm text-xs text-muted-foreground font-normal mt-1">
                    Vamos iniciar o nosso conhecimento com ReactJS
                  </p>
                </div>

                <div className="lg:flex hidden items-center gap-2 border border-[#25252A] px-3 py-1 rounded-full text-sm text-white whitespace-nowrap mr-4 font-normal">
                  <MessageCircle size={16} /> 3 comentários
                </div>
                <div className="lg:hidden flex items-center gap-2 border border-[#25252A] px-3 py-1 rounded-full text-sm text-white whitespace-nowrap font-normal">
                  <MessageCircle size={16} />
                </div>
              </div>
            </AccordionTrigger>

            <AccordionContent className="lg:px-8 px-6 pb-8 text-white">
              <div className="flex items-center gap-3 mt-4">
                <Avatar className="h-[32px] w-[32px]">
                  <AvatarImage src="https://avatars.githubusercontent.com/u/70654718?s=400&u=415dc8fde593b5dcbdef181e6186a8d80daf72fc&v=4" />
                  <AvatarFallback>JV</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm text-white">João Victor</p>
                  <p className="text-xs text-[#c4c4c4]">Educator</p>
                </div>
              </div>
            </AccordionContent>
          </div>
        </AccordionItem>
      </Accordion>
    </>
  );
}
