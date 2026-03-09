import { ScriptedExchange } from "./types";

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
              selected: true,
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
          text: "Got it. Do you have an existing Credit Memo template you'd like the agent to populate, or should I suggest one from our library?",
        },
      ],
      assistantText:
        "Got it. Do you have an existing Credit Memo template you'd like the agent to populate, or should I suggest one from our library?",
    },
    {
      assistantMessages: [
        {
          type: "text",
          text: "Please upload your Credit Memo template. I'll analyse it and identify the sections the agent will populate.",
        },
      ],
      assistantText:
        "Please upload your Credit Memo template. I'll analyse it and identify the sections the agent will populate.",
    },
  ];
}
