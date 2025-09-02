"use client";

import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Plus,
  X,
  GraduationCap,
  Calendar,
  MapPin,
  Eye,
  Award,
} from "lucide-react";
import Card from "@/components/ui/Card/Card";

// Create education schemas
import { z } from "zod";

const educationItemSchema = z.object({
  id: z.string().optional(),
  institution: z
    .string()
    .min(1, "Institution name is required")
    .min(2, "Institution name must be at least 2 characters")
    .max(100, "Institution name must be less than 100 characters"),
  degree: z
    .string()
    .min(1, "Degree is required")
    .min(2, "Degree must be at least 2 characters")
    .max(100, "Degree must be less than 100 characters"),
  fieldOfStudy: z
    .string()
    .min(1, "Field of study is required")
    .min(2, "Field of study must be at least 2 characters")
    .max(100, "Field of study must be less than 100 characters"),
  startDate: z
    .string()
    .min(1, "Start date is required")
    .max(20, "Start date must be less than 20 characters"),
  endDate: z
    .string()
    .max(20, "End date must be less than 20 characters")
    .optional()
    .or(z.literal("")),
  gpa: z
    .string()
    .max(10, "GPA must be less than 10 characters")
    .optional()
    .or(z.literal("")),
  location: z
    .string()
    .max(50, "Location must be less than 50 characters")
    .optional()
    .or(z.literal("")),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .optional()
    .or(z.literal("")),
});

const educationSchema = z.object({
  education: z
    .array(educationItemSchema)
    .min(1, "At least one education entry is required")
    .max(10, "Maximum 10 education entries allowed"),
});

type EducationItemFormData = z.infer<typeof educationItemSchema>;
type EducationFormData = z.infer<typeof educationSchema>;

interface EducationSectionProps {
  data: { education: EducationItemFormData[] };
  onChange: (data: { education: EducationItemFormData[] }) => void;
}

const degreeOptions = [
  "High School Diploma",
  "Associate's Degree",
  "Bachelor's Degree",
  "Master's Degree",
  "PhD",
  "Certificate",
  "Bootcamp",
  "Other",
];

const EducationSectionEditor: React.FC<EducationSectionProps> = ({
  data,
  onChange,
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<EducationFormData>({
    resolver: zodResolver(educationSchema),
    defaultValues: data.education?.length > 0 ? data : { education: [{}] },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  const onSubmit = (formData: EducationFormData) => {
    onChange(formData);
  };

  // Watch all fields to trigger live updates
  const watchedValues = watch();
  React.useEffect(() => {
    // Always propagate changes to parent for live preview, even if form has validation errors
    onChange(watchedValues);
  }, [watchedValues, onChange]);

  const addEducation = () => {
    append({} as EducationItemFormData);
  };

  const removeEducation = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-display font-bold text-white mb-2">
          Education & Qualifications
        </h2>
        <p className="text-white/60">
          Add your educational background, degrees, certifications, and academic
          achievements.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {fields.map((field, index) => (
          <Card key={field.id} variant="glass" className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <GraduationCap className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-semibold text-white">
                  {index === 0 ? "Latest Education" : `Education ${index + 1}`}
                </h3>
              </div>
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeEducation(index)}
                  className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-all"
                  title="Remove education"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="space-y-4">
              {/* Institution & Degree */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Institution *
                  </label>
                  <input
                    {...register(`education.${index}.institution`)}
                    type="text"
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all"
                    placeholder="University of Example, ABC High School"
                  />
                  {errors.education?.[index]?.institution && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.education[index]?.institution?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Degree *
                  </label>
                  <select
                    {...register(`education.${index}.degree`)}
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all"
                  >
                    <option value="">Select degree...</option>
                    {degreeOptions.map((degree) => (
                      <option
                        key={degree}
                        value={degree}
                        className="bg-gray-800"
                      >
                        {degree}
                      </option>
                    ))}
                  </select>
                  {errors.education?.[index]?.degree && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.education[index]?.degree?.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Field of Study & Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Field of Study *
                  </label>
                  <input
                    {...register(`education.${index}.fieldOfStudy`)}
                    type="text"
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all"
                    placeholder="Computer Science, Business Administration, etc."
                  />
                  {errors.education?.[index]?.fieldOfStudy && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.education[index]?.fieldOfStudy?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Location
                  </label>
                  <input
                    {...register(`education.${index}.location`)}
                    type="text"
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all"
                    placeholder="City, Country"
                  />
                  {errors.education?.[index]?.location && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.education[index]?.location?.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Dates & GPA */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Start Date *
                  </label>
                  <input
                    {...register(`education.${index}.startDate`)}
                    type="text"
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all"
                    placeholder="Sep 2020, 2020, etc."
                  />
                  {errors.education?.[index]?.startDate && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.education[index]?.startDate?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    End Date
                  </label>
                  <input
                    {...register(`education.${index}.endDate`)}
                    type="text"
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all"
                    placeholder="Present, May 2024, etc."
                  />
                  {errors.education?.[index]?.endDate && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.education[index]?.endDate?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    <Award className="w-4 h-4 inline mr-1" />
                    GPA / Grade
                  </label>
                  <input
                    {...register(`education.${index}.gpa`)}
                    type="text"
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all"
                    placeholder="3.8/4.0, First Class, etc."
                  />
                  {errors.education?.[index]?.gpa && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.education[index]?.gpa?.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Description
                  <span className="text-white/50 text-xs ml-1">(Optional)</span>
                </label>
                <textarea
                  {...register(`education.${index}.description`)}
                  rows={3}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all resize-none"
                  placeholder="• Relevant coursework, projects, or achievements
• Honors, awards, or distinctions received
• Thesis topic or research focus
• Key learning outcomes or skills developed"
                />
                {errors.education?.[index]?.description && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.education[index]?.description?.message}
                  </p>
                )}
              </div>

              {/* Education Preview */}
              {(watchedValues.education?.[index]?.degree ||
                watchedValues.education?.[index]?.institution) && (
                <div className="mt-4 p-4 bg-white/5 rounded-lg border-l-4 border-purple-400">
                  <div className="flex items-center space-x-2 mb-2">
                    <Eye className="w-4 h-4 text-green-400" />
                    <span className="text-sm font-medium text-white">
                      Preview
                    </span>
                  </div>
                  <div className="text-white/80">
                    {watchedValues.education[index]?.degree &&
                      watchedValues.education[index]?.fieldOfStudy && (
                        <h4 className="font-semibold text-white">
                          {watchedValues.education[index].degree} in{" "}
                          {watchedValues.education[index].fieldOfStudy}
                        </h4>
                      )}
                    {watchedValues.education[index]?.institution && (
                      <p className="text-purple-300">
                        {watchedValues.education[index].institution}
                        {watchedValues.education[index]?.location && (
                          <span className="text-white/60">
                            {" "}
                            • {watchedValues.education[index].location}
                          </span>
                        )}
                      </p>
                    )}
                    {(watchedValues.education[index]?.startDate ||
                      watchedValues.education[index]?.endDate) && (
                      <p className="text-sm text-white/50 mt-1">
                        {watchedValues.education[index]?.startDate ||
                          "Start Date"}{" "}
                        -{" "}
                        {watchedValues.education[index]?.endDate || "End Date"}
                        {watchedValues.education[index]?.gpa && (
                          <span className="ml-2">
                            • GPA: {watchedValues.education[index].gpa}
                          </span>
                        )}
                      </p>
                    )}
                    {watchedValues.education[index]?.description && (
                      <p className="text-sm mt-2 whitespace-pre-line">
                        {watchedValues.education[index].description}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </Card>
        ))}

        {/* Add Education Button */}
        <Card variant="glass" className="p-6">
          <button
            type="button"
            onClick={addEducation}
            className="w-full flex items-center justify-center space-x-2 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all border border-dashed border-white/20 hover:border-purple-400/50"
          >
            <Plus className="w-5 h-5" />
            <span>Add Another Education</span>
          </button>
        </Card>

        {/* Form-level errors */}
        {errors.education && typeof errors.education.message === "string" && (
          <Card variant="glass" className="p-4 border-red-500/30">
            <p className="text-red-400 text-sm">{errors.education.message}</p>
          </Card>
        )}
      </form>
    </div>
  );
};

export default EducationSectionEditor;
