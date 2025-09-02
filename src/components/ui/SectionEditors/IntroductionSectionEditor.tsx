"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, FileText, Image as ImageIcon } from "lucide-react";
import Card from "@/components/ui/Card/Card";
import { IntroductionSectionProps } from "@/types";
import Image from "next/image";
import {
  introductionSchema,
  IntroductionFormData,
} from "@/lib/portfolioValidation";

const IntroductionSectionEditor: React.FC<IntroductionSectionProps> = ({
  data,
  onChange,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IntroductionFormData>({
    resolver: zodResolver(introductionSchema),
    defaultValues: data,
    mode: "onChange",
  });

  const onSubmit = (formData: IntroductionFormData) => {
    onChange(formData);
  };

  // Watch all fields to trigger live updates
  const watchedValues = watch();

  // Debounce the onChange call to prevent infinite loops
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      onChange(watchedValues);
    }, 100); // 100ms debounce

    return () => clearTimeout(timeoutId);
  }, [watchedValues, onChange]);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-display font-bold text-white mb-2">
          Introduction
        </h2>
        <p className="text-white/60">
          Tell the world who you are and what you do. This is the first
          impression visitors will have of your portfolio.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card variant="glass" className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <User className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-semibold text-white">
              Personal Information
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Full Name <span className="text-orange-400">*</span>
              </label>
              <input
                {...register("name")}
                type="text"
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all"
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Professional Title <span className="text-orange-400">*</span>
              </label>
              <input
                {...register("title")}
                type="text"
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all"
                placeholder="Software Engineer, Designer, Product Manager..."
              />
              {errors.title && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Avatar URL
              </label>
              <input
                {...register("avatar")}
                type="url"
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all"
                placeholder="https://example.com/avatar.jpg"
              />
              {errors.avatar && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.avatar.message}
                </p>
              )}
            </div>
          </div>
        </Card>

        <Card variant="glass" className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <FileText className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">About You</h3>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Bio <span className="text-orange-400">*</span>
            </label>
            <textarea
              {...register("bio")}
              rows={4}
              className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all resize-vertical"
              placeholder="Write a brief description about yourself, your experience, and what makes you unique..."
            />
            {errors.bio && (
              <p className="text-red-400 text-xs mt-1">{errors.bio.message}</p>
            )}
            <p className="text-xs text-white/50 mt-1">
              {watch("bio")?.length || 0}/500 characters
            </p>
          </div>
        </Card>

        {/* Preview Section */}
        {watchedValues.name && watchedValues.title && (
          <Card variant="glass" className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <ImageIcon className="w-5 h-5 text-green-400" />
              <h3 className="text-lg font-semibold text-white">Preview</h3>
            </div>
            <div className="text-center">
              {watchedValues.avatar && (
                <Image
                  src={watchedValues.avatar}
                  alt="Avatar preview"
                  width={80}
                  height={80}
                  className="rounded-full mx-auto mb-4 object-cover border-2 border-purple-400"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              )}
              <h2 className="text-2xl font-bold text-white mb-2">
                {watchedValues.name}
              </h2>
              <p className="text-purple-400 text-lg mb-4">
                {watchedValues.title}
              </p>
              {watchedValues.bio && (
                <p className="text-white/80 leading-relaxed">
                  {watchedValues.bio}
                </p>
              )}
            </div>
          </Card>
        )}
      </form>
    </div>
  );
};

export default IntroductionSectionEditor;
