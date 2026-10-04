import {Spinner} from "@heroui/react";

function LoadingState() {
  return (
    <div className="flex items-center w-full h-full justify-center">
      <Spinner />
    </div>
  );
}

export default LoadingState;
