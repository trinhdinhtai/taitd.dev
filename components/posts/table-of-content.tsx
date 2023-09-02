import { PostHeading } from "@/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

interface TableOfContentsProps {
  chapters: PostHeading[];
}

const TableOfContents = ({ chapters }: TableOfContentsProps) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="table-of-contents">
        <AccordionTrigger>Table of Contents</AccordionTrigger>
        <AccordionContent></AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default TableOfContents;
