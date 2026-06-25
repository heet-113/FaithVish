import useStore from '../store/useStore';

const AffiliateDisclosureBanner = () => {
  const { activeGender } = useStore();
  const isMen = activeGender === 'men';

  return (
    <div
      className="py-1.5 px-3 z-50 relative"
      style={{
        background: isMen ? '#1A1A1C' : '#F0E8DF',
        borderBottom: `1px solid ${isMen ? '#282828' : '#E8DDD1'}`,
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center text-center">
        <p
          className="text-[10px] sm:text-[11px]"
          style={{ color: isMen ? '#6B6B6B' : '#8A7E72', letterSpacing: '0.03em' }}
        >
          We may earn a small commission when you shop through our links at no extra cost to you.
        </p>
      </div>
    </div>
  );
};

export default AffiliateDisclosureBanner;
