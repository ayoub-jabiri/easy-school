import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQSection() {
    const faqs = [
        {
            question: "What grade levels and age groups do you accept?",
            answer: "We welcome scholars from kindergarten through 12th grade, with dedicated academic tracks tailored to each developmental stage.",
        },
        {
            question: "How does the admissions and assessment process work?",
            answer: "Our admissions process includes an application review, an academic assessment, and a family interview to ensure the right fit for every scholar.",
        },
        {
            question:
                "Are Advanced Placement (AP) and extracurricular activities included?",
            answer: "Yes, our curriculum includes a full range of AP courses alongside arts, athletics, and leadership extracurricular programs.",
        },
        {
            question:
                "Are tuition financial aid and merit scholarships available?",
            answer: "We offer need-based financial aid as well as merit scholarships for academically outstanding students. Contact admissions for details.",
        },
    ];

    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="w-full bg-white px-6 py-20">
            <div className="container text-center">
                <span className="inline-block rounded-md bg-slate-100 px-3 py-1 text-xs font-semibold tracking-wide text-slate-500">
                    Help Center
                </span>

                <h2 className="mt-4 text-2xl font-extrabold text-slate-900 sm:text-3xl">
                    Frequently Asked Questions
                </h2>

                <p className="mt-3 text-sm text-slate-400 sm:text-base">
                    Everything you need to know about our learning platform and
                    subscriptions.
                </p>

                <div className="mt-10 space-y-4 text-left">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div
                                key={faq.question}
                                className="overflow-hidden rounded-xl bg-slate-50"
                            >
                                <button
                                    onClick={() => toggle(index)}
                                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                                >
                                    <span className="text-sm font-semibold text-slate-900 sm:text-base">
                                        {faq.question}
                                    </span>
                                    <ChevronDown
                                        className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${
                                            isOpen ? "rotate-180" : ""
                                        }`}
                                    />
                                </button>

                                {isOpen && (
                                    <div className="px-6 pb-5">
                                        <p className="text-sm leading-relaxed text-slate-500">
                                            {faq.answer}
                                        </p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
