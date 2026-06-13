"use client";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  Search,
  MessageSquare,
  Users,
  Send,
  Phone,
  Mail,
  Clock,
  Loader2,
  Trash2,
  RefreshCw,
  AlertTriangle,
  X,
  Edit,
  MoreHorizontal,
} from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { createPortal } from "react-dom";
import Pagination from "../../../components/Admin/Pagination/PaginationAdmin";
import AdvancedScrollAnimation from "@/components/common/Animation/AdvancedScrollAnimation";
import axios from "axios";

interface ChatRoom {
  id?: number;
  room: string;
  users: number[];
}

interface UserInfo {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile?: string;
}

interface Message {
  id: number;
  roomId: string;
  userId: number;
  message: string;
  createdAt: string;
  isRead: boolean;
}

const ChatsManagement = () => {
  const router = useRouter();
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [usersMap, setUsersMap] = useState<Map<number, UserInfo>>(new Map());
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sending, setSending] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showClearModal, setShowClearModal] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [editingMessage, setEditingMessage] = useState<Message | null>(null);
  const [editText, setEditText] = useState("");
  const [showActionsForMessage, setShowActionsForMessage] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = 5;

  const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://188.121.111.8:3003";

  const getUserName = (userId: number): string => {
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

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  useEffect(() => { scrollToBottom(); }, [messages]);

  const fetchUsers = async (userIds: number[]) => {
    const token = localStorage.getItem("accessToken");
    const newMap = new Map<number, UserInfo>();

    for (const uid of userIds) {
      if (uid === 175) continue;
      try {
        const res = await fetch(`${API_BASE_URL}/users/${uid}`, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        });

        if (res.ok) {
          const data = await res.json();
          const userData = data.data || data;
          newMap.set(uid, {
            id: userData.id || uid,
            firstName: userData.firstName || "",
            lastName: userData.lastName || "",
            email: userData.email || "",
            mobile: userData.phoneNumber || userData.mobile || "",
          });
        } else {
          newMap.set(uid, { id: uid, firstName: `کاربر`, lastName: `${uid}`, email: "", mobile: "" });
        }
      } catch {
        newMap.set(uid, { id: uid, firstName: `کاربر`, lastName: `${uid}`, email: "", mobile: "" });
      }
    }
    setUsersMap(newMap);
  };

  const fetchChatRooms = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) { router.push("/login"); return; }

      const res = await fetch(`${API_BASE_URL}/admin/chat-rooms`, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });

      if (!res.ok) {
        if (res.status === 401) { localStorage.removeItem("accessToken"); router.push("/login"); return; }
        throw new Error(`HTTP ${res.status}`);
      }

      const result = await res.json();
      let roomsData = result.data || result;
      if (!Array.isArray(roomsData)) roomsData = [];

      const normalizedRooms: ChatRoom[] = roomsData.map((item: any) => ({
        id: item.id,
        room: String(item.room || item.id || item.roomId),
        users: (item.users || item.userIds || []).filter((u: number) => u !== 175),
      }));

      setRooms(normalizedRooms);
      const allUserIds = [...new Set(normalizedRooms.flatMap((r) => r.users))];
      if (allUserIds.length > 0) await fetchUsers(allUserIds);
    } catch (error) {
      console.error("Error fetching chat rooms:", error);
      toast.error("خطا در دریافت لیست گفتگوها");
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = useCallback(async (roomId: string) => {
    setLoadingMessages(true);
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`${API_BASE_URL}/admin/chat-rooms/${roomId}/chats`, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const result = await response.json();
      
      let messagesArray: any[] = [];
      if (result?.chats && Array.isArray(result.chats)) {
        messagesArray = result.chats;
      } else if (Array.isArray(result)) {
        messagesArray = result;
      } else if (result?.data && Array.isArray(result.data)) {
        messagesArray = result.data;
      }

      const formattedMessages: Message[] = messagesArray.map((msg: any, index: number) => ({
        id: msg.id,
        roomId: String(msg.room || roomId),
        userId: msg.senderId || msg.userId,
        message: msg.message || (msg.files?.length ? "📎 فایل" : ""),
        createdAt: msg.createdAt || new Date(Date.now() + (msg.id || index)).toISOString(),
        isRead: msg.isRead || false,
      }));

      formattedMessages.sort((a, b) => a.id - b.id);

      setMessages(formattedMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      setMessages([]);
    } finally {
      setLoadingMessages(false);
    }
  }, []);

  const handleSelectRoom = async (room: ChatRoom) => {
    setSelectedRoom(room);
    setShowActionsForMessage(null);
    setEditingMessage(null);
    await fetchMessages(room.room);
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedRoom || !currentUserId) return;

    setSending(true);
    try {
      const token = localStorage.getItem("accessToken");

      const payload = {
        room: selectedRoom.room,
        sender: currentUserId.toString(),
        message: newMessage,
        getterId: "175"
      };

      const response = await axios.post(`${API_BASE_URL}/chats/send`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const newMsg: Message = {
        id: response.data.id,
        roomId: selectedRoom.room,
        userId: currentUserId,
        message: newMessage,
        createdAt: new Date().toISOString(),
        isRead: true,
      };
      
      setMessages(prev => [...prev, newMsg].sort((a, b) => a.id - b.id));
      setNewMessage("");
      scrollToBottom();
      toast.success(`پیام با موفقیت ارسال شد`);

    } catch (error: any) {
      console.error("Error sending message:", error);
      toast.error(error.response?.data?.message || "خطا در ارسال پیام");
    } finally {
      setSending(false);
    }
  };

  const handleEditMessage = async () => {
    if (!editingMessage || !editText.trim()) return;
    
    try {
      const token = localStorage.getItem("accessToken");
      await axios.put(`${API_BASE_URL}/admin/chats/${editingMessage.id}`,
        { message: editText },
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
      );
      
      setMessages((prev) => 
        prev.map((msg) => msg.id === editingMessage.id ? { ...msg, message: editText } : msg)
      );
      
      setEditingMessage(null);
      setEditText("");
      toast.success("پیام با موفقیت ویرایش شد");
    } catch (error) {
      console.error("Error editing message:", error);
      toast.error("خطا در ویرایش پیام");
    }
  };

  const handleDeleteMessage = async (messageId: number) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`${API_BASE_URL}/admin/chats/${messageId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
      setShowActionsForMessage(null);
      toast.success("پیام با موفقیت حذف شد");
    } catch (error) {
      console.error("Error deleting message:", error);
      toast.error("خطا در حذف پیام");
    }
  };

  const handleClearRoomChats = async () => {
    if (!selectedRoom) return;
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`${API_BASE_URL}/admin/chat-rooms/${selectedRoom.room}/clear`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      setMessages([]);
      toast.success("تمام پیام‌های این گفتگو پاک شد");
      setShowClearModal(false);
    } catch (error) {
      console.error("Error clearing room:", error);
      toast.error("خطا در پاک کردن گفتگو");
    }
  };

  const handleRefreshMessages = async () => {
    if (!selectedRoom) return;
    await fetchMessages(selectedRoom.room);
    toast.success("پیام‌ها به‌روزرسانی شد");
  };

  const groupedMessages = useMemo(() => {
    if (!Array.isArray(messages) || messages.length === 0) return {};
    try {
      const sorted = [...messages].sort((a, b) => a.id - b.id);
      return sorted.reduce((groups, message) => {
        if (!message?.createdAt) return groups;
        const date = formatDate(message.createdAt);
        if (!groups[date]) groups[date] = [];
        groups[date].push(message);
        return groups;
      }, {} as Record<string, Message[]>);
    } catch { return {}; }
  }, [messages]);

  const filteredRooms = rooms.filter((room) => {
    const matchesRoom = room.room.includes(search);
    const matchesUser = room.users.some((userId) => {
      const name = getUserName(userId);
      return name.includes(search) || String(userId).includes(search);
    });
    return matchesRoom || matchesUser;
  });

  const paginatedRooms = filteredRooms.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredRooms.length / itemsPerPage);

  useEffect(() => { setCurrentPage(1); }, [search]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) { router.push("/login"); return; }
    
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setCurrentUserId(user.id);
      } catch {
        setCurrentUserId(null);
      }
    }
    
    fetchChatRooms();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 size={40} className="animate-spin text-[#0887CAB2] mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl" className="px-4 sm:px-8 py-6 space-y-6 min-h-screen">
      <AdvancedScrollAnimation type="slide-right" delay={0.1}>
        <div className="bg-gradient-to-br from-slate-100 via-white to-gray-100 dark:from-slate-950 dark:via-gray-900 dark:to-slate-900 rounded-tl-[42px] rounded-br-[42px] rounded-2xl p-7 shadow-lg shadow-gray-200/70 dark:shadow-none border border-gray-200 dark:border-gray-700/50">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">گفتگو ها مدیریت</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">به مدیریت گفتگوها خوش آمدید</p>
        </div>
      </AdvancedScrollAnimation>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AdvancedScrollAnimation type="fade" delay={0.1}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                <MessageSquare size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">کل گفتگوها</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">{rooms.length}</p>
              </div>
            </div>
          </div>
        </AdvancedScrollAnimation>
        <AdvancedScrollAnimation type="fade" delay={0.2}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                <Users size={20} className="text-green-700" />
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">کاربران درگیر</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">{usersMap.size}</p>
              </div>
            </div>
          </div>
        </AdvancedScrollAnimation>
        <AdvancedScrollAnimation type="fade" delay={0.3}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center">
                <Clock size={20} className="text-yellow-600" />
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">پیام‌های نخوانده</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">۰</p>
              </div>
            </div>
          </div>
        </AdvancedScrollAnimation>
      </div>

      <AdvancedScrollAnimation type="slide-up" delay={0.2}>
        <div className="relative w-full sm:w-96">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0887CAB2]" size={18} />
          <input
            type="text"
            placeholder="جستجوی اتاق یا نام کاربر..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-12 pr-10 pl-4 border border-[#0887CAB2] rounded-2xl bg-white dark:bg-gray-800 text-[#0887CAB2] focus:outline-none focus:ring-2 focus:ring-[#0887CAB2]"
          />
        </div>
      </AdvancedScrollAnimation>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-gray-800 dark:text-white">لیست گفتگوها</h3>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-700 flex-1 overflow-y-auto max-h-[600px]">
            {paginatedRooms.length > 0 ? (
              paginatedRooms.map((room) => (
                <div
                  onClick={() => handleSelectRoom(room)}
                  key={room.room}
                  className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${selectedRoom?.room === room.room ? "bg-blue-50 dark:bg-blue-900/20" : ""}`}
                >
                  <div className="flex justify-between items-start">
                    <p className="font-medium text-gray-800 dark:text-white">اتاق #{room.room}</p>
                    <span className="text-xs text-gray-400 dark:text-gray-500">{room.users.length} عضو</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {room.users.map((uid) => (
                      <span key={uid} className="text-xs text-gray-500 dark:text-gray-400">{getUserName(uid)}</span>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">هیچ گفتگویی یافت نشد</div>
            )}
          </div>
          {totalPages > 1 && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
          )}
        </div>

        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden flex flex-col h-[600px]">
          {selectedRoom ? (
            <>
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-gray-800 dark:text-white">گفتگو #{selectedRoom.room}</h3>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      شرکت‌کنندگان: {selectedRoom.users.map((u) => getUserName(u)).join(", ")}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={handleRefreshMessages} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors" title="به‌روزرسانی">
                    <RefreshCw size={18} className="text-gray-500" />
                  </button>
                  <button onClick={() => setShowClearModal(true)} className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors" title="پاک کردن تمام پیام‌ها">
                    <Trash2 size={18} className="text-red-500" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {loadingMessages ? (
                  <div className="flex justify-center py-10">
                    <Loader2 size={30} className="animate-spin text-[#0887CAB2]" />
                  </div>
                ) : !Array.isArray(messages) || messages.length === 0 ? (
                  <div className="text-center py-10 text-gray-500 dark:text-gray-400">هنوز پیامی ارسال نشده است</div>
                ) : (
                  Object.entries(groupedMessages).map(([date, dateMessages]) => (
                    <div key={date}>
                      <div className="text-center my-4">
                        <span className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-full">{date}</span>
                      </div>
                      {dateMessages.map((msg) => {
                        const isCurrentUser = msg.userId === currentUserId;
                        return (
                          <div key={msg.id} className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} mb-4 group`}>
                            <div className={`max-w-[70%] ${isCurrentUser ? "order-2" : "order-1"}`}>
                              <div className={`flex items-center gap-2 mb-1 ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                                {!isCurrentUser && <img src={getUserAvatar(msg.userId)} alt="" className="w-6 h-6 rounded-full" />}
                                <span className="text-xs text-gray-500 dark:text-gray-400">{getUserName(msg.userId)}</span>
                                <span className="text-xs text-gray-400">{formatTime(msg.createdAt)}</span>
                                {isCurrentUser && (
                                  <div className="relative">
                                    <button
                                      onClick={() => setShowActionsForMessage(showActionsForMessage === msg.id ? null : msg.id)}
                                      className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors"
                                    >
                                      <MoreHorizontal size={14} />
                                    </button>
                                    {showActionsForMessage === msg.id && (
                                      <div className="absolute left-0 top-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 z-10 min-w-[100px]">
                                        <button
                                          onClick={() => {
                                            setEditingMessage(msg);
                                            setEditText(msg.message);
                                            setShowActionsForMessage(null);
                                          }}
                                          className="w-full px-3 py-2 text-right text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                                        >
                                          <Edit size={14} />
                                          ویرایش
                                        </button>
                                        <button
                                          onClick={() => handleDeleteMessage(msg.id)}
                                          className="w-full px-3 py-2 text-right text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                                        >
                                          <Trash2 size={14} />
                                          حذف
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                              <div className={`p-3 rounded-2xl ${isCurrentUser ? "bg-[#0887CAB2] text-white rounded-br-none" : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-bl-none"}`}>
                                <p className="text-sm break-words whitespace-pre-wrap">{msg.message}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="پیام خود را بنویسید..."
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0887CAB2] transition-all"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={sending || !newMessage.trim()}
                    className="px-4 py-2 rounded-xl bg-[#0887CAB2] text-white hover:bg-[#0887CA]/90 transition-all disabled:opacity-50 flex items-center justify-center min-w-[60px]"
                  >
                    {sending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-3" />
                <p className="text-gray-500 dark:text-gray-400">برای شروع گفتگو، یک چت را انتخاب کنید</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal ویرایش پیام */}
      {editingMessage && createPortal(
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setEditingMessage(null)} />
          <div dir="rtl" className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl z-50 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white">ویرایش پیام</h2>
              <button onClick={() => setEditingMessage(null)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <X size={18} />
              </button>
            </div>
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0887CAB2] resize-none"
              rows={4}
              placeholder="متن پیام را وارد کنید..."
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleEditMessage}
                className="flex-1 py-2 rounded-xl bg-[#0887CAB2] hover:bg-[#0887CA]/90 text-white font-medium transition-colors"
              >
                ذخیره
              </button>
              <button
                onClick={() => setEditingMessage(null)}
                className="flex-1 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
              >
                انصراف
              </button>
            </div>
          </div>
        </>,
        document.body
      )}

      {/* Modal پاک کردن کل روم */}
      {showClearModal && createPortal(
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setShowClearModal(false)} />
          <div dir="rtl" className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-2xl z-50 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white">پاک کردن گفتگو</h2>
              <button onClick={() => setShowClearModal(false)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <X size={18} />
              </button>
            </div>
            <div className="flex flex-col items-center text-center gap-4 py-2">
              <div className="w-14 h-14 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <AlertTriangle size={28} className="text-red-300" />
              </div>
              <div>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  آیا از پاک کردن تمام پیام‌های
                  <span className="font-bold text-gray-900 dark:text-white mx-1">«گفتگو #{selectedRoom?.room}»</span>
                  اطمینان دارید؟
                </p>
                <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">این عملیات قابل بازگشت نیست</p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleClearRoomChats} className="flex-1 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium transition-colors flex items-center justify-center gap-2">
                <Trash2 size={16} />
                پاک کن
              </button>
              <button onClick={() => setShowClearModal(false)} className="flex-1 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all">
                انصراف
              </button>
            </div>
          </div>
        </>,
        document.body
      )}
    </div>
  );
};

export default ChatsManagement;