type PolicySection = {
  title: string
  content: string[]
}

type PolicyPageProps = {
  eyebrow: string
  title: string
  description: string
  updatedAt: string
  sections: PolicySection[]
}

export function PolicyPage({ eyebrow, title, description, updatedAt, sections }: PolicyPageProps) {
  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-28 pb-20 px-6 md:px-8">
      <div className="max-w-4xl mx-auto">
        <section className="mb-12">
          <p className="text-primary text-xs font-black uppercase tracking-[0.3em] mb-4">
            {eyebrow}
          </p>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-6">
            {title}
          </h1>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed font-medium">
            {description}
          </p>
          <p className="text-gray-600 text-sm font-medium mt-5">
            Last updated: {updatedAt}
          </p>
        </section>

        <section className="space-y-6">
          {sections.map((section) => (
            <article
              key={section.title}
              className="bg-[#111111] border border-[#1a1a1a] rounded-lg p-6 md:p-8"
            >
              <h2 className="text-xl md:text-2xl font-black text-white tracking-tighter uppercase mb-4">
                {section.title}
              </h2>
              <div className="space-y-4">
                {section.content.map((paragraph) => (
                  <p key={paragraph} className="text-gray-400 leading-relaxed font-medium">
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  )
}
