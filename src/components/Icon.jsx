// Inline Font Awesome SVG icons, so the site doesn't load the Font Awesome kit and webfonts.
const Icon = ({ icon, className = "" }) => {
  const [width, height, , , path] = icon.icon;
  return (
    <svg
      className={`icon ${className}`.trim()}
      viewBox={`0 0 ${width} ${height}`}
      width={width / height + "em"}
      height="1em"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d={path} />
    </svg>
  );
};

export default Icon;
