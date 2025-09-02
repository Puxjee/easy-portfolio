"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Github,
  Linkedin,
  Twitter,
  Eye,
} from "lucide-react";
import Card from "@/components/ui/Card/Card";
import { contactSchema, ContactFormData } from "@/lib/portfolioValidation";

// Local interface to match the component props
interface Contact {
  email?: string;
  phone?: string;
  location?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
}

interface ContactSectionProps {
  data: Contact;
  onChange: (data: Contact) => void;
}

const ContactSectionEditor: React.FC<ContactSectionProps> = ({
  data,
  onChange,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: data,
    mode: "onChange",
  });

  const onSubmit = (formData: ContactFormData) => {
    onChange(formData);
  };

  // Watch all fields to trigger live updates
  const watchedValues = watch();
  React.useEffect(() => {
    if (isValid) {
      onChange(watchedValues);
    }
  }, [watchedValues, isValid, onChange]);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-display font-bold text-white mb-2">
          Contact Information
        </h2>
        <p className="text-white/60">
          Add your contact details and social media links for others to reach
          you.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Contact Info */}
        <Card variant="glass" className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Mail className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-semibold text-white">
              Basic Information
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Email Address
              </label>
              <input
                {...register("email")}
                type="email"
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all"
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Phone Number
              </label>
              <input
                {...register("phone")}
                type="tel"
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all"
                placeholder="+1 (555) 123-4567"
              />
              {errors.phone && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Location
              </label>
              <input
                {...register("location")}
                type="text"
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all"
                placeholder="City, Country"
              />
              {errors.location && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.location.message}
                </p>
              )}
            </div>
          </div>
        </Card>

        {/* Social Links */}
        <Card variant="glass" className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Globe className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">
              Online Presence
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                <Globe className="w-4 h-4 inline mr-1" />
                Personal Website
              </label>
              <input
                {...register("website")}
                type="url"
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all"
                placeholder="https://yourwebsite.com"
              />
              {errors.website && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.website.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  <Github className="w-4 h-4 inline mr-1" />
                  GitHub Profile
                </label>
                <input
                  {...register("github")}
                  type="url"
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all"
                  placeholder="https://github.com/yourusername"
                />
                {errors.github && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.github.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  <Linkedin className="w-4 h-4 inline mr-1" />
                  LinkedIn Profile
                </label>
                <input
                  {...register("linkedin")}
                  type="url"
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all"
                  placeholder="https://linkedin.com/in/yourusername"
                />
                {errors.linkedin && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.linkedin.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                <Twitter className="w-4 h-4 inline mr-1" />
                Twitter Profile
              </label>
              <input
                {...register("twitter")}
                type="url"
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all"
                placeholder="https://twitter.com/yourusername"
              />
              {errors.twitter && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.twitter.message}
                </p>
              )}
            </div>
          </div>
        </Card>

        {/* Contact Preview */}
        {(watchedValues.email ||
          watchedValues.phone ||
          watchedValues.location ||
          watchedValues.website ||
          watchedValues.github ||
          watchedValues.linkedin ||
          watchedValues.twitter) && (
          <Card variant="glass" className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Eye className="w-5 h-5 text-green-400" />
              <h3 className="text-lg font-semibold text-white">
                Contact Preview
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {watchedValues.email && (
                <div className="flex items-center space-x-2 text-white/80">
                  <Mail className="w-4 h-4 text-purple-400" />
                  <span className="text-sm">{watchedValues.email}</span>
                </div>
              )}

              {watchedValues.phone && (
                <div className="flex items-center space-x-2 text-white/80">
                  <Phone className="w-4 h-4 text-green-400" />
                  <span className="text-sm">{watchedValues.phone}</span>
                </div>
              )}

              {watchedValues.location && (
                <div className="flex items-center space-x-2 text-white/80">
                  <MapPin className="w-4 h-4 text-red-400" />
                  <span className="text-sm">{watchedValues.location}</span>
                </div>
              )}

              {watchedValues.website && (
                <div className="flex items-center space-x-2 text-white/80">
                  <Globe className="w-4 h-4 text-blue-400" />
                  <span className="text-sm">{watchedValues.website}</span>
                </div>
              )}

              {watchedValues.github && (
                <div className="flex items-center space-x-2 text-white/80">
                  <Github className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">{watchedValues.github}</span>
                </div>
              )}

              {watchedValues.linkedin && (
                <div className="flex items-center space-x-2 text-white/80">
                  <Linkedin className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">{watchedValues.linkedin}</span>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Global form error (at least one contact method required) */}
        {errors.email &&
          errors.email.message ===
            "At least one contact method is required" && (
            <Card variant="glass" className="p-4 border-red-500/30">
              <p className="text-red-400 text-sm">
                Please provide at least one way for people to contact you.
              </p>
            </Card>
          )}
      </form>
    </div>
  );
};

export default ContactSectionEditor;
