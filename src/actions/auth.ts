"use server";

import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const register = async (data: FieldValues) => {
  const res = await fetch(`${process.env.BASE_API}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    toast.error("Registration failed");
  }

  return await res.json();
};

export const login = async (data: FieldValues) => {
  const res = await fetch(`${process.env.BASE_API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res?.ok) {
    toast.error("Login failed");
  }
  return await res.json();
};
