import { ScriptedExchange } from "./types";

export function getInitialUserMessage(_agentId: string): string {
  return "I want to configure a new Credit Memo agent";
}

export function getScriptForAgent(_agentId: string): ScriptedExchange[] {
  return [
    {
      assistantMessages: [
        { type: "status", text: "Analysing your request..." },
        {
          type: "text",
          text: "Great! I'll help you set up a new Credit Memo agent. I'll need some basic information to get started.",
        },
        {
          type: "form",
          title: "Basic Information",
          fields: [
            {
              id: "name",
              label: "Agent Variant Name",
              required: true,
              placeholder: "e.g. Commercial Credit Memo",
              helpText: "Give your agent a clear, descriptive name",
              fieldType: "text",
            },
            {
              id: "description",
              label: "Description",
              required: true,
              placeholder:
                "e.g. Generates a comprehensive Credit Memo for commercial lending applications...",
              helpText: "What does this agent do?",
              fieldType: "textarea",
            },
          ],
        },
      ],
      assistantText:
        "Great! I'll help you set up a new Credit Memo agent. I'll need some basic information to get started.",
    },
    {
      assistantMessages: [
        { type: "status", text: "Reviewing..." },
        {
          type: "text",
          text: "Great! I'll help you set up a new Credit Memo agent. First, tell me about your Credit Memo process.\n\nWhat type of lending does this Credit Memo cover?",
        },
        {
          type: "sources",
          sources: [
            {
              id: "cre",
              title: "Commercial Real Estate",
              description: "Investment properties, development finance",
              selected: false,
            },
            {
              id: "corporate",
              title: "Corporate Lending",
              description: "Working capital, term loans",
              selected: false,
            },
            {
              id: "trade",
              title: "Trade Finance",
              description: "Letters of credit, guarantees",
              selected: false,
            },
          ],
        },
      ],
      assistantText:
        "Great! I'll help you set up a new Credit Memo agent. First, tell me about your Credit Memo process.\n\nWhat type of lending does this Credit Memo cover?",
    },
    {
      assistantMessages: [
        {
          type: "text",
          text: "Please upload your Credit Memo template. I'll analyse it and identify the sections the agent will populate.",
        },
        { type: "upload" },
      ],
      assistantText:
        "Please upload your Credit Memo template. I'll analyse it and identify the sections the agent will populate.",
    },
    {
      assistantMessages: [
        {
          type: "text",
          text: "I've analysed your template. I found **6 sections** that the agent can populate.",
        },
        {
          type: "text",
          text: "Here's what I identified:",
        },
        {
          type: "sections-table",
          sections: [
            {
              id: "header",
              name: "Header & Transaction Summary",
              dataSources: "Term Sheet, Deal Data",
              status: "auto",
            },
            {
              id: "counterparties",
              name: "Counterparties",
              dataSources: "Companies House, Deal Data",
              status: "auto",
            },
            {
              id: "facilities",
              name: "Facilities",
              dataSources: "Term Sheet",
              status: "auto",
            },
            {
              id: "security",
              name: "Security package",
              dataSources: "Term Sheet, Valuation",
              status: "configured",
            },
            {
              id: "financial",
              name: "Financial analysis",
              dataSources: "Financial Statements",
              status: "needs-input",
            },
            {
              id: "climate",
              name: "Climate Risk",
              dataSources: "Term Sheet, Valuation",
              status: "needs-input",
            },
          ],
        },
        {
          type: "text",
          text: "Would you like me to:\n\n1. Walk you through each section?\n2. Focus only on the sections that need your input?\n3. Help you add a custom section?",
        },
      ],
      assistantText:
        "I've analysed your template. I found 6 sections that the agent can populate.",
    },
    {
      assistantMessages: [
        {
          type: "text",
          text: "Got it. Let's configure the Financial Analysis section. I need to understand your requirements:",
        },
        {
          type: "text",
          text: "What financial metrics should the agent calculate and present?",
        },
        {
          type: "sources",
          sources: [
            {
              id: "dscr",
              title: "DSCR",
              description: "Debt Service Coverage Ratio",
              selected: false,
            },
            {
              id: "ltv-ltc",
              title: "LTV / LTC",
              description: "Loan-to-Value, Loan-to-Cost",
              selected: false,
            },
            {
              id: "icr",
              title: "ICR",
              description: "Interest Coverage Ratio",
              selected: false,
            },
            {
              id: "custom",
              title: "Custom",
              description: "Define your own metrics",
              selected: false,
            },
          ],
        },
      ],
      assistantText:
        "Got it. Let's configure the Financial Analysis section. I need to understand your requirements:\n\nWhat financial metrics should the agent calculate and present?",
    },
  ];
}
