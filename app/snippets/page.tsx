import { Metadata } from "next"
import Link from "next/link"
import { allSnippets } from "@/.contentlayer/generated"
import { compareDesc } from "date-fns"

import { formatDate } from "@/lib/utils"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import PageHeading from "@/components/page-heading"

export const metadata: Metadata = {
  title: "Snippets",
}

const SnippetsPage = () => {
  const snippets = allSnippets
    .filter((snippet) => snippet.lastUpdatedDate)
    .sort((a, b) => {
      return compareDesc(
        new Date(a.lastUpdatedDate),
        new Date(b.lastUpdatedDate)
      )
    })

  return (
    <>
      <PageHeading
        title="Snippets"
        description="A collection of code snippets that I use in my projects."
      />

      <Table>
        <TableHeader>
          <TableRow className="uppercase">
            <TableHead className="w-[200px]">Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Last Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {snippets.map((snippet) => (
            <TableRow key={snippet.slug}>
              <TableCell className="font-medium underline">
                <Link href={snippet.slug}>{snippet.title}</Link>
              </TableCell>
              <TableCell>{snippet.description}</TableCell>
              <TableCell>{snippet.category}</TableCell>
              <TableCell className="text-right">
                {formatDate(snippet.lastUpdatedDate)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

export default SnippetsPage
