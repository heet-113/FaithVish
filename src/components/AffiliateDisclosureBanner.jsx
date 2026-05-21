import useStore from '../store/useStore';

const AffiliateDisclosureBanner = () => {
  const { activeGender } = useStore();
  const isMen = activeGender === 'men';

  return (
    <div
      className="border-b-2 py-2 px-3 sm:px-4 shadow-sm z-50 relative"
      style={{
        background: isMen ? '#1A1A1C' : 'var(--color-surface-light)',
        borderColor: isMen ? '#3A3A3C' : 'var(--color-border)',
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center text-center">
        <p
          className="text-xs font-medium"
          style={{ color: isMen ? '#6B6B6B' : 'var(--color-text-muted)' }}
        >
          <span
            className="font-bold mr-1"
            style={{ color: isMen ? '#C9A96E' : 'var(--color-accent)' }}
          >
            Disclosure:
          </span>
          FaithVish participates in affiliate programs. We may earn a commission when you click links to retailer sites, at no extra cost to you.
        </p>
      </div>
    </div>
  );
};

export default AffiliateDisclosureBanner;
