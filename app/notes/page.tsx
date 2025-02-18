import { Metadata } from "next"
import Link from "next/link"
import { allNotes } from "content-collections"
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
  title: "Notes",
}

const NotesPage = () => {
  const notes = allNotes
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
        title="Notes"
        description="My notes on various topics. Mostly for personal reference."
      />

      <Table>
        <TableHeader>
          <TableRow className="uppercase">
            <TableHead className="w-[300px]">Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Last Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {notes.map((snippet) => (
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

export default NotesPage
