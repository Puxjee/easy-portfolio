"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  Github,
  AlertCircle,
} from "lucide-react";
import {
  loginSchema,
  registerSchema,
  LoginFormData,
  RegisterFormData,
} from "@/lib/validation";
import Button from "@/components/ui/Button/Button";
import Card from "@/components/ui/Card/Card";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { AuthFormProps } from "@/types";

const AuthForm: React.FC<AuthFormProps> = ({
  isLogin,
  onToggleMode,
  onSubmit,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Login form
  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Register form
  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const currentForm = isLogin ? loginForm : registerForm;

  const handleSubmit = async (data: LoginFormData | RegisterFormData) => {
    setIsLoading(true);

    try {
      if (isLogin) {
        const { data: result, error } = await authClient.signIn.email({
          email: data.email,
          password: data.password,
        });

        if (error) {
          console.error("Sign in error:", error);
          // Handle specific Better-auth error messages
          const errorMessage =
            error.message === "Invalid email or password"
              ? "Invalid email or password. Please try again."
              : error.message || "An error occurred during sign in.";

          // You can set form errors here
          loginForm.setError("root", { message: errorMessage });
        } else {
          // Success - user is now signed in
          console.log("Sign in successful:", result);
          router.push("/dashboard");
        }
      } else {
        const registerData = data as RegisterFormData;
        const { data: result, error } = await authClient.signUp.email({
          email: registerData.email,
          password: registerData.password,
          name: registerData.name,
        });

        if (error) {
          console.error("Sign up error:", error);
          // Handle specific Better-auth error messages
          const errorMessage =
            error.message === "User already exists"
              ? "An account with this email already exists."
              : error.message || "An error occurred during sign up.";

          // You can set form errors here
          registerForm.setError("root", { message: errorMessage });
        } else {
          // Success - user account created and signed in
          console.log("Sign up successful:", result);
          router.push("/dashboard");
        }
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      const errorMessage = "An unexpected error occurred. Please try again.";

      if (isLogin) {
        loginForm.setError("root", { message: errorMessage });
      } else {
        registerForm.setError("root", { message: errorMessage });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const ErrorMessage = ({ message }: { message?: string }) => {
    if (!message) return null;
    return (
      <div className="flex items-center mt-1 text-red-400 text-sm">
        <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
        <span>{message}</span>
      </div>
    );
  };

  const InputField = ({
    name,
    type = "text",
    placeholder,
    icon: Icon,
    showToggle = false,
    showState = false,
    onToggle,
  }: {
    name: keyof LoginFormData | keyof RegisterFormData;
    type?: string;
    placeholder: string;
    icon: React.ComponentType<{ className?: string }>;
    showToggle?: boolean;
    showState?: boolean;
    onToggle?: () => void;
  }) => {
    const loginErrors = loginForm.formState.errors;
    const registerErrors = registerForm.formState.errors;
    const error = isLogin
      ? loginErrors[name as keyof LoginFormData]
      : registerErrors[name as keyof RegisterFormData];

    return (
      <div>
        <div className="relative">
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
          <input
            {...(isLogin
              ? loginForm.register(name as keyof LoginFormData)
              : registerForm.register(name as keyof RegisterFormData))}
            type={showToggle && showState ? "text" : type}
            placeholder={placeholder}
            className={`w-full bg-white/10 border rounded-xl px-12 py-4 text-white placeholder-white/50 focus:outline-none focus:bg-white/15 transition-all duration-300 ${
              error
                ? "border-red-400 focus:border-red-400"
                : "border-white/20 focus:border-purple-400"
            }`}
          />
          {showToggle && (
            <button
              type="button"
              onClick={onToggle}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors"
            >
              {showState ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          )}
        </div>
        <ErrorMessage message={error?.message} />
      </div>
    );
  };

  return (
    <Card variant="glass" className="w-full p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-display font-bold text-white mb-2">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>
        <p className="text-white/70">
          {isLogin
            ? "Sign in to access your portfolio dashboard"
            : "Start building your dream portfolio today"}
        </p>
      </div>

      <form
        onSubmit={currentForm.handleSubmit(handleSubmit)}
        className="space-y-6"
      >
        {!isLogin && (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Section 1: Personal Information */}
            <div className="space-y-4">
              <div className="border-b border-white/10 pb-4 mb-6">
                <h3 className="text-lg font-semibold text-white mb-1">
                  Personal Information
                </h3>
                <p className="text-white/60 text-sm">Tell us about yourself</p>
              </div>

              <InputField name="name" placeholder="Full Name" icon={User} />

              <InputField
                name="email"
                type="email"
                placeholder="Email Address"
                icon={Mail}
              />
            </div>

            {/* Section 2: Account Security */}
            <div className="space-y-4">
              <div className="border-b border-white/10 pb-4 mb-6">
                <h3 className="text-lg font-semibold text-white mb-1">
                  Account Security
                </h3>
                <p className="text-white/60 text-sm">
                  Choose a strong password
                </p>
              </div>

              <InputField
                name="password"
                type="password"
                placeholder="Password"
                icon={Lock}
                showToggle
                showState={showPassword}
                onToggle={() => setShowPassword(!showPassword)}
              />

              <InputField
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                icon={Lock}
                showToggle
                showState={showConfirmPassword}
                onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            </div>
          </div>
        )}

        {isLogin && (
          <div className="space-y-4">
            <InputField
              name="email"
              type="email"
              placeholder="Email Address"
              icon={Mail}
            />

            <InputField
              name="password"
              type="password"
              placeholder="Password"
              icon={Lock}
              showToggle
              showState={showPassword}
              onToggle={() => setShowPassword(!showPassword)}
            />
          </div>
        )}

        {/* Forgot Password - Only for Login */}
        {isLogin && (
          <div className="text-right">
            <button
              type="button"
              className="text-purple-400 hover:text-purple-300 text-sm transition-colors"
            >
              Forgot Password?
            </button>
          </div>
        )}

        {/* Display form-level errors */}
        {(loginForm.formState.errors.root ||
          registerForm.formState.errors.root) && (
          <ErrorMessage
            message={
              isLogin
                ? loginForm.formState.errors.root?.message
                : registerForm.formState.errors.root?.message
            }
          />
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={isLoading || currentForm.formState.isSubmitting}
        >
          {isLoading || currentForm.formState.isSubmitting
            ? "Please wait..."
            : isLogin
            ? "Sign In"
            : "Create Account"}
          {!(isLoading || currentForm.formState.isSubmitting) && (
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          )}
        </Button>

        {/* Divider */}
        <div className="relative flex items-center">
          <div className="flex-grow border-t border-white/20"></div>
          <span className="flex-shrink-0 px-4 text-white/50 text-sm">
            Or continue with
          </span>
          <div className="flex-grow border-t border-white/20"></div>
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => console.log("Google OAuth")}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => console.log("GitHub OAuth")}
          >
            <Github className="w-5 h-5 mr-2" />
            GitHub
          </Button>
        </div>

        {/* Toggle Mode */}
        <div className="text-center">
          <p className="text-white/70">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              type="button"
              onClick={() => {
                onToggleMode();
                currentForm.reset();
              }}
              className="ml-2 text-purple-400 hover:text-purple-300 font-semibold transition-colors"
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </form>
    </Card>
  );
};

export default AuthForm;
