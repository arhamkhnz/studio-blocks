"use client";

import { useId, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { Alert, AlertDescription } from "@studio-blocks/blocks-ui/components/alert";
import { Button } from "@studio-blocks/blocks-ui/components/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@studio-blocks/blocks-ui/components/card";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from "@studio-blocks/blocks-ui/components/field";
import { Input } from "@studio-blocks/blocks-ui/components/input";
import { Textarea } from "@studio-blocks/blocks-ui/components/textarea";
import { ToggleGroup, ToggleGroupItem } from "@studio-blocks/blocks-ui/components/toggle-group";

const formSchema = z.object({
  name: z.string().trim().min(2, "Enter at least 2 characters.").max(80, "Use 80 characters or fewer."),
  link: z
    .string()
    .trim()
    .pipe(z.union([z.literal(""), z.url()], { error: "Enter a valid URL." })),
  description: z.string().trim().max(500, "Use 500 characters or fewer."),
  visibility: z.enum(["private", "workspace"]),
});

export function Form01() {
  const id = useId();
  const [submitted, setSubmitted] = useState<z.infer<typeof formSchema> | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", link: "", description: "", visibility: "private" },
  });

  return (
    <form
      className="@container/project mx-auto w-full max-w-xl"
      noValidate
      onSubmit={form.handleSubmit(
        (values) => setSubmitted(values),
        () => setSubmitted(null),
      )}
    >
      <Card className="gap-5 py-6 [--card-spacing:--spacing(6)]">
        <CardHeader>
          <CardTitle className="text-xl font-normal tracking-tight">Create project</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldSet>
            <FieldGroup className="grid gap-4 **:data-[slot=field-label]:text-[13px] **:data-[slot=field-label]:font-normal @md/project:grid-cols-2">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={`${id}-name`}>Name</FieldLabel>
                    <Input
                      {...field}
                      id={`${id}-name`}
                      placeholder="Website redesign"
                      required
                      minLength={2}
                      maxLength={80}
                      autoComplete="off"
                      aria-invalid={fieldState.invalid}
                      aria-describedby={fieldState.invalid ? `${id}-name-error` : undefined}
                      className="h-9"
                    />
                    {fieldState.invalid && <FieldError id={`${id}-name-error`} errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="link"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                    <FieldLabel className="gap-1" htmlFor={`${id}-link`}>
                      Link
                      <span className="text-xs text-muted-foreground">(Optional)</span>
                    </FieldLabel>
                    <Input
                      {...field}
                      id={`${id}-link`}
                      type="url"
                      placeholder="https://example.com"
                      autoComplete="url"
                      aria-invalid={fieldState.invalid}
                      aria-describedby={fieldState.invalid ? `${id}-link-error` : undefined}
                      className="h-9"
                    />
                    {fieldState.invalid && <FieldError id={`${id}-link-error`} errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="col-span-full gap-1.5" data-invalid={fieldState.invalid}>
                    <FieldLabel className="gap-1" htmlFor={`${id}-description`}>
                      Description
                      <span className="text-xs text-muted-foreground">(Optional)</span>
                    </FieldLabel>
                    <Textarea
                      {...field}
                      id={`${id}-description`}
                      placeholder="What are you working on?"
                      maxLength={500}
                      aria-invalid={fieldState.invalid}
                      aria-describedby={fieldState.invalid ? `${id}-description-error` : undefined}
                      className="min-h-20 resize-y"
                    />
                    {fieldState.invalid && <FieldError id={`${id}-description-error`} errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="visibility"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field orientation="responsive" className="col-span-full" data-invalid={fieldState.invalid}>
                    <FieldContent className="gap-1">
                      <FieldTitle id={`${id}-visibility`}>Visibility</FieldTitle>
                      <p id={`${id}-visibility-help`} className="text-xs text-muted-foreground">
                        {field.value === "private" ? "Only you have access." : "Open to your workspace."}
                      </p>
                      {fieldState.invalid && <FieldError id={`${id}-visibility-error`} errors={[fieldState.error]} />}
                    </FieldContent>
                    <ToggleGroup
                      aria-labelledby={`${id}-visibility`}
                      aria-describedby={
                        fieldState.invalid ? `${id}-visibility-help ${id}-visibility-error` : `${id}-visibility-help`
                      }
                      aria-invalid={fieldState.invalid}
                      multiple={false}
                      value={[field.value]}
                      onBlur={field.onBlur}
                      spacing={1}
                      className="w-fit rounded-lg bg-muted p-1"
                      onValueChange={(values) => {
                        if (values[0]) field.onChange(values[0]);
                      }}
                    >
                      <ToggleGroupItem
                        ref={field.ref}
                        value="private"
                        className="flex-1 rounded-md aria-pressed:bg-card data-[state=on]:bg-card @md/field-group:flex-none"
                      >
                        Private
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        value="workspace"
                        className="flex-1 rounded-md aria-pressed:bg-card data-[state=on]:bg-card @md/field-group:flex-none"
                      >
                        Workspace
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </Field>
                )}
              />
            </FieldGroup>
          </FieldSet>
        </CardContent>
        <CardFooter className="flex-col items-stretch gap-3 border-0 bg-transparent pt-0 pb-6">
          {submitted && (
            <Alert role="status">
              <Check aria-hidden="true" />
              <AlertDescription>Preview submitted for {submitted.name}. No project was saved.</AlertDescription>
            </Alert>
          )}
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                form.reset();
                setSubmitted(null);
              }}
            >
              Cancel
            </Button>
            <Button type="submit">Create project</Button>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
}
