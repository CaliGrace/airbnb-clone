"use client";
import React, { useCallback, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import axios from "axios";
import useRegisterModal from "@/app/Hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import useLoginModal from "@/app/Hooks/useLoginModal";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const toggleModal = useCallback(()=> {
    registerModal.onClose()
    loginModal.onOpen()
  }, [loginModal, registerModal])

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setLoading(true);

    axios
      .post("/api/register", data)
      .then(() => {
        registerModal.onClose();
        loginModal.onOpen()
        toast.success("Successfully registered!");
      })
      .catch((error) => {
        toast.error("Could not register user");
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const bodyContent = (
    <div>
      <Heading title="Welcome to airbnb" subtitle="Nice to meet you here!" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Name"
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

  const footer = (
    <div className="flex flex-col gap-4 p-6">
      <Button
        label="Google"
        icon={FcGoogle}
        onClick={() => {
          signIn("google");
        }}
        outline
      />
      <Button
        label="Github"
        icon={FaGithub}
        onClick={() => {
          signIn("github");
        }}
        outline
      />
      <div className="flex gap-4 text-sm items-center justify-center">
        <div className="text-gray-700">Already have an account?</div>
        <div className="transition text-neutral-400 cursor-pointer hover:underline" onClick={toggleModal}>
          Login
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      title="Register"
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel="Continue"
      disabled={isLoading}
      body={bodyContent}
      footer={footer}
    />
  );
};

export default RegisterModal;
