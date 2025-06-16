import { openrouter } from "../openai/client.js";

export const createChat = async (req, res) => {
  try {
    const { user, message } = req.body;
    const prompt = buildPrompt({ user, message });

    const completion = await openrouter.chat.completions.create({
      model: "openai/gpt-4o",
      models: ["anthropic/claude-3.5-sonnet", "gryphe/mythomax-l2-13b"],
      messages: [{ role: "user", content: sanitizeText(prompt) }],
      stream: false, // o false para respuesta entera
    });
    res.send(completion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

function sanitizeText(text) {
  // Reemplaza guion no separable (U+2011) y otros caracteres fuera de ASCII por un guion normal
  return text.replace(/[\u2010-\u2015]/g, "-");
}
// --- Construcción del contexto del prompt (puedes mejorar esto con Redis o base de datos)
function buildPrompt({ user, message }) {
  const system = `Eres un asistente experto en monopatines electricos. Responde en español.`;
  const history =
    user.chatHistory
      ?.map((h) => `${h.role.toUpperCase()}: ${sanitizeText(h.content)}`)
      .join("\n") || "";
  return `${system}\n${history}\nUSUARIO: ${sanitizeText(message)}\nASISTENTE:`;
}
