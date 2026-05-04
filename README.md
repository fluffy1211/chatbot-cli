# Chatbot CLI

Un chatbot conversationnel en ligne de commande, avec streaming des réponses et gestion de l'historique.

## Fonctionnalités

- **Streaming** — les réponses s'affichent en temps réel token par token
- **Multi-providers** — bascule entre Groq, Mistral et Hugging Face à la volée
- **Historique automatique** — résumé automatique du contexte quand la conversation devient trop longue (> 10 messages)
- **Commandes intégrées** — résumé, traduction, affichage des coûts estimés

## Installation

```bash
npm install
cp .env.example .env
# Remplir les clés API dans .env
```

## Lancement

```bash
node chatbot-cli.js
```

## Commandes disponibles

| Commande | Description |
|---|---|
| `/provider <nom>` | Changer de fournisseur (`Groq`, `Mistral`, `Hugging Face`) |
| `/history` | Afficher l'historique de la conversation |
| `/resume` | Résumer la conversation en bullet points |
| `/translate <langue>` | Traduire le dernier message de l'IA |
| `/cost` | Afficher le nombre de tokens et le coût estimé de la session |

## Configuration

Les clés API se configurent dans `.env` :

```
GROQ_API_KEY=...
MISTRAL_API_KEY=...
HUGGINGFACE_TOKEN=...
```

Le provider par défaut est **Groq** avec le modèle `llama-3.3-70b-versatile`.
