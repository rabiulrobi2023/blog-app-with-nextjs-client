"use server";

import { FieldValues } from "react-hook-form";

export const register = async (data: FieldValues) => {
  console.log(data);
  const res = await fetch(`${process.env.BASE_API}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log("Console from client site", res);

  if (!res.ok) {
    console.error("User registration falied", await res.text());
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
    console.log("Login failed", await res.text());
  }
  return await res.json();
};
