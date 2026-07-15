import Pagination from "../../../components/Admin/Pagination/PaginationAdmin";
import { ChatRoom } from "../../../core/api/UsAdmin/useChats";

interface ChatRoomListProps {
  rooms: ChatRoom[];
  selectedRoom: ChatRoom | null;
  currentPage: number;
  totalPages: number;
  onSelectRoom: (room: ChatRoom) => void;
  onPageChange: (page: number) => void;
  getUserName: (userId: number) => string;
}

const ADMIN_ID = 175;

export const ChatRoomList = ({
  rooms,
  selectedRoom,
  currentPage,
  totalPages,
  onSelectRoom,
  onPageChange,
  getUserName,
}: ChatRoomListProps) => {
  return (
    <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="font-bold text-gray-800 dark:text-white">لیست گفتگوها</h3>
      </div>
      <div className="divide-y divide-gray-100 dark:divide-gray-700 flex-1 overflow-y-auto max-h-[600px]">
        {rooms.length > 0 ? rooms.map((room) => (
          <div
            onClick={() => onSelectRoom(room)}
            key={room.room}
            className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${selectedRoom?.room === room.room ? "bg-blue-50 dark:bg-blue-900/20" : ""}`}
          >
            <div className="flex justify-between items-start">
              <p className="font-medium text-gray-800 dark:text-white">اتاق #{room.room}</p>
              <span className="text-xs text-gray-400">{room.users.length} عضو</span>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {room.users.filter(u => u !== ADMIN_ID).map(uid => (
                <span key={uid} className="text-xs text-gray-500">{getUserName(uid)}</span>
              ))}
            </div>
          </div>
        )) : (
          <div className="p-4 text-center text-gray-500">هیچ گفتگویی یافت نشد</div>
        )}
      </div>
      {totalPages > 1 && (
        <div className="p-4 border-t border-gray-200">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
        </div>
      )}
    </div>
  );
};