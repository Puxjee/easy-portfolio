"use client";

import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X, Briefcase, Calendar, MapPin, Eye } from "lucide-react";
import Card from "@/components/ui/Card/Card";
import {
  experienceSchema,
  ExperienceFormData,
  ExperienceItemFormData,
} from "@/lib/portfolioValidation";

interface ExperienceSectionProps {
  data: { experience: ExperienceItemFormData[] };
  onChange: (data: { experience: ExperienceItemFormData[] }) => void;
}

const ExperienceSectionEditor: React.FC<ExperienceSectionProps> = ({
  data,
  onChange,
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<ExperienceFormData>({
    resolver: zodResolver(experienceSchema),
    defaultValues: data.experience.length > 0 ? data : { experience: [{}] },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience",
  });

  const onSubmit = (formData: ExperienceFormData) => {
    onChange(formData);
  };

  // Watch all fields to trigger live updates
  const watchedValues = watch();
  React.useEffect(() => {
    if (isValid) {
      onChange(watchedValues);
    }
  }, [watchedValues, isValid, onChange]);

  const addExperience = () => {
    append({} as ExperienceItemFormData);
  };

  const removeExperience = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-display font-bold text-white mb-2">
          Work Experience
        </h2>
        <p className="text-white/60">
          Showcase your professional experience, internships, and career
          journey.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {fields.map((field, index) => (
          <Card key={field.id} variant="glass" className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Briefcase className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-semibold text-white">
                  {index === 0
                    ? "Current/Latest Position"
                    : `Position ${index + 1}`}
                </h3>
              </div>
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeExperience(index)}
                  className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-all"
                  title="Remove experience"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Job Title *
                </label>
                <input
                  {...register(`experience.${index}.position`)}
                  type="text"
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all"
                  placeholder="Software Engineer, Product Manager, etc."
                />
                {errors.experience?.[index]?.position && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.experience[index]?.position?.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Company *
                </label>
                <input
                  {...register(`experience.${index}.company`)}
                  type="text"
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all"
                  placeholder="Company Name"
                />
                {errors.experience?.[index]?.company && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.experience[index]?.company?.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Start Date *
                </label>
                <input
                  {...register(`experience.${index}.startDate`)}
                  type="text"
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all"
                  placeholder="Jan 2023, 2023, etc."
                />
                {errors.experience?.[index]?.startDate && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.experience[index]?.startDate?.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  End Date
                </label>
                <input
                  {...register(`experience.${index}.endDate`)}
                  type="text"
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all"
                  placeholder="Present, Dec 2023, etc."
                />
                {errors.experience?.[index]?.endDate && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.experience[index]?.endDate?.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Location
                </label>
                <input
                  {...register(`experience.${index}.location`)}
                  type="text"
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all"
                  placeholder="City, Country or Remote"
                />
                {errors.experience?.[index]?.location && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.experience[index]?.location?.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Description
                <span className="text-white/50 text-xs ml-1">(Optional)</span>
              </label>
              <textarea
                {...register(`experience.${index}.description`)}
                rows={4}
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all resize-none"
                placeholder="• Key achievements and responsibilities
• Technologies used and projects delivered
• Impact and measurable results
• Team collaboration and leadership experience"
              />
              {errors.experience?.[index]?.description && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.experience[index]?.description?.message}
                </p>
              )}
            </div>

            {/* Experience Preview */}
            {(watchedValues.experience?.[index]?.position ||
              watchedValues.experience?.[index]?.company) && (
              <div className="mt-4 p-4 bg-white/5 rounded-lg border-l-4 border-purple-400">
                <div className="flex items-center space-x-2 mb-2">
                  <Eye className="w-4 h-4 text-green-400" />
                  <span className="text-sm font-medium text-white">
                    Preview
                  </span>
                </div>
                <div className="text-white/80">
                  {watchedValues.experience[index]?.position && (
                    <h4 className="font-semibold text-white">
                      {watchedValues.experience[index].position}
                    </h4>
                  )}
                  {watchedValues.experience[index]?.company && (
                    <p className="text-purple-300">
                      {watchedValues.experience[index].company}
                      {watchedValues.experience[index]?.location && (
                        <span className="text-white/60">
                          {" "}
                          • {watchedValues.experience[index].location}
                        </span>
                      )}
                    </p>
                  )}
                  {(watchedValues.experience[index]?.startDate ||
                    watchedValues.experience[index]?.endDate) && (
                    <p className="text-sm text-white/50 mt-1">
                      {watchedValues.experience[index]?.startDate ||
                        "Start Date"}{" "}
                      - {watchedValues.experience[index]?.endDate || "End Date"}
                    </p>
                  )}
                  {watchedValues.experience[index]?.description && (
                    <p className="text-sm mt-2 whitespace-pre-line">
                      {watchedValues.experience[index].description}
                    </p>
                  )}
                </div>
              </div>
            )}
          </Card>
        ))}

        {/* Add Experience Button */}
        <Card variant="glass" className="p-6">
          <button
            type="button"
            onClick={addExperience}
            className="w-full flex items-center justify-center space-x-2 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all border border-dashed border-white/20 hover:border-purple-400/50"
          >
            <Plus className="w-5 h-5" />
            <span>Add Another Experience</span>
          </button>
        </Card>

        {/* Form-level errors */}
        {errors.experience && typeof errors.experience.message === "string" && (
          <Card variant="glass" className="p-4 border-red-500/30">
            <p className="text-red-400 text-sm">{errors.experience.message}</p>
          </Card>
        )}
      </form>
    </div>
  );
};

export default ExperienceSectionEditor;
