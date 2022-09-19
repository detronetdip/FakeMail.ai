const Arrow = (props: { color: string }) => {
  return (
    <svg
      className="gray"
      viewBox="0 0 22 80"
      fill="none"
      preserveAspectRatio="none"
      style={{
        color: props.color,
      }}
    >
      <path
        d="M0 -2L20 40L0 82"
        vector-effect="non-scaling-stroke"
        stroke="currentcolor"
        stroke-linejoin="round"
      ></path>
    </svg>
  );
};
export default Arrow;
