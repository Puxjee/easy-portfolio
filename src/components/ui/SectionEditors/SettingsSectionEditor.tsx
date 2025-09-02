import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Palette, Eye, Globe, Shield, Monitor, Sun, Moon } from "lucide-react";
import Card from "@/components/ui/Card/Card";

// Create settings schemas
import { z } from "zod";

const settingsSchema = z.object({
  theme: z.enum(["dark", "light", "auto"]).refine((val) => val, {
    message: "Please select a theme",
  }),
  primaryColor: z
    .string()
    .min(1, "Primary color is required")
    .regex(/^#[0-9A-F]{6}$/i, "Please enter a valid hex color"),
  font: z.string().min(1, "Font selection is required"),
  showContactInfo: z.boolean(),
  showSocialLinks: z.boolean(),
  enableAnimations: z.boolean(),
  isPublic: z.boolean(),
  customDomain: z
    .string()
    .regex(
      /^[a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?)*$/,
      "Please enter a valid domain"
    )
    .optional()
    .or(z.literal("")),
  seoTitle: z
    .string()
    .max(60, "SEO title should be less than 60 characters")
    .optional()
    .or(z.literal("")),
  seoDescription: z
    .string()
    .max(160, "SEO description should be less than 160 characters")
    .optional()
    .or(z.literal("")),
});

type SettingsFormData = z.infer<typeof settingsSchema>;

interface SettingsSectionProps {
  data: SettingsFormData;
  onChange: (data: SettingsFormData) => void;
}

const SettingsSectionEditor: React.FC<SettingsSectionProps> = ({
  data,
  onChange,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: data,
    mode: "onChange",
  });

  const onSubmit = (formData: SettingsFormData) => {
    onChange(formData);
  };

  // Watch all fields to trigger live updates
  const watchedValues = watch();
  React.useEffect(() => {
    // Always propagate changes to parent for live preview, even if form has validation errors
    onChange(watchedValues);
  }, [watchedValues, onChange]);

  const themeOptions = [
    {
      value: "dark" as const,
      label: "Dark",
      description: "Dark theme with purple gradients",
      icon: Moon,
    },
    {
      value: "light" as const,
      label: "Light",
      description: "Clean light theme",
      icon: Sun,
    },
    {
      value: "auto" as const,
      label: "Auto",
      description: "Follow system preference",
      icon: Monitor,
    },
  ];

  const colorOptions = [
    { name: "Purple", value: "#8B5CF6", class: "bg-purple-500" },
    { name: "Blue", value: "#3B82F6", class: "bg-blue-500" },
    { name: "Green", value: "#10B981", class: "bg-green-500" },
    { name: "Pink", value: "#EC4899", class: "bg-pink-500" },
    { name: "Orange", value: "#F59E0B", class: "bg-orange-500" },
    { name: "Red", value: "#EF4444", class: "bg-red-500" },
    { name: "Indigo", value: "#6366F1", class: "bg-indigo-500" },
    { name: "Teal", value: "#14B8A6", class: "bg-teal-500" },
  ];

  const fontOptions = [
    { name: "Inter", value: "Inter", class: "font-sans" },
    {
      name: "Playfair Display",
      value: "Playfair Display",
      class: "font-serif",
    },
    { name: "JetBrains Mono", value: "JetBrains Mono", class: "font-mono" },
    { name: "Poppins", value: "Poppins", class: "font-sans" },
    { name: "Roboto", value: "Roboto", class: "font-sans" },
    { name: "Open Sans", value: "Open Sans", class: "font-sans" },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-display font-bold text-white mb-2">
          Portfolio Settings
        </h2>
        <p className="text-white/60">
          Customize the appearance, privacy, and SEO settings for your
          portfolio.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Theme & Appearance */}
        <Card variant="glass" className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Palette className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-semibold text-white">
              Theme & Appearance
            </h3>
          </div>

          <div className="space-y-6">
            {/* Theme Selection */}
            <div>
              <label className="block text-sm font-medium text-white mb-3">
                Theme *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {themeOptions.map((theme) => {
                  const Icon = theme.icon;
                  return (
                    <label key={theme.value} className="cursor-pointer">
                      <input
                        {...register("theme")}
                        type="radio"
                        value={theme.value}
                        className="sr-only peer"
                      />
                      <div className="p-4 border border-white/20 rounded-lg peer-checked:border-purple-400 peer-checked:bg-purple-500/10 hover:border-purple-400/50 transition-all">
                        <div className="flex items-center space-x-3">
                          <Icon className="w-5 h-5 text-purple-400" />
                          <div>
                            <div className="font-medium text-white">
                              {theme.label}
                            </div>
                            <div className="text-sm text-white/60">
                              {theme.description}
                            </div>
                          </div>
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
              {errors.theme && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.theme.message}
                </p>
              )}
            </div>

            {/* Primary Color */}
            <div>
              <label className="block text-sm font-medium text-white mb-3">
                Primary Color *
              </label>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                {colorOptions.map((color) => (
                  <label key={color.value} className="cursor-pointer">
                    <input
                      {...register("primaryColor")}
                      type="radio"
                      value={color.value}
                      className="sr-only peer"
                    />
                    <div
                      className={`w-12 h-12 ${color.class} rounded-lg border-2 border-transparent peer-checked:border-white peer-checked:scale-110 hover:scale-105 transition-all`}
                    />
                    <span className="block text-xs text-white/60 text-center mt-1">
                      {color.name}
                    </span>
                  </label>
                ))}
              </div>
              {errors.primaryColor && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.primaryColor.message}
                </p>
              )}
            </div>

            {/* Font Selection */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Font Family *
              </label>
              <select
                {...register("font")}
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all"
              >
                <option value="">Select font...</option>
                {fontOptions.map((font) => (
                  <option
                    key={font.value}
                    value={font.value}
                    className="bg-gray-800"
                  >
                    {font.name}
                  </option>
                ))}
              </select>
              {errors.font && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.font.message}
                </p>
              )}
            </div>
          </div>
        </Card>

        {/* Privacy & Display */}
        <Card variant="glass" className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Shield className="w-5 h-5 text-green-400" />
            <h3 className="text-lg font-semibold text-white">
              Privacy & Display
            </h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-white font-medium">
                  Show Contact Information
                </label>
                <p className="text-sm text-white/60">
                  Display your contact details on the portfolio
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  {...register("showContactInfo")}
                  type="checkbox"
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-white font-medium">
                  Show Social Links
                </label>
                <p className="text-sm text-white/60">
                  Display social media links and profiles
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  {...register("showSocialLinks")}
                  type="checkbox"
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-white font-medium">
                  Enable Animations
                </label>
                <p className="text-sm text-white/60">
                  Add smooth transitions and hover effects
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  {...register("enableAnimations")}
                  type="checkbox"
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-white font-medium">
                  Public Portfolio
                </label>
                <p className="text-sm text-white/60">
                  Allow search engines to index your portfolio
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  {...register("isPublic")}
                  type="checkbox"
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
              </label>
            </div>
          </div>
        </Card>

        {/* SEO & Domain */}
        <Card variant="glass" className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Globe className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">SEO & Domain</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Custom Domain
                <span className="text-white/50 text-xs ml-1">(Optional)</span>
              </label>
              <input
                {...register("customDomain")}
                type="text"
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all"
                placeholder="yourname.com"
              />
              {errors.customDomain && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.customDomain.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                SEO Title
                <span className="text-white/50 text-xs ml-1">
                  (Optional, {watchedValues.seoTitle?.length || 0}/60)
                </span>
              </label>
              <input
                {...register("seoTitle")}
                type="text"
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all"
                placeholder="John Doe - Full Stack Developer"
                maxLength={60}
              />
              {errors.seoTitle && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.seoTitle.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                SEO Description
                <span className="text-white/50 text-xs ml-1">
                  (Optional, {watchedValues.seoDescription?.length || 0}/160)
                </span>
              </label>
              <textarea
                {...register("seoDescription")}
                rows={3}
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all resize-none"
                placeholder="Experienced full stack developer specializing in React, Node.js, and modern web technologies. Available for freelance projects and full-time opportunities."
                maxLength={160}
              />
              {errors.seoDescription && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.seoDescription.message}
                </p>
              )}
            </div>
          </div>
        </Card>

        {/* Settings Preview */}
        {(watchedValues.theme || watchedValues.primaryColor) && (
          <Card variant="glass" className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Eye className="w-5 h-5 text-green-400" />
              <h3 className="text-lg font-semibold text-white">
                Settings Preview
              </h3>
            </div>

            <div className="space-y-3 text-sm">
              {watchedValues.theme && (
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Theme:</span>
                  <span className="text-white capitalize">
                    {watchedValues.theme}
                  </span>
                </div>
              )}

              {watchedValues.primaryColor && (
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Primary Color:</span>
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-4 h-4 rounded border border-white/20"
                      style={{ backgroundColor: watchedValues.primaryColor }}
                    />
                    <span className="text-white">
                      {watchedValues.primaryColor}
                    </span>
                  </div>
                </div>
              )}

              {watchedValues.font && (
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Font:</span>
                  <span className="text-white">{watchedValues.font}</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-white/70">Portfolio Status:</span>
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    watchedValues.isPublic
                      ? "bg-green-500/20 text-green-300"
                      : "bg-orange-500/20 text-orange-300"
                  }`}
                >
                  {watchedValues.isPublic ? "Public" : "Private"}
                </span>
              </div>
            </div>
          </Card>
        )}

        {/* Tips */}
        <Card variant="glass" className="p-4">
          <h4 className="text-white font-medium mb-2">💡 Settings Tips:</h4>
          <ul className="text-white/70 text-sm space-y-1">
            <li>
              • Choose colors that reflect your personal brand and industry
            </li>
            <li>
              • Dark themes are popular for tech portfolios, light for creative
              fields
            </li>
            <li>
              • SEO title and description help your portfolio appear in search
              results
            </li>
            <li>
              • Enable animations for a modern feel, but consider accessibility
            </li>
          </ul>
        </Card>
      </form>
    </div>
  );
};

export default SettingsSectionEditor;
