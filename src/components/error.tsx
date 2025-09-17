interface ErrorProps {
    error: { message: string };
}
import ErrorGif from "../../public/Error animation.json";
import Lottie from "lottie-react";

export const Error = ({ error }: ErrorProps) => {
    return (
      <div className="text-red-600 p-6 text-center bg-[var(--unhighlight)] rounded-xl w-96 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Lottie animationData={ErrorGif} loop={true} style={{ width: 150, margin: "0 auto" }} />
        Sorry, something went wrong on our side. <br />
        <span className="text-sm opacity-90">{error.message}</span>
      </div>
    );
}