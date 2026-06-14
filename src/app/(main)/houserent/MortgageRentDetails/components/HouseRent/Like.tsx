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

const Like = ({ houseId, onLikeChange }: LikeProps) => {
  const t = useTranslations('Like');
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [favoriteId, setFavoriteId] = useState<number | null>(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://188.121.111.8:3003/api";
  const getToken = () => localStorage.getItem("accessToken");

  useEffect(() => {
    const savedLiked = localStorage.getItem(`liked_${houseId}`);
    const savedId = localStorage.getItem(`favoriteId_${houseId}`);
    
    if (savedLiked === 'true' && savedId) {
      setIsLiked(true);
      setFavoriteId(Number(savedId));
    }
  }, [houseId]);

  const addToFavorites = async () => {
    const token = getToken();
    if (!token) {
      toast.error(t('loginRequired'));
      return;
    }

    if (!houseId) {
      toast.error(t('missingInfo'));
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/favorites`,
        { house_id: houseId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const newFavoriteId = response.data?.id || response.data?.data?.id || Date.now();
      setFavoriteId(newFavoriteId);
      setIsLiked(true);
      localStorage.setItem(`liked_${houseId}`, 'true');
      localStorage.setItem(`favoriteId_${houseId}`, String(newFavoriteId));
      
      toast.success(t('addSuccess'));
      onLikeChange?.(true);
      
    } catch (error: any) {
      if (error.response?.status === 409) {
        const fakeId = Date.now();
        setIsLiked(true);
        setFavoriteId(fakeId);
        localStorage.setItem(`liked_${houseId}`, 'true');
        localStorage.setItem(`favoriteId_${houseId}`, String(fakeId));
        toast.success(t('alreadyExists'));
        onLikeChange?.(true);
      } else if (error.response?.status === 401) {
        toast.error(t('loginRequired'));
      } else {
        toast.error(t('addError'));
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
      if (favoriteId) {
        await axios.delete(`${API_BASE_URL}/favorites/${favoriteId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      
      setIsLiked(false);
      setFavoriteId(null);
      localStorage.removeItem(`liked_${houseId}`);
      localStorage.removeItem(`favoriteId_${houseId}`);
      
      toast.success(t('removeSuccess'));
      onLikeChange?.(false);
      
    } catch (error: any) {
      if (error.response?.status === 404) {
        setIsLiked(false);
        setFavoriteId(null);
        localStorage.removeItem(`liked_${houseId}`);
        localStorage.removeItem(`favoriteId_${houseId}`);
        toast.success(t('removeSuccess'));
        onLikeChange?.(false);
      } else if (error.response?.status === 401) {
        toast.error(t('loginRequired'));
      } else {
        toast.error(t('removeError'));
      }
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
      className="w-8 h-8 bg-[#F5F5F5] dark:bg-gray-800 dark:border-gray-500 rounded-lg flex items-center justify-center border border-blue-400 transition-all active:scale-90 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? (
        <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
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