import { cn, formatDate } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import TableOfContents from "./table-of-content";
import { Separator } from "../ui/separator";

interface TOCCardProps {
  post: any;
}

const TOCCard = ({ post }: TOCCardProps) => {
  return (
    <aside className="hidden lg:block">
      <Card className={cn("sticky top-28 mb-4")}>
        <CardHeader>
          <CardTitle>Table of Contents</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <TableOfContents chapters={post.headings} />
        </CardContent>
        <Separator />
        <CardFooter>
          <div className="mb-4 mt-4 text-sm leading-snug text-muted-foreground">
            <p className="mb-2">{`${post.readTimeMinutes} mins read`}</p>
            <time>Originally published: {formatDate(post.publishedDate)}</time>
            <br />
            {post.lastUpdatedDate && (
              <time> Last updated: {formatDate(post.lastUpdatedDate)}</time>
            )}
          </div>
        </CardFooter>
      </Card>
    </aside>
  );
};

export default TOCCard;
