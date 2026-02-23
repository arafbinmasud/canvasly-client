import { Link } from "react-router";

const ErrorPage404 = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-base-100 px-5">
      <h1 className="text-9xl font-bold text-primary opacity-20 absolute">
        404
      </h1>

      <div className="text-center z-10">
        <h2 className="text-4xl font-heading font-bold mb-4">
          Oops! This Canvas is Blank
        </h2>
        <p className="text-lg  opacity-60  mb-8">
          The page you're looking for doesn't exist
        </p>
        <Link
          to="/"
          className="btn btn-primary rounded-full text-accent px-10 transition-all hover:scale-105"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage404;
