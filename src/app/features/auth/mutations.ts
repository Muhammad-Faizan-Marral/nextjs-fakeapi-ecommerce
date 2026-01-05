"use client";
import { useMutation } from "@tanstack/react-query";
import { createUser, getProfile, loginUser } from "./service";
import { CreateUserPayload, LoginUserPayload } from "./types";

export const useCreateUserMutation = () =>
  useMutation({
    mutationFn: createUser,
  });

export const useLoginUserMutation = () =>
  useMutation({
    mutationFn: loginUser,
  });

export const useGetProfileMutation = () =>
  useMutation({
    mutationFn: getProfile,
  });
