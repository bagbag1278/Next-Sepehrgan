"use client";
import { Heart } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useTranslations } from 'next-intl';
import { toast } from "react-hot-toast";
import axios from "axios";

interface LikeProps {
  houseId?: number;
  onLikeChange?: (liked: boolean) => void;
}

const Like = ({ 
  houseId, 
  onLikeChange 
}: LikeProps) => {
  const t = useTranslations('Like');
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [favoriteId, setFavoriteId] = useState<number | null>(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://188.121.111.8:3003/api";
  const getToken = () => localStorage.getItem("accessToken");

  const getUserIdFromToken = (): number | null => {
    const token = getToken();
    if (!token) return null;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.id || payload.userId || payload.sub || null;
    } catch (error) {
      console.error("Error parsing token:", error);
      return null;
    }
  };

  useEffect(() => {
    const extractedUserId = getUserIdFromToken();
    setUserId(extractedUserId);
    
    // خواندن وضعیت لایک از localStorage
    const liked = localStorage.getItem(`liked_${houseId}`);
    const savedFavoriteId = localStorage.getItem(`favoriteId_${houseId}`);
    if (liked === 'true') {
      setIsLiked(true);
      if (savedFavoriteId) {
        setFavoriteId(Number(savedFavoriteId));
      }
    }
  }, [houseId]);

  const addToFavorites = async () => {
    const token = getToken();
    if (!token) {
      toast.error(t('loginRequired'));
      return;
    }

    if (!houseId || !userId) {
      toast.error(t('missingInfo'));
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/favorites`,
        { house_id: houseId, user_id: userId },
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          } 
        }
      );

      // ذخیره favoriteId از پاسخ سرور
      const newFavoriteId = response.data?.id || response.data?.data?.id;
      setFavoriteId(newFavoriteId);
      localStorage.setItem(`favoriteId_${houseId}`, newFavoriteId);
      
      setIsLiked(true);
      localStorage.setItem(`liked_${houseId}`, 'true');
      
      // پیام لایک موفق
      toast.success(t('addSuccess'), {
        icon: '❤️',
        style: {
          borderRadius: '12px',
          background: '#FFE4E4',
          color: '#E53E3E',
          fontWeight: 'bold',
        },
        duration: 2000,
      });
      
      onLikeChange?.(true);
      
    } catch (error: any) {
      console.error("Error adding to favorites:", error);
      
      // اگر 409 بود، یعنی قبلاً لایک شده
      if (error.response?.status === 409) {
        setIsLiked(true);
        localStorage.setItem(`liked_${houseId}`, 'true');
        
        toast.success(t('alreadyExists'), {
          icon: '❤️',
          style: {
            borderRadius: '12px',
            background: '#FFE4E4',
            color: '#E53E3E',
            fontWeight: 'bold',
          },
          duration: 1500,
        });
        
        onLikeChange?.(true);
      } else if (error.response?.status === 401) {
        toast.error(t('loginRequired'), {
          duration: 3000,
        });
      } else {
        toast.error(error.response?.data?.message || t('addError'));
      }
    } finally {
      setLoading(false);
    }
  };

  const removeFromFavorites = async () => {
    const token = getToken();
    if (!token) {
      toast.error(t('loginRequired'));
      return;
    }

    setLoading(true);
    try {
      // سعی می‌کنیم با favoriteId حذف کنیم
      if (favoriteId) {
        await axios.delete(`${API_BASE_URL}/favorites/${favoriteId}`, {
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        });
      }
      
      setIsLiked(false);
      setFavoriteId(null);
      localStorage.removeItem(`liked_${houseId}`);
      localStorage.removeItem(`favoriteId_${houseId}`);
      
      // پیام آنلایک موفق
      toast.success(t('removeSuccess'), {
        icon: '💔',
        style: {
          borderRadius: '12px',
          background: '#F0F0F0',
          color: '#666',
          fontWeight: 'bold',
        },
        duration: 2000,
      });
      
      onLikeChange?.(false);
      
    } catch (error: any) {
      console.error("Error removing from favorites:", error);
      
      // حتی اگر خطا خورد، وضعیت محلی را تغییر بده
      setIsLiked(false);
      setFavoriteId(null);
      localStorage.removeItem(`liked_${houseId}`);
      localStorage.removeItem(`favoriteId_${houseId}`);
      
      toast.success(t('removeSuccess'), {
        icon: '💔',
        style: {
          borderRadius: '12px',
          background: '#F0F0F0',
          color: '#666',
          fontWeight: 'bold',
        },
        duration: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLikeClick = async () => {
    if (loading) return;
    
    if (isLiked) {
      await removeFromFavorites();
    } else {
      await addToFavorites();
    }
  };

  return (
    <button
      onClick={handleLikeClick}
      disabled={loading}
      className="w-8 h-8 bg-[#F5F5F5] dark:bg-gray-800 dark:border-gray-500 rounded-lg flex items-center justify-center border  border-blue-400 transition-all active:scale-90 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? (
        <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
      ) : (
        <Heart
          size={20}
          className={`transition-all duration-300 ${
            isLiked 
              ? "fill-red-500 text-red-500 scale-110" 
              : "text-gray-400 dark:text-gray-900 hover:text-red-400 hover:scale-110"
          }`}
        />
      )}
    </button>
  );
};

export default Like;