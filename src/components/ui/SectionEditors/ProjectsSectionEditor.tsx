"use client";

import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X, FolderOpen, Link, Eye, Code, Calendar } from "lucide-react";
import Card from "@/components/ui/Card/Card";

// Create a projects schema for the section
import { z } from "zod";

// Individual project schema
const projectItemSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(1, "Project name is required")
    .min(2, "Project name must be at least 2 characters")
    .max(100, "Project name must be less than 100 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be less than 500 characters"),
  image: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
  link: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  technologies: z
    .array(z.string().min(1, "Technology cannot be empty"))
    .min(1, "At least one technology is required")
    .max(10, "Maximum 10 technologies allowed"),
  startDate: z
    .string()
    .max(20, "Start date must be less than 20 characters")
    .optional()
    .or(z.literal("")),
  endDate: z
    .string()
    .max(20, "End date must be less than 20 characters")
    .optional()
    .or(z.literal("")),
});

const projectsSchema = z.object({
  projects: z
    .array(projectItemSchema)
    .min(1, "At least one project is required")
    .max(20, "Maximum 20 projects allowed"),
});

type ProjectItemFormData = z.infer<typeof projectItemSchema>;
type ProjectsFormData = z.infer<typeof projectsSchema>;

interface ProjectsSectionProps {
  data: { projects: ProjectItemFormData[] };
  onChange: (data: { projects: ProjectItemFormData[] }) => void;
}

const ProjectsSectionEditor: React.FC<ProjectsSectionProps> = ({
  data,
  onChange,
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
    getValues,
  } = useForm<ProjectsFormData>({
    resolver: zodResolver(projectsSchema),
    defaultValues:
      data.projects?.length > 0 ? data : { projects: [{ technologies: [""] }] },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
  });

  const onSubmit = (formData: ProjectsFormData) => {
    onChange(formData);
  };

  // Watch all fields to trigger live updates
  const watchedValues = watch();
  React.useEffect(() => {
    if (isValid) {
      onChange(watchedValues);
    }
  }, [watchedValues, isValid, onChange]);

  const addProject = () => {
    append({ technologies: [""] } as ProjectItemFormData);
  };

  const removeProject = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  const addTechnology = (projectIndex: number) => {
    const currentTech =
      getValues(`projects.${projectIndex}.technologies`) || [];
    if (currentTech.length < 10) {
      setValue(`projects.${projectIndex}.technologies`, [...currentTech, ""]);
    }
  };

  const removeTechnology = (projectIndex: number, techIndex: number) => {
    const currentTech =
      getValues(`projects.${projectIndex}.technologies`) || [];
    if (currentTech.length > 1) {
      const newTech = currentTech.filter((_, i) => i !== techIndex);
      setValue(`projects.${projectIndex}.technologies`, newTech);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-display font-bold text-white mb-2">
          Projects & Portfolio
        </h2>
        <p className="text-white/60">
          Showcase your best work, personal projects, and professional
          contributions.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {fields.map((field, index) => (
          <Card key={field.id} variant="glass" className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <FolderOpen className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-semibold text-white">
                  {index === 0 ? "Featured Project" : `Project ${index + 1}`}
                </h3>
              </div>
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeProject(index)}
                  className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-all"
                  title="Remove project"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="space-y-4">
              {/* Project Name & Description */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Project Name *
                  </label>
                  <input
                    {...register(`projects.${index}.name`)}
                    type="text"
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all"
                    placeholder="E-Commerce Platform, Mobile App, etc."
                  />
                  {errors.projects?.[index]?.name && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.projects[index]?.name?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    <Link className="w-4 h-4 inline mr-1" />
                    Project Link
                  </label>
                  <input
                    {...register(`projects.${index}.link`)}
                    type="url"
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all"
                    placeholder="https://github.com/username/project"
                  />
                  {errors.projects?.[index]?.link && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.projects[index]?.link?.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Description *
                </label>
                <textarea
                  {...register(`projects.${index}.description`)}
                  rows={3}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all resize-none"
                  placeholder="Describe what this project does, the problems it solves, and your role in its development..."
                />
                {errors.projects?.[index]?.description && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.projects[index]?.description?.message}
                  </p>
                )}
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Start Date
                  </label>
                  <input
                    {...register(`projects.${index}.startDate`)}
                    type="text"
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all"
                    placeholder="Jan 2023"
                  />
                  {errors.projects?.[index]?.startDate && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.projects[index]?.startDate?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    End Date
                  </label>
                  <input
                    {...register(`projects.${index}.endDate`)}
                    type="text"
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all"
                    placeholder="Present or Mar 2023"
                  />
                  {errors.projects?.[index]?.endDate && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.projects[index]?.endDate?.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Technologies */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  <Code className="w-4 h-4 inline mr-1" />
                  Technologies Used *
                </label>
                <div className="space-y-2">
                  {(watchedValues.projects?.[index]?.technologies || [""]).map(
                    (_, techIndex) => (
                      <div
                        key={techIndex}
                        className="flex items-center space-x-2"
                      >
                        <input
                          {...register(
                            `projects.${index}.technologies.${techIndex}`
                          )}
                          type="text"
                          className="flex-1 bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all"
                          placeholder="React, Node.js, Python, etc."
                        />
                        {(watchedValues.projects?.[index]?.technologies
                          ?.length || 0) > 1 && (
                          <button
                            type="button"
                            onClick={() => removeTechnology(index, techIndex)}
                            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-all"
                            title="Remove technology"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    )
                  )}

                  {(watchedValues.projects?.[index]?.technologies?.length ||
                    0) < 10 && (
                    <button
                      type="button"
                      onClick={() => addTechnology(index)}
                      className="flex items-center space-x-1 text-sm text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Technology</span>
                    </button>
                  )}
                </div>
                {errors.projects?.[index]?.technologies && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.projects[index]?.technologies?.message}
                  </p>
                )}
              </div>

              {/* Project Preview */}
              {(watchedValues.projects?.[index]?.name ||
                watchedValues.projects?.[index]?.description) && (
                <div className="mt-4 p-4 bg-white/5 rounded-lg border-l-4 border-purple-400">
                  <div className="flex items-center space-x-2 mb-2">
                    <Eye className="w-4 h-4 text-green-400" />
                    <span className="text-sm font-medium text-white">
                      Preview
                    </span>
                  </div>
                  <div className="text-white/80">
                    {watchedValues.projects[index]?.name && (
                      <h4 className="font-semibold text-white mb-1">
                        {watchedValues.projects[index].name}
                      </h4>
                    )}
                    {watchedValues.projects[index]?.description && (
                      <p className="text-sm mb-2">
                        {watchedValues.projects[index].description}
                      </p>
                    )}
                    {watchedValues.projects[index]?.technologies && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {watchedValues.projects[index].technologies
                          ?.filter((tech) => tech.trim())
                          .map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded"
                            >
                              {tech}
                            </span>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </Card>
        ))}

        {/* Add Project Button */}
        <Card variant="glass" className="p-6">
          <button
            type="button"
            onClick={addProject}
            className="w-full flex items-center justify-center space-x-2 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all border border-dashed border-white/20 hover:border-purple-400/50"
          >
            <Plus className="w-5 h-5" />
            <span>Add Another Project</span>
          </button>
        </Card>

        {/* Form-level errors */}
        {errors.projects && typeof errors.projects.message === "string" && (
          <Card variant="glass" className="p-4 border-red-500/30">
            <p className="text-red-400 text-sm">{errors.projects.message}</p>
          </Card>
        )}
      </form>
    </div>
  );
};

export default ProjectsSectionEditor;
