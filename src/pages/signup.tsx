import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession, signIn } from "next-auth/react";
import { toast } from "react-toastify";

async function createUser(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword: string
) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Something went wrong!");
  }
  return data;
}

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    let mounted = true;
    if (session && mounted) {
      router.replace("/admin");
    }
    return () => {
      mounted = false;
    };
  }, [router, session]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (firstName.trim().length < 2 || lastName.trim().length < 2) {
      setLoading(false);
      toast.error("A name should have more than two characters", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    if (password !== confirmPassword) {
      setLoading(false);
      toast.error("Passwords don't match!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    try {
      await createUser(firstName, lastName, email, password, confirmPassword);

      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/admin",
      });
    } catch (e) {
      setLoading(false);
      toast.error(e.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="mb-3 uppercase text-4xl font-bold">Signup</h2>

      <form onSubmit={handleSubmit} className="max-w-sm">
        <input
          type="text"
          placeholder="First name"
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="text-center rounded-md my-2 p-2 w-full border border-gray-700"
        />
        <input
          type="text"
          placeholder="Last name"
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="text-center rounded-md my-2 p-2 w-full border border-gray-700"
        />
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="text-center rounded-md my-2 p-2 w-full border border-gray-700"
        />
        <input
          type="password"
          placeholder="Enter password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="text-center rounded-md my-2 p-2 w-full border border-gray-700"
        />
        <input
          type="password"
          placeholder="Confirm password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="text-center rounded-md my-2 p-2 w-full border border-gray-700"
        />
        <button
          disabled={loading}
          className={`w-full text-white p-2 rounded-md mt-2 ${
            loading ? "bg-gray-400 cursor-wait" : "bg-gray-700"
          }`}
        >
          {loading ? "Signing up..." : "Signup"}
        </button>
      </form>
      <p>
        Already have an account?{" "}
        <button onClick={() => signIn()} className="font-extrabold">
          Login
        </button>
      </p>
    </div>
  );
}
