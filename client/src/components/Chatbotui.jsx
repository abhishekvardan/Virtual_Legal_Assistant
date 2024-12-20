// import React, { useState } from 'react';
// import jsPDF from 'jspdf';
// import './Chatbotui.css';

// function Chatbot() {
//   const [inputText, setInputText] = useState('');
//   const [messages, setMessages] = useState([]);

//   const handleCopy = () => {
//     const textToCopy = messages.map(message => `${message.sender}: ${message.text}`).join('\n');
//     navigator.clipboard.writeText(textToCopy).then(() => {
//       alert('Text copied to clipboard!');
//     }).catch(err => {
//       console.error('Could not copy text: ', err);
//     });
//   };

//   const handleDownloadPDF = () => {
//     const doc = new jsPDF();
//     const pageHeight = doc.internal.pageSize.height;
//     const margin = 10;
//     let yOffset = margin;
//     const lineHeight = 5;
//     const fontSize = 10; // Adjust the font size as needed
  
//     doc.setFontSize(fontSize);
    
//     messages.forEach((message, index) => {
//       const lines = message.text.split('\n');
      
//       lines.forEach((line, lineIndex) => {
//         // Add a new page if the text exceeds the page height
//         if (yOffset + lineHeight > pageHeight - margin) {
//           doc.addPage();
//           yOffset = margin;
//         }
//         doc.text(line, margin, yOffset);
//         yOffset += lineHeight;
//       });
  
//       // Add a page break between messages if not the last message
//       if (index < messages.length - 1) {
//         yOffset += lineHeight * 2; // Space between messages
//       }
//     });
  
//     doc.save('chat-conversation.pdf');
//   };
//   const handleMessageSubmit = async () => {
//     if (inputText.trim() === '') return;

//     // Add user message to chat
//     setMessages(prevMessages => [...prevMessages, { text: inputText, sender: 'user' }]);
//     setInputText('');

//     try {
//         const aiResponse = await generateAiResponse(inputText);
//         const formattedResponse = cleanAiResponse(aiResponse);
//         setMessages(prevMessages => [...prevMessages, { text: formattedResponse, sender: 'ai' }]);
//     } catch (error) {
//         console.error("Error fetching AI response:", error);
//     }
// };

// // Function to clean and format the AI response
// const cleanAiResponse = (response) => {
//     return response 
// };

//   const generateAiResponse = async (userMessage) => {
//     const response = await fetch('http://localhost:5001/api/llama2', {  // Ensure this matches your backend port
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ prompt: userMessage }),
//     });
//     const data = await response.json();
//     return data.response;
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       handleMessageSubmit();
//     }
//   };

//   return (
//     <div className='chatbot-container'>
//       <div className="messages-container">
//         <p>
//           <strong>Disclaimer:</strong> The responses generated by this chatbot are based on the current training data and may not always be accurate or reliable. The information provided should not be considered as professional advice. Please verify any critical information independently.
//         </p>
//         <div className="messages">
//           {messages.map((message, index) => (
//             <div key={index} className={`message ${message.sender}`}>
//               <div className="message-content">
//                 <p className="paradata">{message.text}</p>
//                 <small className='sender' style={{ color: message.sender === 'user' ? 'white' : 'black' }}>
//                   {message.sender === 'user' ? '' : '' }
//                 </small>
//               </div>
//             </div>
//           ))}
//         </div>
//         <button onClick={handleCopy} className="action-button">
//           <i className="fas fa-copy"></i> Copy All Text
//         </button>
//         <button onClick={handleDownloadPDF} className="action-button">
//           <i className="fas fa-file-download"></i> Download Chat as PDF
//         </button>
//       </div>
//       <div className="input-box">
//         <div className="input-container">
//           <textarea
//             className="message-input"
//             value={inputText}
//             onChange={(e) => setInputText(e.target.value)}
//             onKeyDown={handleKeyDown}
//             placeholder="Type your message..."
//           ></textarea>
//           <button className="send-button" onClick={handleMessageSubmit}>
//           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="26px" height="26px">
//             <path d="M2 21l20-9-20-9v7l15 2-15 2z"/>
//           </svg>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Chatbot;
// import React, { useState } from 'react';
// import jsPDF from 'jspdf';
// import './Chatbotui.css';

// function Chatbot() {
//   const [inputText, setInputText] = useState('');
//   const [messages, setMessages] = useState([]);

//   const handleCopy = () => {
//     const textToCopy = messages.map(message => `${message.sender}: ${message.text}`).join('\n');
//     navigator.clipboard.writeText(textToCopy).then(() => {
//       alert('Text copied to clipboard!');
//     }).catch(err => {
//       console.error('Could not copy text: ', err);
//     });
//   };

//   const handleDownloadPDF = () => {
//     const doc = new jsPDF();
//     const pageHeight = doc.internal.pageSize.height;
//     const pageWidth = doc.internal.pageSize.width;
//     const margin = 10;
//     const lineHeight = 5;
//     const fontSize = 10;
//     let yOffset = margin;
//     let xOffset = margin;
  
//     doc.setFontSize(fontSize);
  
//     messages.forEach((message, index) => {
//       // Convert HTML tags to plain text (basic example)
//       let text = message.text
//         .replace(/<br\/>/g, '\n')   // Convert <br/> to new lines
//         .replace(/<\/p>/g, '\n\n')   // Convert </p> to double new lines
//         .replace(/<p>/g, '\n')       // Convert <p> to single new line
//         .replace(/<\/?[^>]+>/g, ''); // Strip any remaining HTML tags
  
//       const lines = doc.splitTextToSize(text, pageWidth - 2 * margin);
  
//       // Set color based on the author
//       if (message.sender === 'user') {
//         doc.setTextColor(0, 0, 255); // Blue for user prompts
//       } else if (message.sender === 'ai') {
//         doc.setTextColor(0, 128, 0); // Green for AI responses
//       }
  
//       lines.forEach((line, lineIndex) => {
//         if (yOffset + lineHeight > pageHeight - margin) {
//           doc.addPage();
//           yOffset = margin;
//         }
//         doc.text(line, xOffset, yOffset);
//         yOffset += lineHeight;
//       });
  
//       if (index < messages.length - 1) {
//         yOffset += lineHeight; // Add space between messages
//       }
//     });
  
//     doc.save('chat-conversation.pdf');
//   };
  
//   const handleMessageSubmit = async () => {
//     if (inputText.trim() === '') return;

//     // Add user message to chat
//     setMessages(prevMessages => [...prevMessages, { text: inputText, sender: 'user' }]);
//     setInputText('');

//     try {
//       const aiResponse = await generateAiResponse(inputText);
//       const formattedResponse = cleanAiResponse(aiResponse);
//       setMessages(prevMessages => [...prevMessages, { text: formattedResponse, sender: 'ai' }]);
//     } catch (error) {
//       console.error("Error fetching AI response:", error);
//     }
//   };

//   // Function to clean and format the AI response
//   const cleanAiResponse = (response) => {
//     // Replace newline characters with <br/> for HTML rendering
//     let formattedResponse = response.replace(/(\r\n|\n|\r)/g, '<br/>');
    
//     // Convert double <br/> to paragraph breaks
//     formattedResponse = formattedResponse.replace(/(<br\/>\s*){2,}/g, '</p><p>');

//     // Wrap content in <p> tags if not already wrapped
//     if (!formattedResponse.startsWith('<p>')) {
//         formattedResponse = `<p>${formattedResponse}</p>`;
//     }
    
//     return formattedResponse;
// };



//   const generateAiResponse = async (userMessage) => {
//     const response = await fetch('http://localhost:5001/api/llama2', {  // Ensure this matches your backend port
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ prompt: userMessage }),
//     });
//     const data = await response.json();
//     return data.response;
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       handleMessageSubmit();
//     }
//   };

//   return (
//     <div className='chatbot-container'>
//       <div className="messages-container">
//         <p>
//           <strong>Disclaimer:</strong> The responses generated by this chatbot are based on the current training data and may not always be accurate or reliable. The information provided should not be considered as professional advice. Please verify any critical information independently.
//         </p>
//         <div className="messages">
//           {messages.map((message, index) => (
//             <div key={index} className={`message ${message.sender}`}>
//               <div className="message-content">
//                 <p className="paradata" dangerouslySetInnerHTML={{ __html: message.text }} />
//                 <small className={`sender ${message.sender}`}>
//                     {message.sender === 'user' ? 'User' : 'AI'}
//                 </small>
//               </div>
//             </div>
//           ))}
//         </div>
//         <button onClick={handleCopy} className="action-button">
//           <i className="fas fa-copy"></i> Copy All Text
//         </button>
//         <button onClick={handleDownloadPDF} className="action-button">
//           <i className="fas fa-file-download"></i> Download Chat as PDF
//         </button>
//       </div>
//       <div className="input-box">
//         <div className="input-container">
//           <textarea
//             className="message-input"
//             value={inputText}
//             onChange={(e) => setInputText(e.target.value)}
//             onKeyDown={handleKeyDown}
//             placeholder="Type your message..."
//           ></textarea>
//           <button className="send-button" onClick={handleMessageSubmit}>
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="26px" height="26px">
//               <path d="M2 21l20-9-20-9v7l15 2-15 2z"/>
//             </svg>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Chatbot;

import React, { useState } from 'react';
import jsPDF from 'jspdf';
import './Chatbotui.css';

function Chatbot() {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [typingMessage, setTypingMessage] = useState(null);

  // Copy chat messages to clipboard
  const handleCopy = () => {
    const textToCopy = messages
      .map(message => `${message.sender === 'user' ? 'User' : 'AI'}: ${message.text.replace(/<\/?[^>]+>/g, '')}`)
      .join('\n');
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => alert('Text copied to clipboard!'))
      .catch(err => console.error('Could not copy text: ', err));
  };

  // Download chat messages as a PDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;
    const pageWidth = doc.internal.pageSize.width;
    const margin = 10;
    const lineHeight = 6;
    const fontSize = 10;
    let yOffset = margin;

    doc.setFontSize(fontSize);

    messages.forEach((message, index) => {
      const text = message.text.replace(/<br\/>/g, '\n').replace(/<\/?[^>]+>/g, '');
      const lines = doc.splitTextToSize(`${message.sender === 'user' ? 'User' : 'AI'}: ${text}`, pageWidth - 2 * margin);

      lines.forEach(line => {
        if (yOffset + lineHeight > pageHeight - margin) {
          doc.addPage();
          yOffset = margin;
        }
        doc.text(line, margin, yOffset);
        yOffset += lineHeight;
      });

      if (index < messages.length - 1) {
        yOffset += lineHeight;
      }
    });

    doc.save('chat-conversation.pdf');
  };

  // Submit a message
  const handleMessageSubmit = async () => {
    if (!inputText.trim()) return;

    setMessages(prevMessages => [...prevMessages, { text: inputText, sender: 'user' }]);
    setInputText('');

    try {
      const aiResponse = await generateAiResponse(inputText);
      simulateTyping(aiResponse);
    } catch (error) {
      console.error('Error fetching AI response:', error);
    }
  };

  // Simulate typing effect
  const simulateTyping = response => {
    setTypingMessage({ text: '', sender: 'ai' });

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < response.length) {
        setTypingMessage(prev => ({
          ...prev,
          text: (prev.text || '') + response[currentIndex],
        }));
        currentIndex++;
      } else {
        clearInterval(interval);
        setMessages(prevMessages => [...prevMessages, { text: typingMessage.text, sender: 'ai' }]);
        setTypingMessage(null);
      }
    }, 50); // Adjust typing speed here
  };

  // Fetch AI response
  const generateAiResponse = async userMessage => {
    const response = await fetch('http://localhost:5001/api/llama2', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: userMessage }),
    });
    const data = await response.json();
    return data.response;
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleMessageSubmit();
    }
  };

  return (
    <div className="chatbot-container">
      <div className="messages-container">
        <p>
          <strong>Disclaimer:</strong> The responses generated by this chatbot are based on the current training data and
          may not always be accurate or reliable. The information provided should not be considered as professional
          advice. Please verify any critical information independently.
        </p>
        <div className="messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              <div className="message-content">
                <p
                  className="paradata"
                  dangerouslySetInnerHTML={{ __html: message.text }}
                />
                <small className={`sender ${message.sender}`}>
                  {message.sender === 'user' ? 'User' : 'AI'}
                </small>
              </div>
            </div>
          ))}
          {typingMessage && (
            <div className="message ai">
              <div className="message-content">
                <p className="paradata">{typingMessage.text}</p>
                <small className="sender ai">AI</small>
              </div>
            </div>
          )}
        </div>
        <button onClick={handleCopy} className="action-button">
          <i className="fas fa-copy"></i> Copy All Text
        </button>
        <button onClick={handleDownloadPDF} className="action-button">
          <i className="fas fa-file-download"></i> Download Chat as PDF
        </button>
      </div>
      <div className="input-box">
        <div className="input-container">
          <textarea
            className="message-input"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
          ></textarea>
          <button className="send-button" onClick={handleMessageSubmit}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="26px" height="26px">
              <path d="M2 21l20-9-20-9v7l15 2-15 2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
