import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";

const Timer = forwardRef(({ successCallback }, ref) => {
  const timeLeft = useRef(30);

  const resetTimer = () => {
    timeLeft.current = 30;
  };
  useImperativeHandle(ref, () => ({ resetTimer }), []);

  useEffect(() => {
    const elem = document.getElementById("countdown");
    const countdown = () => {
      if (timeLeft.current === -1) {
        successCallback();
        timeLeft.current = 30;
      } else {
        elem.innerHTML = "Refreshing in " + timeLeft.current + " seconds";
        timeLeft.current = timeLeft.current - 1;
      }
    };
    const timerId = setInterval(countdown, 1000);
    return () => {
      clearTimeout(timerId);
    };
  }, []);

  return <div id="countdown"></div>;
});
export default Timer;
