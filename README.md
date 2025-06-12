Vidhi: Virtual Legal Assistant

Vidhi is an AI-powered virtual legal assistant designed to provide users with accurate and context-aware legal assistance. This innovative tool leverages state-of-the-art machine learning models to deliver responses tailored to legal queries, enhancing accessibility and efficiency in the legal domain.

Features

Legal Query Handling: Provides detailed and precise answers to user questions related to various legal domains.

Interactive Chat Interface: User-friendly chat interface for seamless interaction.

Lawyer Recommendations: Suggests relevant legal professionals based on user queries.

Exportable Conversations: Users can copy and download chat transcripts for their records.

PDF Interaction: Upload legal documents and extract relevant insights or interact with the content.

Model:

Vidhi is powered by the Llama 2 series model, specifically the llama-2-7b-chat.Q8_0 (1).gguf, sourced from Hugging Face. This robust language model is fine-tuned to generate contextually accurate and human-like legal responses, making it an ideal choice for this project.

Tech Stack

Frontend: React.js for building an interactive user interface.

Backend: Node.js and Express.js for API development and server-side operations.

Database: MongoDB for managing user data and session logs.

AI Framework: Hugging Face Transformers for model integration.

Setup Instructions

Prerequisites

> Node.js and npm installed.
> MongoDB database setup.
> Access to the llama-2-7b-chat.Q8_0 (1).gguf model.

Steps:
  > bash

    git clone https://github.com/abhishekvardan/Virtual_Legal_Assistant.git
    cd Virtual_Legal_Assistant
    npm install

  > Create a .env file

      MONGO_URI=<your_mongodb_connection_string>
      MODEL_PATH=<path_to_gguf_model>

  > To Run the Application
     
        npm start

Future Enhancements:

Integration of multilingual support.

Addition of advanced legal document analysis.

Support for voice-based interactions.

Enhanced recommendation algorithms for lawyer suggestions.

Contributing

Contributions are welcome! Feel free to submit a pull request or raise an issue for discussion.


