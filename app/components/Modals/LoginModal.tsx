"use client";
import React, { useCallback, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import axios from "axios";
import useLoginModal from "@/app/Hooks/useLoginModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useRegisterModal from "@/app/Hooks/useRegisterModal";

const LoginModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    signIn("credentials", { ...data, redirect: false })
      .then((res) => {
        if (res?.ok) {
          toast.success("Successfully logged in");
          router.refresh();
        } else {
          toast.error(res?.error || "Login failed");
          console.log('Error: ', res)
        }
      })
      .catch((error) => {
        toast.error("Wrong username or password");
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
        loginModal.onClose();
      });
  };

  const bodyContent = (
    <div>
      <Heading title="Welcome back" subtitle="Login to your account" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        type="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const toggleModal = useCallback(()=> {
    loginModal.onClose()
    registerModal.onOpen()
  }, [loginModal, registerModal])

  const footer = (
    <div className="flex flex-col gap-4 p-6">
      <Button label="Google" icon={FcGoogle} onClick={() => {}} outline />
      <Button
        label="Github"
        icon={FaGithub}
        onClick={() => {
          signIn("github");
        }}
        outline
      />
      <div className="flex gap-4 text-sm items-center justify-center">
        <div className="text-gray-700">First time using Airbnb?</div>
        <div className="transition text-neutral-400 cursor-pointer hover:underline"  onClick={toggleModal}>
          Create Account
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      title="Login"
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel="Continue"
      disabled={isLoading}
      body={bodyContent}
      footer={footer}
    />
  );
};

export default LoginModal;
