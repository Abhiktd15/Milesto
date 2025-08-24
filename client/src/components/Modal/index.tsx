import React from 'react'
import ReactDOM from 'react-dom'
import Header from '../Header';
import { Button } from '../ui/button';
import { X } from 'lucide-react';

type Props = {
    children:React.ReactNode;
    isOpen :boolean;
    onClose:() => void;
    name:string;
}

const Modal = ({children,isOpen,onClose,name}: Props) => {
    if(!isOpen) return null;
    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center overflow-y-auto p-4">
            {/* Overlay */}
            <div className="absolute inset-0 bg-gray-500 dark:bg-gray-700 opacity-50"></div>
            {/* Modal Content */}
            <div className="relative w-full max-w-lg rounded-lg bg-[#ffffff] dark:bg-[#0c0c0c] py-8 px-8 shadow-lg  dark:bg-dark-secondary">
                <Header
                    name={name}
                    buttonComponent={
                    <Button className='bg-gray-600 dark:bg-gray-200' onClick={onClose}>
                        <X size={20} />
                    </Button>
                    }
                    isSmallText
                />
                {children}
            </div>
        </div>,
            document.body,
        );
    };
    
    export default Modal;