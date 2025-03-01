"use client";
import React, { useActionState, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";

const StartupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");
  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch,
      };

      await formSchema.parseAsync(formValues);

      // const result = await createPitch(prevState, formData, pitch);

      // return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErorrs = error.flatten().fieldErrors;

        setErrors(fieldErorrs as unknown as Record<string, string>);

        toast({
          title: "Error",
          description: "Please check your inputs and try again",
          variant: "destructive",
        });

        return { ...prevState, error: "Validation failed", status: "ERROR" };
      }

      toast({
        title: "Error",
        description: "An unexpected error has occurred",
        variant: "destructive",
      });

      return {
        ...prevState,
        error: "An unexpected error has occurred",
        status: "ERROR",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form action={() => {}} className="startup-form">
      <div>
        <label htmlFor="title" className="startup-form_label">
          Title
        </label>
        <Input
          required
          id="title"
          name="title"
          placeholder="Startup Title"
          className="startup-form_input"
        />
        {errors.title && <p className="startup-from_error">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="description" className="startup-form_label">
          description
        </label>
        <Textarea
          required
          id="description"
          name="description"
          placeholder="Startup description"
          className="startup-form_textarea"
        />
        {errors.description && (
          <p className="startup-from_error">{errors.description}</p>
        )}
      </div>

      <div>
        <label htmlFor="w" className="startup-form_label">
          Category
        </label>
        <Input
          required
          id="category"
          name="category"
          placeholder="Startup category"
          className="startup-form_input"
        />
        {errors.category && (
          <p className="startup-from_error">{errors.category}</p>
        )}
      </div>

      <div>
        <label htmlFor="link" className="startup-form_label">
          Image Link
        </label>
        <Input
          required
          id="link"
          name="link"
          placeholder="Startup link"
          className="startup-form_input"
        />
        {errors.title && <p className="startup-from_error">{errors.title}</p>}
      </div>

      <div data-color-mode="light">
        <label htmlFor="pitch" className="startup-form_label">
          Pitch
        </label>

        <MDEditor
          value={pitch}
          onChange={(value) => setPitch(value as string)}
          id="pitch"
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{
            placeholder: "Describe your idea here",
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
        ></MDEditor>
        {errors.pitch && <p className="startup-from_error">{errors.pitch}</p>}
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="text-white startup-form_btn"
      >
        {isPending ? "Submitting..." : "Submit your pitch"}
        <Send className="ml-2 size-6" />
      </Button>
    </form>
  );
};

export default StartupForm;
