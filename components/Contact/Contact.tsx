"use client";

import { useState } from "react";
import cn from "classnames";
import s from "./Contact.module.scss";
import { Button } from "@/components/ui/button";
import Tag from "../Tag/Tag";
import { SendHorizontal, Loader2, Send } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setSubmitStatus({
        type: "success",
        message: "Thank you! Your message has been sent successfully.",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn(s["section-contact"])}>
      <Tag label="Contact" lucideIcon={Send} />
      <div className={cn(s["section-contact__content"])}>
        <h2 className={cn(s["section-contact__title"])}>
          Let&apos;s work together
        </h2>
        <p className={cn(s["section-contact__description"])}>
          Got a question or want to work together? Reach out to me!
        </p>

        <form onSubmit={handleSubmit} className={cn(s["contact-form"])}>
          <div className={cn(s["contact-form__field"])}>
            <label
              htmlFor="name"
              className={cn(
                s["contact-form__label"],
                "text-black dark:text-white"
              )}
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={cn(
                s["contact-form__input"],
                "bg-white dark:bg-input border-border text-black dark:text-white"
              )}
              placeholder="Your name"
            />
          </div>

          <div className={cn(s["contact-form__field"])}>
            <label
              htmlFor="email"
              className={cn(
                s["contact-form__label"],
                "text-black dark:text-white"
              )}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={cn(
                s["contact-form__input"],
                "bg-white dark:bg-input border-border text-black dark:text-white"
              )}
              placeholder="your.email@example.com"
            />
          </div>

          <div className={cn(s["contact-form__field"])}>
            <label
              htmlFor="message"
              className={cn(
                s["contact-form__label"],
                "text-black dark:text-white"
              )}
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className={cn(
                s["contact-form__textarea"],
                "bg-white dark:bg-input border-border text-black dark:text-white"
              )}
              placeholder="Tell me about your project..."
            />
          </div>

          {submitStatus.type && (
            <div
              className={cn(
                s["contact-form__status"],
                submitStatus.type === "success"
                  ? s["contact-form__status--success"]
                  : s["contact-form__status--error"]
              )}
            >
              {submitStatus.message}
            </div>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className={cn(s["contact-form__submit"], "cursor-auto px-0")}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <Button variant="outline" className="cursor-pointer">
                Send Message <SendHorizontal className="ml-2 h-4 w-4" />
              </Button>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
