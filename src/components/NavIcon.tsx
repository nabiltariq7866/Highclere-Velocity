import {
  LayoutDashboard,
  FileInput,
  Scale,
  Package,
  Users,
  MessageSquare,
  FileSearch,
  Building2,
  ShieldAlert,
  Sparkles,
  Clock,
  Banknote,
  PieChart,
  Map,
  Plug,
  BarChart3,
  ShieldCheck,
  Brain,
  Globe,
  Calculator,
  FolderOpen,
  ListChecks,
  Activity,
  FileWarning,
  ScrollText,
} from "lucide-react";

type IconName =
  | "command"
  | "intake"
  | "adjudication"
  | "products"
  | "brokers"
  | "comms"
  | "documents"
  | "property"
  | "fraud"
  | "copilot"
  | "sla"
  | "funding"
  | "portfolio"
  | "province"
  | "integrations"
  | "leadership"
  | "audit"
  | "model"
  | "portal"
  | "scenario"
  | "files"
  | "conditions"
  | "brand"
  | "dashboard";

export function NavIcon({ name, size = 18 }: { name: IconName | string; size?: number }) {
  const iconProps = { size, strokeWidth: 2 };

  switch (name) {
    case "command":
    case "dashboard":
      return <LayoutDashboard {...iconProps} />;
    case "intake":
      return <FileInput {...iconProps} />;
    case "adjudication":
      return <Scale {...iconProps} />;
    case "products":
      return <Package {...iconProps} />;
    case "brokers":
      return <Users {...iconProps} />;
    case "comms":
      return <MessageSquare {...iconProps} />;
    case "documents":
      return <FileSearch {...iconProps} />;
    case "property":
      return <Building2 {...iconProps} />;
    case "fraud":
      return <ShieldAlert {...iconProps} />;
    case "copilot":
      return <Sparkles {...iconProps} />;
    case "sla":
      return <Clock {...iconProps} />;
    case "funding":
      return <Banknote {...iconProps} />;
    case "portfolio":
      return <PieChart {...iconProps} />;
    case "province":
      return <Map {...iconProps} />;
    case "integrations":
      return <Plug {...iconProps} />;
    case "leadership":
      return <BarChart3 {...iconProps} />;
    case "audit":
      return <ScrollText {...iconProps} />;
    case "model":
      return <Brain {...iconProps} />;
    case "portal":
      return <Globe {...iconProps} />;
    case "scenario":
      return <Calculator {...iconProps} />;
    case "files":
      return <FolderOpen {...iconProps} />;
    case "conditions":
      return <ListChecks {...iconProps} />;
    case "brand":
      return <Activity {...iconProps} />;
    default:
      return <FileWarning {...iconProps} />;
  }
}
