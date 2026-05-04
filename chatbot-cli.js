import 'dotenv/config';
import readline from 'node:readline';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
function question(prompt) {
  return new Promise(resolve => rl.question(prompt, resolve));
}

let history = [
    { role: 'system', content: 'Tu es un assistant utile et amical.' }
]

const currentProvider = [
    {
        name: 'Mistral',
        url: 'https://api.mistral.ai/v1/chat/completions',
        key: process.env.MISTRAL_API_KEY,
        model: 'mistral-small-latest',
    },
    {
        name: 'Groq',
        url: 'https://api.groq.com/openai/v1/chat/completions',
        key: process.env.GROQ_API_KEY,
        model: 'llama-3.3-70b-versatile',
    },
    {
        name: 'Hugging Face',
        url: 'https://router.huggingface.co/v1/chat/completions',
        key: process.env.HUGGINGFACE_TOKEN,
        model: 'meta-llama/Llama-3.1-8B-Instruct',
    }
]

async function chat(userMessage) {
    history.push({ role: 'user', content: userMessage });

    if (userMessage.startsWith('/history')) {
        printHistory();
        return 'Voici l\'historique de la conversation.';
    }

  const response = await fetch(currentProvider[0].url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${currentProvider[0].key}`
    },
    body: JSON.stringify({
      model: currentProvider[0].model,
      messages: history,
      temperature: 0.7,
    })
  });

    if (!response.ok) {
        throw new Error(`Mistral API error: HTTP ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
}

while (true) {
  const input = await question('Vous : ');
  const reply = await chat(input);
  console.log(`IA : ${reply}\n`);
  history.push({ role: 'assistant', content: reply });
}

function printHistory() {
    if (history.length === 0) {
        console.log('Aucun message dans l\'historique.');
        return;
    }
    
    console.log('--- Historique de la conversation ---');
    history.forEach((message, index) => {
        console.log(`${index + 1}. [${message.role}] ${message.content}`);
    });
    console.log('-----------------------------------\n');
}