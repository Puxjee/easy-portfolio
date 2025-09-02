"use client";

import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X, Trophy, Calendar, Eye, Star } from "lucide-react";
import Card from "@/components/ui/Card/Card";

// Create achievements schemas
import { z } from "zod";

const achievementItemSchema = z.object({
  id: z.string().optional(),
  title: z
    .string()
    .min(1, "Achievement title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be less than 500 characters"),
  date: z
    .string()
    .min(1, "Date is required")
    .max(20, "Date must be less than 20 characters"),
  issuer: z
    .string()
    .max(100, "Issuer must be less than 100 characters")
    .optional()
    .or(z.literal("")),
  link: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  category: z
    .string()
    .max(50, "Category must be less than 50 characters")
    .optional()
    .or(z.literal("")),
});

const achievementsSchema = z.object({
  achievements: z
    .array(achievementItemSchema)
    .min(1, "At least one achievement is required")
    .max(15, "Maximum 15 achievements allowed"),
});

type AchievementItemFormData = z.infer<typeof achievementItemSchema>;
type AchievementsFormData = z.infer<typeof achievementsSchema>;

interface AchievementsSectionProps {
  data: { achievements: AchievementItemFormData[] };
  onChange: (data: { achievements: AchievementItemFormData[] }) => void;
}

const categoryOptions = [
  "Academic",
  "Professional",
  "Technical Certification",
  "Competition",
  "Leadership",
  "Community Service",
  "Sports",
  "Arts & Creative",
  "Language",
  "Other",
];

const AchievementsSectionEditor: React.FC<AchievementsSectionProps> = ({
  data,
  onChange,
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<AchievementsFormData>({
    resolver: zodResolver(achievementsSchema),
    defaultValues:
      data.achievements?.length > 0 ? data : { achievements: [{}] },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "achievements",
  });

  const onSubmit = (formData: AchievementsFormData) => {
    onChange(formData);
  };

  // Watch all fields to trigger live updates
  const watchedValues = watch();
  React.useEffect(() => {
    // Always propagate changes to parent for live preview, even if form has validation errors
    onChange(watchedValues);
  }, [watchedValues, onChange]);

  const addAchievement = () => {
    append({} as AchievementItemFormData);
  };

  const removeAchievement = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-display font-bold text-white mb-2">
          Achievements & Awards
        </h2>
        <p className="text-white/60">
          Highlight your accomplishments, certifications, awards, and notable
          recognitions.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {fields.map((field, index) => (
          <Card key={field.id} variant="glass" className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <h3 className="text-lg font-semibold text-white">
                  {index === 0 ? "Top Achievement" : `Achievement ${index + 1}`}
                </h3>
              </div>
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeAchievement(index)}
                  className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-all"
                  title="Remove achievement"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="space-y-4">
              {/* Title & Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Achievement Title *
                  </label>
                  <input
                    {...register(`achievements.${index}.title`)}
                    type="text"
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all"
                    placeholder="Dean&rsquo;s List, AWS Certification, etc."
                  />
                  {errors.achievements?.[index]?.title && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.achievements[index]?.title?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    <Star className="w-4 h-4 inline mr-1" />
                    Category
                  </label>
                  <select
                    {...register(`achievements.${index}.category`)}
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all"
                  >
                    <option value="">Select category...</option>
                    {categoryOptions.map((category) => (
                      <option
                        key={category}
                        value={category}
                        className="bg-gray-800"
                      >
                        {category}
                      </option>
                    ))}
                  </select>
                  {errors.achievements?.[index]?.category && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.achievements[index]?.category?.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Issuer & Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Issued By
                  </label>
                  <input
                    {...register(`achievements.${index}.issuer`)}
                    type="text"
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all"
                    placeholder="University, Company, Organization, etc."
                  />
                  {errors.achievements?.[index]?.issuer && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.achievements[index]?.issuer?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Date Achieved *
                  </label>
                  <input
                    {...register(`achievements.${index}.date`)}
                    type="text"
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all"
                    placeholder="Mar 2024, 2024, etc."
                  />
                  {errors.achievements?.[index]?.date && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.achievements[index]?.date?.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Description *
                </label>
                <textarea
                  {...register(`achievements.${index}.description`)}
                  rows={3}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all resize-none"
                  placeholder="• What was the achievement for?
• Why is it significant or noteworthy?
• What impact did it have?
• Any specific metrics or recognition?"
                />
                {errors.achievements?.[index]?.description && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.achievements[index]?.description?.message}
                  </p>
                )}
              </div>

              {/* Link */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Certificate / Credential Link
                  <span className="text-white/50 text-xs ml-1">(Optional)</span>
                </label>
                <input
                  {...register(`achievements.${index}.link`)}
                  type="url"
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all"
                  placeholder="https://credentials.example.com/certificate/123"
                />
                {errors.achievements?.[index]?.link && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.achievements[index]?.link?.message}
                  </p>
                )}
              </div>

              {/* Achievement Preview */}
              {(watchedValues.achievements?.[index]?.title ||
                watchedValues.achievements?.[index]?.description) && (
                <div className="mt-4 p-4 bg-white/5 rounded-lg border-l-4 border-yellow-400">
                  <div className="flex items-center space-x-2 mb-2">
                    <Eye className="w-4 h-4 text-green-400" />
                    <span className="text-sm font-medium text-white">
                      Preview
                    </span>
                  </div>
                  <div className="text-white/80">
                    {watchedValues.achievements[index]?.title && (
                      <h4 className="font-semibold text-white mb-1">
                        {watchedValues.achievements[index].title}
                        {watchedValues.achievements[index]?.category && (
                          <span className="ml-2 px-2 py-1 bg-yellow-500/20 text-yellow-300 text-xs rounded">
                            {watchedValues.achievements[index].category}
                          </span>
                        )}
                      </h4>
                    )}
                    {(watchedValues.achievements[index]?.issuer ||
                      watchedValues.achievements[index]?.date) && (
                      <p className="text-yellow-300 text-sm mb-2">
                        {watchedValues.achievements[index]?.issuer && (
                          <span>
                            {watchedValues.achievements[index].issuer}
                          </span>
                        )}
                        {watchedValues.achievements[index]?.issuer &&
                          watchedValues.achievements[index]?.date && (
                            <span> • </span>
                          )}
                        {watchedValues.achievements[index]?.date && (
                          <span>{watchedValues.achievements[index].date}</span>
                        )}
                      </p>
                    )}
                    {watchedValues.achievements[index]?.description && (
                      <p className="text-sm whitespace-pre-line">
                        {watchedValues.achievements[index].description}
                      </p>
                    )}
                    {watchedValues.achievements[index]?.link && (
                      <p className="text-sm mt-2">
                        <a
                          href={watchedValues.achievements[index].link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-400 hover:text-purple-300 underline"
                        >
                          View Certificate
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </Card>
        ))}

        {/* Add Achievement Button */}
        <Card variant="glass" className="p-6">
          <button
            type="button"
            onClick={addAchievement}
            className="w-full flex items-center justify-center space-x-2 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all border border-dashed border-white/20 hover:border-purple-400/50"
          >
            <Plus className="w-5 h-5" />
            <span>Add Another Achievement</span>
          </button>
        </Card>

        {/* Form-level errors */}
        {errors.achievements &&
          typeof errors.achievements.message === "string" && (
            <Card variant="glass" className="p-4 border-red-500/30">
              <p className="text-red-400 text-sm">
                {errors.achievements.message}
              </p>
            </Card>
          )}

        {/* Tips */}
        <Card variant="glass" className="p-4">
          <h4 className="text-white font-medium mb-2">💡 Achievement Tips:</h4>
          <ul className="text-white/70 text-sm space-y-1">
            <li>
              • Include quantifiable results when possible (e.g., &ldquo;Top 5%
              of class&rdquo;)
            </li>
            <li>• Add certifications that are relevant to your career goals</li>
            <li>• Include both professional and academic achievements</li>
            <li>• Don&rsquo;t forget community service or leadership roles</li>
          </ul>
        </Card>
      </form>
    </div>
  );
};

export default AchievementsSectionEditor;
