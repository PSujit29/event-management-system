export const Heading1 = ({ pageTitle = "Default - Heading", className = "" }) => {
  return <h1 className={`text-4xl font-bold mb-2.5  ${className}`}>{pageTitle}</h1>;
};

export const SubHeading = ({ children = "Default - SubHeading", className = "" }) => {
  return <div className={`${className}`}>{children}</div>;
};
