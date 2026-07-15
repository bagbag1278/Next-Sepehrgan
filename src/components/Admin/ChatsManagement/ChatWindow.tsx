import { useState } from "react";
import { RefreshCw, Trash2, Send, Loader2, MessageSquare, Edit, X, Check } from "lucide-react";
import MessageActions from "../../../components/Admin/ChatsManagement/Action/MessageActions";
import { Message } from "../../../core/api/UsAdmin/useChats";

interface ChatWindowProps {
  selectedRoom: any;
  messages: Message[];
  loadingMessages: boolean;
  sending: boolean;
  newMessage: string;
  onMessageChange: (value: string) => void;
  onSendMessage: () => void;
  onRefreshMessages: () => void;
  onClearChats: () => void;
  onEditMessage: (id: number, text: string) => Promise<void>;
  onDeleteMessage: (id: number) => Promise<void>;
  getUserName: (userId: number) => string;
  getUserAvatar: (userId: number) => string;
  formatTime: (date: string) => string;
  formatDate: (date: string) => string;
}

const ADMIN_ID = 175;

export const ChatWindow = ({
  selectedRoom,
  messages,
  loadingMessages,
  sending,
  newMessage,
  onMessageChange,
  onSendMessage,
  onRefreshMessages,
  onClearChats,
  onEditMessage,
  onDeleteMessage,
  getUserName,
  getUserAvatar,
  formatTime,
  formatDate,
}: ChatWindowProps) => {
  const [editingMessage, setEditingMessage] = useState<Message | null>(null);
  const [editText, setEditText] = useState("");

  const startEdit = (msg: Message) => {
    setEditingMessage(msg);
    setEditText(msg.message);
  };

  const cancelEdit = () => {
    setEditingMessage(null);
    setEditText("");
  };

  const saveEdit = async () => {
    if (editingMessage && editText.trim()) {
      await onEditMessage(editingMessage.id, editText.trim());
      setEditingMessage(null);
      setEditText("");
    }
  };

  const groupedMessages = messages.reduce((groups, msg) => {
    const date = formatDate(msg.createdAt);
    if (!groups[date]) groups[date] = [];
    groups[date].push(msg);
    return groups;
  }, {} as Record<string, Message[]>);

  if (!selectedRoom) {
    return (
      <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-md flex items-center justify-center h-[600px]">
        <div className="text-center">
          <MessageSquare size={48} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500">برای شروع گفتگو، یک چت را انتخاب کنید</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden flex flex-col h-[600px]">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <div>
          <h3 className="font-bold text-gray-800 dark:text-white">گفتگو #{selectedRoom.room}</h3>
          <p className="text-xs text-gray-500">
            با: {selectedRoom.users.filter((u: number) => u !== ADMIN_ID).map((u: number) => getUserName(u)).join(", ")}
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={onRefreshMessages} className="p-2 hover:bg-gray-100 rounded-lg" title="به‌روزرسانی">
            <RefreshCw size={18} className="text-gray-500" />
          </button>
          <button onClick={onClearChats} className="p-2 hover:bg-red-100 rounded-lg" title="پاک کردن">
            <Trash2 size={18} className="text-red-500" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {loadingMessages ? (
          <div className="flex justify-center py-10">
            <Loader2 size={30} className="animate-spin text-[#0887CAB2]" />
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-10 text-gray-500">هنوز پیامی ارسال نشده است</div>
        ) : (
          Object.entries(groupedMessages).map(([date, dateMessages]) => (
            <div key={date}>
              <div className="text-center my-4">
                <span className="px-3 py-1 text-xs bg-gray-100 text-gray-500 rounded-full">{date}</span>
              </div>
              {dateMessages.map((msg) => {
                const isAdmin = msg.userId === ADMIN_ID;
                const isEditing = editingMessage?.id === msg.id;

                if (isEditing) {
                  return (
                    <div key={msg.id} className="flex justify-end mb-4">
                      <div className="max-w-[70%] bg-[#0887CAB2] text-white rounded-2xl rounded-br-none p-3">
                        <input
                          type="text"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="w-full bg-transparent border-b border-white/30 text-white focus:outline-none mb-2"
                          autoFocus
                        />
                        <div className="flex justify-end gap-2">
                          <button onClick={saveEdit} className="text-xs bg-white/20 px-2 py-1 rounded-lg hover:bg-white/30">ذخیره</button>
                          <button onClick={cancelEdit} className="text-xs bg-white/20 px-2 py-1 rounded-lg hover:bg-white/30">انصراف</button>
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={msg.id} className={`flex ${isAdmin ? "justify-end" : "justify-start"} mb-4 group`}>
                    <div className={`max-w-[70%] ${isAdmin ? "order-2" : "order-1"}`}>
                      <div className={`flex items-center gap-2 mb-1 ${isAdmin ? "justify-end" : "justify-start"}`}>
                        {!isAdmin && <img src={getUserAvatar(msg.userId)} alt="" className="w-6 h-6 rounded-full" />}
                        <span className="text-xs text-gray-500">{getUserName(msg.userId)}</span>
                        <span className="text-xs text-gray-400">{formatTime(msg.createdAt)}</span>
                        {isAdmin && (
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => startEdit(msg)} className="p-1 hover:bg-white/20 rounded" title="ویرایش">
                              <Edit size={12} />
                            </button>
                            <button onClick={() => onDeleteMessage(msg.id)} className="p-1 hover:bg-white/20 rounded" title="حذف">
                              <Trash2 size={12} />
                            </button>
                          </div>
                        )}
                      </div>
                      <div className={`p-3 rounded-2xl ${isAdmin ? "bg-[#0887CAB2] text-white rounded-br-none" : "bg-gray-100 dark:bg-gray-700 text-gray-800 rounded-bl-none"}`}>
                        <p className="text-sm break-words">{msg.message}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => onMessageChange(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && onSendMessage()}
            placeholder="پیام خود را بنویسید..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0887CAB2]"
          />
          <button
            onClick={onSendMessage}
            disabled={sending || !newMessage.trim()}
            className="px-4 py-2 rounded-xl bg-[#0887CAB2] text-white hover:bg-[#0887CA]/90 transition-all disabled:opacity-50 flex items-center justify-center min-w-[60px]"
          >
            {sending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
};