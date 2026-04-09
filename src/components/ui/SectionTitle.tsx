interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export default function SectionTitle({ title, subtitle, align = 'center' }: SectionTitleProps) {
  return (
    <div className={`mb-12 md:mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className={`mt-6 h-1 w-16 bg-primary rounded-full ${align === 'center' ? 'mx-auto' : ''}`} />
    </div>
  );
}
