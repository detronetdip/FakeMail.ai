const ProgressChart2 = (props: {
  value: number;
  color: string;
  back: string;
}) => {
  return (
    <>
      <div className="svgbox">
        <div
          className="digit"
          style={{
            color: props.color,
          }}
        >
          {props.value}%
        </div>
        <svg
          viewBox="0 0 36 36"
          className="circular-chart"
          style={{
            display: "block",
            margin: "10px auto",
            maxWidth: "90%",
            maxHeight: "90%",
          }}
        >
          <path
            style={{
              stroke: props.color,
              fill: props.back,
              strokeWidth: "2.8",
              strokeLinecap: "round",
              animation: "progress 1s ease-out forwards",
            }}
            strokeDasharray={`${props.value},100`}
            d="M18 2.0845
      a 15.9155 15.9155 0 0 1 0 31.831
      a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
      </div>
    </>
  );
};

export default ProgressChart2;
