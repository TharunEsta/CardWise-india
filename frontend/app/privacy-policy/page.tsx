export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="glass-panel rounded-[36px] p-6 sm:p-8">
        <h1 className="font-display text-4xl text-white sm:text-5xl">Privacy Policy</h1>
        <p className="mt-6 text-sm text-white/65 sm:text-base">
          CardWise India stores analytics, search, and lead data for product improvement, content optimization, and callback workflows. Sensitive actions require login and should be backed by Supabase Auth and proper consent copy in production.
        </p>
      </div>
    </div>
  );
}
