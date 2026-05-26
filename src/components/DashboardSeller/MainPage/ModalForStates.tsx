// components/SmallModal.tsx (یا هر مسیر دیگری که برای مودال خود انتخاب کردید)
import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react'; 

interface SmallModalProps {
    children: React.ReactNode;
    triggerContent: React.ReactNode; 
    isOpenByDefault?: boolean; 
    width?: string;
    height?: string;
    top?: string;
    left?: string;
    marginTop?: string;
    zIndex?: string;
    onClose?: () => void; 
    itemId: string; 
    onAction: (action: string, itemId: string) => void; 
}

const SmallModal: React.FC<SmallModalProps> = ({
    children,
    triggerContent,
    isOpenByDefault = false,
    width = '200px',
    height = 'auto',
    top = '100%',
    left = '0',
    marginTop = '0',
    zIndex = '50',
    onClose,
    itemId,
    onAction,
}) => {
    const [isOpen, setIsOpen] = useState(isOpenByDefault);
    const modalRef = useRef<HTMLDivElement>(null);

    const openModal = () => setIsOpen(true);
    const closeModal = () => {
        setIsOpen(false);
        if (onClose) onClose();
    };

    const handleAction = (action: string) => {
        onAction(action, itemId);
        closeModal(); 
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                if (!isOpenByDefault) {
                    closeModal();
                }
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, isOpenByDefault]);

    return (
        <div className="relative inline-block" ref={modalRef}>
            {/* Trigger Element */}
            <div onClick={openModal}>
                {triggerContent || <button className="bg-blue-500 text-white p-2 rounded">...</button>}
            </div>

            {/* Modal Overlay and Content */}
            {isOpen && (
                <>
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 bg-black opacity-30 z-40"
                        style={{ zIndex: parseInt(zIndex) - 1 }}
                    ></div>

                    {/* Modal Content */}
                    <div
                        ref={modalRef}
                        className={`absolute bg-white shadow-lg rounded-lg border border-gray-200 z-50`}
                        style={{
                            width: width,
                            height: height,
                            top: top,
                            left: left,
                            marginTop: marginTop,
                            zIndex: zIndex,
                        }}
                    >
                        <div className="flex justify-between items-center p-2 border-b border-gray-200 bg-gray-50 rounded-t-lg">
                            <span className="font-semibold text-sm text-gray-700">عملیات</span>
                            <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                                <X size={16} />
                            </button>
                        </div>
                        <div className="p-2">
                            {children}
                            <div className="flex flex-col gap-1 mt-3">
                                <button
                                    onClick={() => handleAction('edit')}
                                    className="text-right hover:bg-gray-100 p-1 rounded text-blue-600 text-sm w-full"
                                >
                                    ویرایش
                                </button>
                                <button
                                    onClick={() => handleAction('toggleStatus')}
                                    className="text-right hover:bg-gray-100 p-1 rounded text-blue-600 text-sm w-full"
                                >
                                    تغییر وضعیت
                                </button>
                                <button
                                    onClick={() => handleAction('delete')}
                                    className="text-right hover:bg-gray-100 p-1 rounded text-red-500 text-sm w-full"
                                >
                                    حذف
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default SmallModal;
