export type AgentCategory =
  | "development"
  | "architecture"
  | "ai-ml"
  | "data"
  | "quality"
  | "security"
  | "operations"
  | "documentation";

export type AgentModel = "opus" | "sonnet" | "haiku";

export type AgentTool =
  | "Read"
  | "Write"
  | "Edit"
  | "Bash"
  | "Grep"
  | "Glob"
  | "Task"
  | "TaskCreate"
  | "TaskUpdate"
  | "TaskList";

export type DisplayCategory =
  | "most-used"
  | "acquisition"
  | "screening"
  | "underwriting"
  | "fulfillment"
  | "monitoring";

export const DISPLAY_CATEGORY_LABELS: Record<DisplayCategory, string> = {
  "most-used": "Most Used Agents",
  acquisition: "Acquisition",
  screening: "Screening",
  underwriting: "Underwriting",
  fulfillment: "Fulfillment",
  monitoring: "Monitoring",
};

export const DISPLAY_CATEGORY_ORDER: DisplayCategory[] = [
  "most-used",
  "acquisition",
  "screening",
  "underwriting",
  "fulfillment",
  "monitoring",
];

export interface AgentDefinition {
  id: string;
  name: string;
  summary: string;
  icon: string;
  category: AgentCategory;
  displayCategory: DisplayCategory;
  defaultModel: AgentModel;
  defaultTools: AgentTool[];
  description: string;
  systemPrompt: string;
  agentFileContent: string;
}

export interface AgentInstance {
  instanceId: string;
  definitionId: string;
  name: string;
  model: AgentModel;
  tools: AgentTool[];
  customInstructions: string;
  position: { x: number; y: number };
}

export interface TaskDependency {
  id: string;
  sourceInstanceId: string;
  targetInstanceId: string;
  label: string;
  dependencyType: "blocks" | "informs";
}

export interface TeamConfig {
  name: string;
  description: string;
  agents: AgentInstanceExport[];
  dependencies: TaskDependencyExport[];
  exportedAt: string;
}

export interface AgentInstanceExport {
  id: string;
  definitionId: string;
  name: string;
  model: AgentModel;
  tools: AgentTool[];
  customInstructions: string;
}

export interface TaskDependencyExport {
  id: string;
  sourceAgentId: string;
  targetAgentId: string;
  label: string;
  dependencyType: "blocks" | "informs";
}
