// app/Admin/chats/hooks/useChats.ts
import { useState } from "react";
import { chatService } from "@/core/service/chatService";
import toast from "react-hot-toast";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://188.121.111.8:3003/api";
const ADMIN_ID = 175;

export interface ChatRoom {
  id?: number;
  room: string;
  users: number[];
}

export interface UserInfo {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile?: string;
}

export interface Message {
  id: number;
  roomId: string;
  userId: number;
  message: string;
  createdAt: string;
  isRead: boolean;
}

export const useChats = () => {
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [usersMap, setUsersMap] = useState<Map<number, UserInfo>>(new Map());
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sending, setSending] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  const getUserName = (userId: number): string => {
    if (userId === ADMIN_ID) return "پشتیبانی";
    const user = usersMap.get(userId);
    if (user) {
      return `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
        user.email?.split("@")[0] ||
        `کاربر ${userId}`;
    }
    return `کاربر ${userId}`;
  };

  const getUserAvatar = (userId: number): string => {
    const name = getUserName(userId);
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0887CA&color=fff&rounded=true&size=32`;
  };

  const formatTime = (dateStr: string): string => {
    try {
      if (!dateStr) return "—";
      return new Date(dateStr).toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" });
    } catch { return "—"; }
  };

  const formatDate = (dateStr: string): string => {
    try {
      if (!dateStr) return "";
      return new Date(dateStr).toLocaleDateString("fa-IR", { year: "numeric", month: "long", day: "numeric" });
    } catch { return ""; }
  };

  const fetchUsers = async (userIds: number[]) => {
    const token = localStorage.getItem("accessToken");
    const newMap = new Map<number, UserInfo>();
    for (const uid of userIds) {
      if (uid === ADMIN_ID) continue;
      try {
        const res = await fetch(`${API_BASE_URL}/users/${uid}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          const userData = data.data || data;
          newMap.set(uid, {
            id: userData.id || uid,
            firstName: userData.firstName || "",
            lastName: userData.lastName || "",
            email: userData.email || "",
            mobile: userData.mobile || "",
          });
        } else {
          newMap.set(uid, { id: uid, firstName: "", lastName: "", email: "", mobile: "" });
        }
      } catch {
        newMap.set(uid, { id: uid, firstName: "", lastName: "", email: "", mobile: "" });
      }
    }
    setUsersMap(newMap);
  };

  const fetchChatRooms = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return;
      const res = await fetch(`${API_BASE_URL}/Admin/chat-rooms`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const result = await res.json();
      let roomsData = result.data || result;
      if (!Array.isArray(roomsData)) roomsData = [];
      const normalizedRooms: ChatRoom[] = roomsData.map((item: any) => ({
        id: item.id,
        room: String(item.room || item.id),
        users: item.users || item.userIds || [],
      }));
      setRooms(normalizedRooms);
      const allUserIds = [...new Set(normalizedRooms.flatMap(r => r.users))];
      if (allUserIds.length > 0) await fetchUsers(allUserIds);
    } catch (error) {
      toast.error("خطا در دریافت لیست گفتگوها");
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (roomId: string) => {
    setLoadingMessages(true);
    try {
      const response = await fetch(`${API_BASE_URL}/Admin/chat-rooms/${roomId}/chats`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const result = await response.json();
      let messagesArray = result.data || result;
      if (!Array.isArray(messagesArray)) messagesArray = [];
      setMessages(messagesArray.map((msg: any) => ({
        id: msg.id,
        roomId: String(msg.room || roomId),
        userId: msg.senderId || msg.userId,
        message: msg.message || "",
        createdAt: msg.createdAt,
        isRead: msg.isRead || false,
      })));
    } catch (error) {
      toast.error("خطا در دریافت پیام‌ها");
      setMessages([]);
    } finally {
      setLoadingMessages(false);
    }
  };

  const sendMessage = async (selectedRoom: ChatRoom) => {
    if (!newMessage.trim()) return;
    setSending(true);
    try {
      const otherUserId = selectedRoom.users.find(u => u !== ADMIN_ID);
      const sentMessage = await chatService.sendMessage(selectedRoom.room, newMessage, ADMIN_ID);
      setMessages(prev => [...prev, {
        id: sentMessage.id || Date.now(),
        roomId: selectedRoom.room,
        userId: ADMIN_ID,
        message: newMessage,
        createdAt: new Date().toISOString(),
        isRead: true,
      }]);
      setNewMessage("");
      toast.success("پیام ارسال شد");
    } catch (error) {
      toast.error("خطا در ارسال پیام");
    } finally {
      setSending(false);
    }
  };

  const editMessage = async (messageId: number, newMessageText: string) => {
    try {
      await chatService.editMessage(messageId, newMessageText);
      setMessages(prev => prev.map(msg => msg.id === messageId ? { ...msg, message: newMessageText } : msg));
      toast.success("پیام ویرایش شد");
    } catch (error) {
      toast.error("خطا در ویرایش پیام");
    }
  };

  const deleteMessage = async (messageId: number) => {
    try {
      await chatService.deleteMessage(messageId);
      setMessages(prev => prev.filter(msg => msg.id !== messageId));
      toast.success("پیام حذف شد");
    } catch (error) {
      toast.error("خطا در حذف پیام");
    }
  };

  const clearRoomChats = async (roomId: string) => {
    try {
      await chatService.clearRoomChats(roomId);
      setMessages([]);
      toast.success("گفتگو پاک شد");
    } catch (error) {
      toast.error("خطا در پاک کردن گفتگو");
    }
  };

  return {
    rooms,
    usersMap,
    selectedRoom,
    messages,
    loading,
    loadingMessages,
    sending,
    newMessage,
    setNewMessage,
    setSelectedRoom,
    fetchChatRooms,
    fetchMessages,
    sendMessage,
    editMessage,
    deleteMessage,
    clearRoomChats,
    getUserName,
    getUserAvatar,
    formatTime,
    formatDate,
  };
};