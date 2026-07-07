import { useState } from "react";
import { X, Send, CheckCircle2 } from "lucide-react";
import { useAppContext } from "../context/AppContext";

const INITIAL_FORM = { name: "", email: "", message: "" };

export default function FeedbackModal() {
  const { state, actions } = useAppContext();
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  if (!state.isFeedbackOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Enter a valid email";
    if (!form.message.trim()) newErrors.message = "Message is required";
    else if (form.message.trim().length < 10) newErrors.message = "At least 10 characters required";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    setSubmitted(true);
    setTimeout(() => {
      setForm(INITIAL_FORM);
      setErrors({});
      setSubmitted(false);
      actions.closeFeedback();
    }, 2200);
  };

  const inputClass = (field) =>
    `w-full bg-gray-900 border rounded-lg px-4 py-2.5 text-gray-100 text-sm outline-none transition-all duration-200 placeholder:text-gray-600 focus:ring-1 ${
      errors[field]
        ? "border-red-500 focus:ring-red-500"
        : "border-gray-600 focus:border-red-500 focus:ring-red-500/30"
    }`;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 animate-fade-in"
        onClick={actions.closeFeedback}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="w-full max-w-md bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl pointer-events-auto animate-slide-up">

          <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-700">
            <div>
              <h2 className="text-gray-100 text-lg font-semibold">We Are Listening </h2>
              <p className="text-gray-500 text-xs mt-0.5">Your feedback helps us improve PostBoard</p>
            </div>
            <button
              onClick={actions.closeFeedback}
              className="w-8 h-8 rounded-lg border border-gray-600 flex items-center justify-center text-gray-400 hover:border-red-500 hover:text-red-400 transition-all"
            >
              <X size={15} />
            </button>
          </div>

          {submitted ? (
            <div className="flex flex-col items-center justify-center py-14 gap-3 animate-fade-in">
              <CheckCircle2 size={48} className="text-green-400" />
              <p className="text-gray-100 text-base font-semibold">Thank you for your feedback!</p>
              <p className="text-gray-500 text-sm">We'll review it shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="px-6 py-5 flex flex-col gap-4">
              <div>
                <label className="text-xs font-medium text-gray-400 mb-1 block">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="John Doe" className={inputClass("name")} />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="text-xs font-medium text-gray-400 mb-1 block">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@example.com" className={inputClass("email")} />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="text-xs font-medium text-gray-400 mb-1 block">
                  Message <span className="text-red-400">*</span>
                </label>
                <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us what's on your mind…" rows={4} className={`${inputClass("message")} resize-none`} />
                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium text-sm transition-all duration-200 mt-1"
              >
                <Send size={15} />
                Submit Feedback
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}