"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X, Star, Eye, Tag } from "lucide-react";
import Card from "@/components/ui/Card/Card";
import { skillsSchema, SkillsFormData } from "@/lib/portfolioValidation";

interface SkillsSectionProps {
  data: SkillsFormData;
  onChange: (data: SkillsFormData) => void;
}

const SkillsSectionEditor: React.FC<SkillsSectionProps> = ({
  data,
  onChange,
}) => {
  const [skills, setSkills] = useState<string[]>(
    data.skills?.length > 0 ? data.skills : [""]
  );

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
    watch,
  } = useForm<SkillsFormData>({
    resolver: zodResolver(skillsSchema),
    defaultValues: { skills },
    mode: "onChange",
  });

  const onSubmit = (formData: SkillsFormData) => {
    onChange(formData);
  };

  // Update form values when skills change
  React.useEffect(() => {
    setValue("skills", skills);
    trigger("skills");
  }, [skills, setValue, trigger]);

  // Watch for validation and trigger live updates
  const watchedSkills = watch("skills");
  React.useEffect(() => {
    if (watchedSkills && !errors.skills) {
      onChange({ skills: watchedSkills });
    }
  }, [watchedSkills, errors.skills, onChange]);

  const addSkill = () => {
    if (skills.length < 20) {
      setSkills([...skills, ""]);
    }
  };

  const removeSkill = (index: number) => {
    if (skills.length > 1) {
      const newSkills = skills.filter((_, i) => i !== index);
      setSkills(newSkills);
    }
  };

  const updateSkill = React.useCallback(
    (index: number, value: string) => {
      const newSkills = [...skills];
      newSkills[index] = value;
      setSkills(newSkills);
    },
    [skills]
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-display font-bold text-white mb-2">
          Skills & Expertise
        </h2>
        <p className="text-white/60">
          List your technical and professional skills to showcase your
          capabilities.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card variant="glass" className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Star className="w-5 h-5 text-yellow-400" />
            <h3 className="text-lg font-semibold text-white">Your Skills</h3>
            <span className="text-sm text-white/50">
              ({skills.length}/20 skills)
            </span>
          </div>

          <div className="space-y-4">
            {skills.map((skill, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="flex-1">
                  <div className="relative">
                    <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-purple-400" />
                    <input
                      value={skill}
                      onChange={(e) => updateSkill(index, e.target.value)}
                      type="text"
                      className="w-full bg-white/5 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all"
                      placeholder={
                        index === 0
                          ? "e.g., React, TypeScript, Python..."
                          : "Enter a skill"
                      }
                    />
                  </div>
                  {errors.skills?.[index] && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.skills[index]?.message}
                    </p>
                  )}
                </div>

                {skills.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSkill(index)}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-all flex-shrink-0"
                    title="Remove skill"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}

            {skills.length < 20 && (
              <button
                type="button"
                onClick={addSkill}
                className="w-full flex items-center justify-center space-x-2 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all border border-dashed border-white/20 hover:border-purple-400/50"
              >
                <Plus className="w-5 h-5" />
                <span>Add Another Skill</span>
              </button>
            )}
          </div>

          {/* Form-level errors */}
          {errors.skills && typeof errors.skills.message === "string" && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-400 text-sm">{errors.skills.message}</p>
            </div>
          )}
        </Card>

        {/* Skills Preview */}
        {skills && skills.some((skill) => skill.trim()) && (
          <Card variant="glass" className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Eye className="w-5 h-5 text-green-400" />
              <h3 className="text-lg font-semibold text-white">
                Skills Preview
              </h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {skills
                .filter((skill) => skill.trim())
                .map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-full text-sm text-white backdrop-blur-sm"
                  >
                    {skill}
                  </span>
                ))}
            </div>

            {skills.filter((skill) => skill.trim()).length === 0 && (
              <p className="text-white/50 text-sm">
                Start adding skills to see the preview
              </p>
            )}
          </Card>
        )}

        {/* Tips */}
        <Card variant="glass" className="p-4">
          <h4 className="text-white font-medium mb-2">
            💡 Tips for Great Skills:
          </h4>
          <ul className="text-white/70 text-sm space-y-1">
            <li>
              • Be specific (e.g., &ldquo;React.js&rdquo; instead of just
              &ldquo;JavaScript&rdquo;)
            </li>
            <li>• Include both technical and soft skills</li>
            <li>• Order by proficiency or relevance to your target role</li>
            <li>
              • Keep it honest - only list skills you&rsquo;re comfortable
              discussing
            </li>
          </ul>
        </Card>
      </form>
    </div>
  );
};

export default SkillsSectionEditor;
