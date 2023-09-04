import Link from "next/link";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  SiFacebook,
  SiLinkedin,
  SiTwitter,
  SiYcombinator,
} from "react-icons/si";
import { Mail } from "lucide-react";

interface SocialShareButtonProps {
  url: string;
  text?: string;
}

const SocialShareButton = ({ url, text }: SocialShareButtonProps) => {
  const encodedUrl = encodeURIComponent(url);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Share</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Share Post</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link
            href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${text}`}
            rel="noreferrer noopener"
            target="_blank"
          >
            <SiTwitter className="mr-2 h-3 w-3" />
            Twitter
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
            rel="noreferrer noopener"
            target="_blank"
          >
            <SiFacebook className="mr-2 h-3 w-3" />
            Facebook
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
            rel="noreferrer noopener"
            target="_blank"
          >
            <SiLinkedin className="mr-2 h-3 w-3" />
            LinkedIn
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href={`https://news.ycombinator.com/submitlink?u=${encodedUrl}`}
            rel="noreferrer noopener"
            target="_blank"
          >
            <SiYcombinator className="mr-2 h-3 w-3" />
            Hacker News
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href={`mailto:info@example.com?&subject=&cc=&bcc=&body=${encodedUrl}%20${text}`}
            rel="noreferrer noopener"
            target="_blank"
          >
            <Mail className="mr-2 h-3 w-3" />
            Email
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SocialShareButton;
