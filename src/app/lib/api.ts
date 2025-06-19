    
    

export async function getBotResponse(question: string): Promise<string> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
  
      if (!response.ok) {
        const errorData = await response.text();
        console.error("Backend API Error:", response.status, errorData);
        throw new Error(`Backend API Error: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error("Error communicating with backend:", error);
      // Return a user-friendly error message
      return "I'm sorry, but I'm having trouble connecting to my brain right now. Please try again in a moment.";
    }
  }
  