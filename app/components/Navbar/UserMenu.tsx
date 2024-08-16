"use client";

import React, {
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
  useRef,
} from "react";

import { IoMdMenu } from "react-icons/io";
import Avatar from "../Avatar";
import { signOut } from "next-auth/react";
import MenuItem from "./MenuItem";

import useRegisterModal from "@/app/Hooks/useRegisterModal";
import useLoginModal from "@/app/Hooks/useLoginModal";
import { User } from "@prisma/client";
import useRentModal from "@/app/Hooks/useRent";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  currentUser?: User | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(isOpen);

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const router = useRouter()

  const humbergerRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  //close menu modal when clicking outside
  useEffect(() => {
    const handleMouseEvent = (event: MouseEvent) => {
      if (
        humbergerRef.current &&
        menuRef.current &&
        !event.composedPath().includes(humbergerRef.current) &&
        !event.composedPath().includes(menuRef.current)
      ) {
        setIsOpen(false);
      }
    };

    document.body.addEventListener("click", handleMouseEvent);
    return () => {
      document.body.removeEventListener("click", handleMouseEvent);
    };
  }, []);

  //toggle user menu
  const toggleIsOpen = useCallback(() => {
    if (!isOpen) {
      setIsOpen(true);
    } else {
      setShowModal(!isOpen);
      setTimeout(() => {
        setIsOpen(!isOpen);
      }, 300);
    }
  }, [isOpen]);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [currentUser, loginModal]);

  return (
    <div className="flex items-center">
      <div
        onClick={onRent}
        className="hidden md:block px-4 py-2 hover:bg-slate-100 rounded-full transition cursor-pointer"
      >
        Airbnb your home
      </div>
      <div
        onClick={toggleIsOpen}
        ref={humbergerRef}
        className="flex justify-center transition cursor-pointer items-center gap-2 hover:shadow-md  rounded-full px-3 py-1"
      >
        <IoMdMenu />
        <div className="hidden md:block">
          <Avatar src={currentUser?.image} />
        </div>
      </div>
      {isOpen && (
        <div
          ref={menuRef}
          className={`${
            showModal ? "translate-x-0" : "translate-x-full opacity-0"
          } transition translate duration-300 absolute w-36 right-14 top-20 bg-white shadow-md rounded-sm`}
        >
          {currentUser ? (
            <>
              <MenuItem label="My trips" onClick={() => {router.push('/trips')}} />
              <MenuItem label="My favorites" onClick={() => {router.push('/favorites')}} />
              <MenuItem label="My reservations" onClick={() => {router.push('/reservations')}} />
              <MenuItem label="My properties" onClick={() => {router.push('/properties')}} />
              <MenuItem label="Airbnb my home" onClick={onRent} />
              <hr />
              <MenuItem label="Logout" onClick={() => signOut()} />
            </>
          ) : (
            <>
              <MenuItem
                label="Login"
                onClick={() => {
                  loginModal.onOpen();
                }}
              />
              <MenuItem
                label="Signup"
                onClick={() => {
                  registerModal.onOpen();
                }}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenu;
