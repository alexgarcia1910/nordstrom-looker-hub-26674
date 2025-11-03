import { useState } from "react";
import { Heart, LayoutGrid, Search, BookOpen, GraduationCap, ExternalLink } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { cn } from "@/lib/utils";

interface DirectoryItem {
  id: string;
  type: "Dashboard" | "Explore";
  name: string;
  domain: string;
  subdomain: string;
  description: string;
  status: "Operational" | "Warning" | "Critical";
  owner: string;
  isFavorite: boolean;
}

const mockData: DirectoryItem[] = [
  {
    id: "1",
    type: "Dashboard",
    name: "Monthly Budget Performance",
    domain: "Finance",
    subdomain: "Budgeting & Forecasting",
    description: "Track monthly budget vs actuals across all departments.",
    status: "Operational",
    owner: "Finance Analytics Team",
    isFavorite: false
  },
  {
    id: "2",
    type: "Explore",
    name: "Budget Details Explore",
    domain: "Finance",
    subdomain: "Budgeting & Forecasting",
    description: "Deep dive into budget line items and allocation details.",
    status: "Warning",
    owner: "Finance Analytics Team",
    isFavorite: false
  },
  {
    id: "3",
    type: "Dashboard",
    name: "OPEX Variance by Region",
    domain: "Finance",
    subdomain: "Budgeting & Forecasting",
    description: "Regional operating expense variance analysis dashboard.",
    status: "Critical",
    owner: "Regional Finance",
    isFavorite: false
  },
  {
    id: "4",
    type: "Dashboard",
    name: "Financial Performance Dashboard",
    domain: "Finance",
    subdomain: "Performance & KPIs",
    description: "Tracks financial performance metrics and KPI trends across divisions.",
    status: "Operational",
    owner: "Finance Analytics Team",
    isFavorite: false
  },
  {
    id: "5",
    type: "Explore",
    name: "Cost Center Analysis Explore",
    domain: "Finance",
    subdomain: "Budgeting & Forecasting",
    description: "Analyze spending patterns by cost center and department.",
    status: "Warning",
    owner: "Finance Analytics Team",
    isFavorite: false
  },
  {
    id: "6",
    type: "Dashboard",
    name: "Accounts Payable Overview",
    domain: "Finance",
    subdomain: "AP & AR",
    description: "Comprehensive view of accounts payable aging and trends.",
    status: "Operational",
    owner: "AP Team",
    isFavorite: false
  },
  {
    id: "7",
    type: "Dashboard",
    name: "Profitability by Product Line",
    domain: "Finance",
    subdomain: "Profitability Analysis",
    description: "Detailed profitability metrics segmented by product.",
    status: "Operational",
    owner: "Finance Analytics Team",
    isFavorite: false
  },
  {
    id: "8",
    type: "Explore",
    name: "Margin Analysis Explore",
    domain: "Finance",
    subdomain: "Profitability Analysis",
    description: "Interactive exploration of margin trends and drivers.",
    status: "Critical",
    owner: "Finance Analytics Team",
    isFavorite: false
  }
];

export const FinanceDomainV8 = () => {
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [subdomainFilter, setSubdomainFilter] = useState<string>("all");
  const [ownerFilter, setOwnerFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [favorites, setFavorites] = useState<Set<string>>(
    new Set(mockData.filter(item => item.isFavorite).map(item => item.id))
  );

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  // Get unique values for filters
  const uniqueOwners = Array.from(new Set(mockData.map(item => item.owner))).sort();
  const uniqueSubdomains = ["Budgeting & Forecasting", "Performance & KPIs", "AP & AR", "Profitability Analysis"];

  const filteredData = mockData.filter(item => {
    const matchesType = typeFilter === "all" || item.type === typeFilter;
    const matchesSubdomain = subdomainFilter === "all" || item.subdomain === subdomainFilter;
    const matchesOwner = ownerFilter === "all" || item.owner === ownerFilter;
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    return matchesType && matchesSubdomain && matchesOwner && matchesStatus;
  });

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Operational":
        return "bg-green-50 text-green-700 border-green-200";
      case "Warning":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "Critical":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-12">
      <div className="max-w-[1800px] mx-auto">
        {/* Header Section with Title and Info Cards */}
        <div className="mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Page Title & Subtitle - Left Side */}
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">Finance Data Directory</h2>
            <p className="text-sm text-muted-foreground">
              Browse dashboards and explores across all Finance subdomains.
            </p>
          </div>

          {/* Info Cards - Right Side */}
          <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
            <Card className="p-4 flex items-center gap-3 hover:shadow-md transition-shadow cursor-pointer w-full sm:max-w-sm">
              <BookOpen className="h-5 w-5 text-foreground flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-sm text-foreground">Access & Onboarding</h3>
                <p className="text-xs text-muted-foreground">
                  Guides and onboarding resources for Finance teams.
                </p>
              </div>
            </Card>

            <Card className="p-4 flex items-center gap-3 hover:shadow-md transition-shadow cursor-pointer w-full sm:max-w-sm">
              <GraduationCap className="h-5 w-5 text-foreground flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-sm text-foreground">Training & Resources</h3>
                <p className="text-xs text-muted-foreground">
                  Learn best practices and explore analytics documentation for Finance.
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-card rounded-lg border p-4 mb-6">
          <div className="flex flex-wrap items-center gap-3">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent className="bg-card z-50">
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Dashboard">Dashboard</SelectItem>
                <SelectItem value="Explore">Explore</SelectItem>
              </SelectContent>
            </Select>

            <Select value={subdomainFilter} onValueChange={setSubdomainFilter}>
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Subdomain" />
              </SelectTrigger>
              <SelectContent className="bg-card z-50">
                <SelectItem value="all">All Subdomains</SelectItem>
                {uniqueSubdomains.map(subdomain => (
                  <SelectItem key={subdomain} value={subdomain}>
                    {subdomain}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={ownerFilter} onValueChange={setOwnerFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Owner" />
              </SelectTrigger>
              <SelectContent className="bg-card z-50">
                <SelectItem value="all">All Owners</SelectItem>
                {uniqueOwners.map(owner => (
                  <SelectItem key={owner} value={owner}>
                    {owner}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-card z-50">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Operational">Operational</SelectItem>
                <SelectItem value="Warning">Warning</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Card Row Layout - One card per row */}
        <div className="space-y-4">
          {filteredData.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No results found. Try adjusting your filters.
            </div>
          ) : (
            filteredData.map(item => (
              <Card
                key={item.id}
                className="p-6 hover:shadow-md transition-all cursor-pointer group relative"
              >
                <div className="flex items-start justify-between gap-4">
                  {/* Left side - Icon and Content */}
                  <div className="flex items-start gap-4 flex-1">
                    {/* Icon */}
                    <div className="mt-1">
                      {item.type === "Dashboard" ? (
                        <LayoutGrid className="h-5 w-5 text-foreground" />
                      ) : (
                        <Search className="h-5 w-5 text-foreground" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <span>{item.domain}</span>
                        <span>/</span>
                        <span>{item.subdomain}</span>
                        <span>|</span>
                        <span>{item.owner}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Right side - Status Badge and Actions */}
                  <div className="flex items-start gap-3">
                    <Badge
                      variant="outline"
                      className={cn("text-xs whitespace-nowrap", getStatusBadgeColor(item.status))}
                    >
                      {item.status === "Operational" && "🟢 "}
                      {item.status === "Warning" && "🟡 "}
                      {item.status === "Critical" && "🔴 "}
                      {item.status}
                    </Badge>

                    {/* Hover Actions */}
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(item.id);
                        }}
                        className="p-1 hover:bg-muted rounded"
                      >
                        <Heart
                          className={cn(
                            "h-4 w-4",
                            favorites.has(item.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"
                          )}
                        />
                      </button>
                      <button className="p-1 hover:bg-muted rounded">
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};