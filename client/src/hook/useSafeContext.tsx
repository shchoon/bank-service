import { useContext } from "react";

export default function UseSafeContext<T>(
  Context: React.Context<T | null>,
  contextName = "Context"
) {
  const context = useContext(Context);

  if (context === null) {
    throw Error(`${contextName} is not provided`);
  }

  return context;
}
