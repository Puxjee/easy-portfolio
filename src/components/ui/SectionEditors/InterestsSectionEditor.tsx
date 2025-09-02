"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X, Heart, Eye, Sparkles } from "lucide-react";
import Card from "@/components/ui/Card/Card";

// Create interests schemas
import { z } from "zod";

const interestsSchema = z.object({
  interests: z
    .array(z.string().min(1, "Interest cannot be empty"))
    .min(1, "At least one interest is required")
    .max(15, "Maximum 15 interests allowed"),
});

type InterestsFormData = z.infer<typeof interestsSchema>;

interface InterestsSectionProps {
  data: InterestsFormData;
  onChange: (data: InterestsFormData) => void;
}

const interestSuggestions = [
  "Photography",
  "Travel",
  "Reading",
  "Cooking",
  "Music",
  "Gaming",
  "Sports",
  "Fitness",
  "Yoga",
  "Meditation",
  "Art",
  "Design",
  "Technology",
  "Programming",
  "AI/ML",
  "Blockchain",
  "Writing",
  "Blogging",
  "Podcasting",
  "Languages",
  "Culture",
  "History",
  "Science",
  "Nature",
  "Hiking",
  "Cycling",
  "Swimming",
  "Dancing",
  "Theater",
  "Movies",
  "Volunteering",
  "Mentoring",
  "Teaching",
];

const InterestsSectionEditor: React.FC<InterestsSectionProps> = ({
  data,
  onChange,
}) => {
  const [interests, setInterests] = useState<string[]>(
    data.interests?.length > 0 ? data.interests : [""]
  );

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
    watch,
  } = useForm<InterestsFormData>({
    resolver: zodResolver(interestsSchema),
    defaultValues: { interests },
    mode: "onChange",
  });

  const onSubmit = (formData: InterestsFormData) => {
    onChange(formData);
  };

  // Update form values when interests change
  React.useEffect(() => {
    setValue("interests", interests);
    trigger("interests");
  }, [interests, setValue, trigger]);

  // Watch for validation and trigger live updates
  const watchedInterests = watch("interests");
  React.useEffect(() => {
    // Always propagate changes to parent for live preview, even if form has validation errors
    if (watchedInterests) {
      onChange({ interests: watchedInterests });
    }
  }, [watchedInterests, onChange]);

  const addInterest = () => {
    if (interests.length < 15) {
      setInterests([...interests, ""]);
    }
  };

  const removeInterest = (index: number) => {
    if (interests.length > 1) {
      const newInterests = interests.filter((_, i) => i !== index);
      setInterests(newInterests);
    }
  };

  const updateInterest = React.useCallback(
    (index: number, value: string) => {
      const newInterests = [...interests];
      newInterests[index] = value;
      setInterests(newInterests);
    },
    [interests]
  );

  const addSuggestedInterest = (suggestion: string) => {
    if (!interests.includes(suggestion) && interests.length < 15) {
      setInterests([...interests.filter((i) => i.trim()), suggestion]);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-display font-bold text-white mb-2">
          Interests & Hobbies
        </h2>
        <p className="text-white/60">
          Share your personal interests, hobbies, and passions to show your
          personality and what drives you outside of work.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card variant="glass" className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Heart className="w-5 h-5 text-pink-400" />
            <h3 className="text-lg font-semibold text-white">Your Interests</h3>
            <span className="text-sm text-white/50">
              ({interests.filter((i) => i.trim()).length}/15 interests)
            </span>
          </div>

          <div className="space-y-4">
            {interests.map((interest, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="flex-1">
                  <div className="relative">
                    <Sparkles className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-pink-400" />
                    <input
                      value={interest}
                      onChange={(e) => updateInterest(index, e.target.value)}
                      type="text"
                      className="w-full bg-white/5 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all"
                      placeholder={
                        index === 0
                          ? "e.g., Photography, Travel, Music..."
                          : "Enter an interest or hobby"
                      }
                    />
                  </div>
                  {errors.interests?.[index] && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.interests[index]?.message}
                    </p>
                  )}
                </div>

                {interests.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeInterest(index)}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-all flex-shrink-0"
                    title="Remove interest"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}

            {interests.length < 15 && (
              <button
                type="button"
                onClick={addInterest}
                className="w-full flex items-center justify-center space-x-2 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all border border-dashed border-white/20 hover:border-purple-400/50"
              >
                <Plus className="w-5 h-5" />
                <span>Add Another Interest</span>
              </button>
            )}
          </div>

          {/* Form-level errors */}
          {errors.interests && typeof errors.interests.message === "string" && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-400 text-sm">{errors.interests.message}</p>
            </div>
          )}
        </Card>

        {/* Interest Suggestions */}
        {interests.length < 15 && (
          <Card variant="glass" className="p-6">
            <h4 className="text-white font-medium mb-3 flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Popular Interest Ideas</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {interestSuggestions
                .filter((suggestion) => !interests.includes(suggestion))
                .slice(0, 20)
                .map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => addSuggestedInterest(suggestion)}
                    className="px-3 py-1.5 bg-white/5 hover:bg-purple-500/20 border border-white/20 hover:border-purple-400/50 rounded-full text-sm text-white/70 hover:text-white transition-all"
                  >
                    {suggestion}
                  </button>
                ))}
            </div>
          </Card>
        )}

        {/* Interests Preview */}
        {interests && interests.some((interest) => interest.trim()) && (
          <Card variant="glass" className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Eye className="w-5 h-5 text-green-400" />
              <h3 className="text-lg font-semibold text-white">
                Interests Preview
              </h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {interests
                .filter((interest) => interest.trim())
                .map((interest, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-400/30 rounded-full text-sm text-white backdrop-blur-sm"
                  >
                    {interest}
                  </span>
                ))}
            </div>

            {interests.filter((interest) => interest.trim()).length === 0 && (
              <p className="text-white/50 text-sm">
                Start adding interests to see the preview
              </p>
            )}
          </Card>
        )}

        {/* Tips */}
        <Card variant="glass" className="p-4">
          <h4 className="text-white font-medium mb-2">💡 Interest Tips:</h4>
          <ul className="text-white/70 text-sm space-y-1">
            <li>• Include both professional and personal interests</li>
            <li>
              • Show variety to demonstrate you&rsquo;re a well-rounded person
            </li>
            <li>
              • Be specific when possible (e.g., &ldquo;Portrait
              Photography&rdquo; vs &ldquo;Photography&rdquo;)
            </li>
            <li>
              • Consider interests that might spark conversation with colleagues
            </li>
          </ul>
        </Card>
      </form>
    </div>
  );
};

export default InterestsSectionEditor;
