interface ErrorProps {
    error: { message: string };
}
export const Error = ({ error }: ErrorProps) => {
    return (
      <div className="text-white p-6 text-center bg-[var(--highlight)] rounded-xl w-96 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        ❌ Something went wrong on our side. <br />
        <span className="text-sm opacity-75">{error.message}</span>
      </div>
    );
}