"use client";

import { useEffect, useState } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Pencil,
  Trash,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { KnowledgeBaseList, UsersList } from "@/service/listservice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DeleteArticle } from "@/service/deleteservices";
import Spinner from "@/components/spinner";
import KnowledgeBaseForm from "@/components/addknowledgebaseform";
import DataTable from "@/components/datatable";
import { motion } from "framer-motion";
import DateRangePickerInput from "@/components/pick-date";

interface KnowledgeArticle {
  article_id: string;
  title: string;
  category: string;
  tags: string;
  content: string;
  created_date: string;
  last_updated: string;
  author_id: string;
  status: string;
}

export default function KnowledgeBasePage() {
  const [articles, setArticles] = useState<KnowledgeArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);

  // Filter states
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(false);

  // Filter articles based on search query and other filters
  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      String(article.title || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      String(article.tags || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      String(article.category || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const handleDelete = async (articleId: string) => {
    try {
      const response = await DeleteArticle(articleId);

      if (response?.status === "Article Deleted") {
        console.log("Article deleted successfully");
        fetchArticles();
      } else {
        console.error(
          `Failed to delete article. Status: ${response?.status || "Unknown"}`
        );
      }
    } catch (error: any) {
      console.error("Error deleting article:", error.message || error);
    }
  };

  const fetchArticles = async (
    filters: {
      searchQuery?: string;
      fromDate?: string;
      toDate?: string;
    } = {}
  ) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.searchQuery)
        params.append("search_query", filters.searchQuery);
      if (filters.fromDate) params.append("from_date", filters.fromDate);
      if (filters.toDate) params.append("to_date", filters.toDate);

      const queryString = params.toString();
      const data: KnowledgeArticle[] = await KnowledgeBaseList(queryString);
      setArticles(data);
    } catch (err) {
      console.error("Error fetching articles:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  // Row actions
  const rowActions = (article: KnowledgeArticle) => (
    <>
      <div className="flex space-x-3">
        <button
          onClick={() => setEditingArticleId(article.article_id)}
          className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-500 hover:text-blue-700 rounded-lg transition-all duration-200 ease-in-out"
          aria-label="Edit Proposal"
        >
          <Pencil className="h-4 w-4" />
        </button>

        <button
          onClick={() => handleDelete(article.article_id)}
          className="p-2 bg-red-100 hover:bg-red-200 text-red-500 hover:text-red-700 rounded-lg transition-all duration-200 ease-in-out"
          aria-label="Delete Proposal"
        >
          <Trash className="h-4 w-4" />
        </button>
      </div>

      {/* Edit Form (only for the selected article) */}
      {editingArticleId === article.article_id && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-[9999] overflow-hidden">
          <motion.div
            className="w-[90vw] max-w-xl max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <KnowledgeBaseForm
              onClose={() => setEditingArticleId(null)}
              articleId={article.article_id}
              isEdit={true}
            />
          </motion.div>
        </div>
      )}
    </>
  );

  // Define columns for DataTable
  const columns = [
    {
      header: "Title",
      accessor: "title",
    },
    {
      header: "Category",
      accessor: "category",
    },
    {
      header: "Tags",
      accessor: "tags",
      cell: ({ tags }: KnowledgeArticle) => (
        <div className="flex flex-wrap gap-1">
          {tags.split(",").map((tag, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full"
            >
              {tag.trim()}
            </span>
          ))}
        </div>
      ),
    },
    {
      header: "Author",
      accessor: "author",
    },
  ];

  return (
    <div className="w-auto p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Knowledge Base</h1>
        <Button variant="default" onClick={() => setShowForm(true)}>
          Add Article
        </Button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-t-lg mt-8 p-4 bg-white">
        {/* Search input on the left */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search Articles"
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <DateRangePickerInput />
      </div>

      <DataTable
        columns={columns}
        data={filteredArticles}
        isLoading={isLoading}
        rowActions={rowActions}
        emptyMessage="No campaigns found. Try adjusting your filters."
      />

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-[9999] overflow-hidden">
          <motion.div
            className="w-[90vw] max-w-xl max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <KnowledgeBaseForm
              onClose={() => setShowForm(false)}
              isEdit={false}
            />
          </motion.div>
        </div>
      )}
    </div>
  );
}
