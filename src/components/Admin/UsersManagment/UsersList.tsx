"use client";

import { User } from "../../../app/admin/UsersManagment/page"; 
import { UserCard } from "./edit&delete/UserCard";
import AdvancedScrollAnimation from "@/components/common/Animation/AdvancedScrollAnimation";
import { UsersEmptyState } from "./UsersEmptyState";

interface UsersListProps {
  users: User[];
  loading: boolean;
  search: string;
  roleFilter: string;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

export const UsersList = ({ 
  users, 
  loading, 
  search, 
  roleFilter, 
  onEdit, 
  onDelete 
}: UsersListProps) => {
  if (loading) return null;

  return (
    <div className="flex flex-col gap-3">
      {users.length > 0 ? (
        users.map((user, idx) => (
          <AdvancedScrollAnimation key={user.id} type="slide-up" delay={0.4 + idx * 0.05} duration={0.4}>
            <UserCard
              user={user}
              index={idx}
              onEdit={() => onEdit(user)}
              onDelete={() => onDelete(user.id)}
            />
          </AdvancedScrollAnimation>
        ))
      ) : (
        <UsersEmptyState hasFilters={!!search || roleFilter !== "all"} />
      )}
    </div>
  );
};