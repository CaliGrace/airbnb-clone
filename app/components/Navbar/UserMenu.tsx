"use client";

import React, { useCallback } from "react";
import { IoMdMenu } from "react-icons/io";
import Avatar from "../Avatar";
import { useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/Hooks/useRegisterModal";
import useLoginModal from "@/app/Hooks/useLoginModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";

interface UserMenuProps {
  currentUser?: User | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const toggleIsOpen = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <div className="flex items-center">
      <div className="hidden md:block px-4 py-2 hover:bg-slate-100 rounded-full transition cursor-pointer">
        Airbnb your home
      </div>
      <div
        onClick={toggleIsOpen}
        className="flex justify-center cursor-pointer items-center gap-2 hover:shadow-md transition rounded-full px-3 py-1"
      >
        <IoMdMenu />
        <div className="hidden md:block">
          <Avatar src={currentUser?.image}/>
        </div>
      </div>
      {isOpen && (
        <div className="absolute w-36 right-14 top-20 bg-white shadow-md rounded-sm">
          {currentUser ? (
            <>
              <MenuItem label="My trips" onClick={() => {}} />
              <MenuItem label="My favorites" onClick={() => {}} />
              <MenuItem label="My reservations" onClick={() => {}} />
              <MenuItem label="My properties" onClick={() => {}} />
              <MenuItem label="Airbnb my home" onClick={() => {}} />
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
