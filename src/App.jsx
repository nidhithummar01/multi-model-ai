import { useState } from "react";

const models = ["Claude", "GPT", "Gemini", "Llama", "Mistral"];

const modelLabels = {
  Claude: "Claude Strategy",
  GPT: "GPT Fast Draft",
  Gemini: "Gemini Multimodal",
  Llama: "Private Llama",
  Mistral: "Mistral Low Cost",
};

const responses = {
  Claude: "Risk: no audit trail, data leakage, inconsistent quality, and duplicate spend. Rollout: start with policy design, pilot power users, seed prompt libraries, then expand with usage dashboards.",
  GPT: "Personal AI sprawl creates cost, compliance, and visibility issues. Recommended plan: consolidate access, enable SSO, define roles, add budget caps, and train teams with approved workflows.",
  Gemini: "Add multimodal governance: image/PDF inputs need policy checks. Roll out model access by use case and keep sensitive documents inside approved knowledge bases.",
  Llama: "For sensitive workloads, route prompts to private models. Use on-prem inference for confidential data and public APIs only for approved low-risk tasks.",
  Mistral: "Cost-sensitive workloads can use smaller models for drafting, extraction, and classification. Reserve premium models for strategy and complex reasoning.",
};

export default function App() {
  const [selected, setSelected] = useState(["Claude", "GPT"]);
  const [resultModels, setResultModels] = useState(["Claude", "GPT"]);
  const [audit, setAudit] = useState("AUDIT LOG\n09:00 workspace opened\n09:01 model policy loaded");

  function toggleModel(model) {
    setSelected((current) =>
      current.includes(model)
        ? current.filter((item) => item !== model)
        : [...current, model],
    );
  }

  function runPrompt() {
    setResultModels(selected);
    setAudit((current) => `${current}\n09:02 prompt submitted\n09:03 ${selected.length} model responses generated\n09:04 audit event stored`);
  }

  return (
    <div className="wrap">
      <header>
        <div className="brand">Neoteq AI / Multi-Model Workspace</div>
        <span className="tag">Prototype</span>
      </header>

      <section className="hero">
        <div>
          <span className="tag">Team AI Workspace</span>
          <h1>Multi-Model AI Workspace</h1>
        </div>
        <p className="lede">
          One governed workspace for Claude, GPT, Gemini, Llama, and private models
          with prompts, document chat, usage controls, and audit logs.
        </p>
      </section>

      <section className="workspace">
        <aside className="panel dark">
          <span className="tag">Models</span>
          {models.map((model) => (
            <button
              className={`model ${selected.includes(model) ? "active" : ""}`}
              key={model}
              onClick={() => toggleModel(model)}
            >
              {modelLabels[model]}
            </button>
          ))}
        </aside>

        <main className="panel">
          <span className="tag">Prompt Compare</span>
          <h2>Ask once. Compare across approved models.</h2>
          <textarea defaultValue="Summarize the risks of letting every employee use personal AI subscriptions, then propose a governed workspace rollout plan." />
          <button onClick={runPrompt}>Run Workspace Prompt</button>
          <div className="responses">
            {resultModels.length ? (
              resultModels.map((name) => (
                <div className="response" key={name}>
                  <h3>{modelLabels[name]}</h3>
                  {responses[name]}
                </div>
              ))
            ) : (
              <div className="response"><h3>No model selected</h3>Select at least one approved model.</div>
            )}
          </div>
        </main>

        <aside className="panel">
          <span className="tag">Governance</span>
          <div className="control"><strong>SSO</strong> Okta / Azure AD ready</div>
          <div className="control"><strong>RBAC</strong> Legal, finance, engineering teams</div>
          <div className="control"><strong>Budgets</strong> Per-user and per-team token caps</div>
          <div className="control"><strong>Data Policy</strong> Private docs restricted to approved models</div>
          <div className="audit">{audit}</div>
        </aside>
      </section>
    </div>
  );
}
