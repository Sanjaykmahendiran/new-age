"use client";

import { FC } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface TableContent {
  name: string;
  company: string;
  status: "Contacted" | "Not Contacted";
}

interface DashboardTableProps {
  title: string;
  description: string;
  headings?: string[]; 
  tableData?: TableContent[]; 
}

const DashboardTable: FC<DashboardTableProps> = ({
  title,
  description,
  headings = [],
  tableData = [], 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {headings?.map((heading, index) => (
                <TableHead
                  key={index}
                  className={index === headings.length - 1 ? "text-right" : ""}
                >
                  {heading}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData?.map((data, index) => (
              <TableRow key={index}>
                <TableCell>{data.name}</TableCell>
                <TableCell>{data.company}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    variant="outline"
                    className={`${
                        data.status === "Contacted"
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                    }`}
                  >
                    {data.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DashboardTable;
