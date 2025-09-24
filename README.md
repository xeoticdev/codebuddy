# CodeBuddy Chat

A web-based AI chat interface resembling ChatGPT, with persistent chat history and code-focused persona.

## Features
- Chat with simulated AI (frontend-only) or connect backend with Flask.
- Persistent chat history via localStorage with export/import.
- Syntax highlighting with Prism.js.
- Code Mode for runnable code responses with explanations.
- Responsive design and dark/light theme toggle.

## Setup

### Frontend only (GitHub Pages)
1. Fork or clone this repo.
2. Enable GitHub Pages in your repo settings (serve root directory).

### Backend (Flask)
```bash
cd backend
pip install -r requirements.txt
python app.py
```
Edit `app.py` to add API credentials (never commit secrets).

## Safety & Acceptable Use
CodeBuddy refuses harmful or malicious code requests (malware, cheats, hacks). It provides safe, educational examples in Python, Batch, and C++.

## License
MIT