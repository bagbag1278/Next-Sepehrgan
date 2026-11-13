const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://188.121.111.8:3003/api";

export interface Message {
  id: number;
  roomId: string;
  userId: number;
  message: string;
  createdAt: string;
  isRead: boolean;
}

class ChatService {
  private getHeaders() {
    const token = localStorage.getItem("accessToken");
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }

  async getChatRooms(): Promise<any[]> {
    const response = await fetch(`${API_BASE_URL}/Admin/chat-rooms`, {
      method: "GET",
      headers: this.getHeaders(),
    });
    const result = await response.json();
    return result.data || result || [];
  }

  async getChatMessages(roomId: string | number): Promise<Message[]> {
    const response = await fetch(`${API_BASE_URL}/Admin/chat-rooms/${roomId}/chats`, {
      method: "GET",
      headers: this.getHeaders(),
    });
    const result = await response.json();
    
    let chatsArray = result?.chats || result?.data || result?.messages || [];
    if (!Array.isArray(chatsArray)) chatsArray = [];
    
    return chatsArray.map((msg: any) => ({
      id: msg.id,
      roomId: String(msg.room || roomId),
      userId: msg.senderId || msg.userId,
      message: msg.message,
      createdAt: msg.createdAt,
      isRead: msg.isRead || false,
    }));
  }

  async sendMessage(roomId: string | number, message: string, userId: number): Promise<Message> {
    const response = await fetch(`${API_BASE_URL}/Admin/chat-rooms/${roomId}/chats`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({ message, userId }),
    });
    const result = await response.json();
    return result.data || result;
  }

  async editMessage(messageId: number, newMessage: string): Promise<Message> {
    const response = await fetch(`${API_BASE_URL}/Admin/chats/${messageId}`, {
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify({ message: newMessage }),
    });
    const result = await response.json();
    return result.data || result;
  }

  async deleteMessage(messageId: number): Promise<void> {
    await fetch(`${API_BASE_URL}/Admin/chats/${messageId}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    });
  }

  async clearRoomChats(room: string | number): Promise<void> {
    await fetch(`${API_BASE_URL}/Admin/chat-rooms/${room}/clear`, {
      method: "DELETE",
      headers: this.getHeaders(),
    });
  }
}

export const chatService = new ChatService();
