import { Link } from "react-router-dom";

// This is a reusable component that wraps the `Link` component from the `react-router-dom` library
// It adds a `className` prop to the `Link` component, which can be used to add custom styles
export const PageLink = (props) => {
  // Render a `Link` component with all the props passed to this component
  // Also add a `page-nav` class to the `Link` component, as well as any custom class names passed as props
  return (
    <Link
      {...props}
      className={`text-primaryTextLight dark:text-primaryTextDark dark:hover:text-activeLight ${props.className}`}
    />
  );
};
