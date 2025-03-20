import classes from "./showcase.module.scss";

interface ShowcaseProps {
  children: React.ReactNode;
  label: string;
}

const Showcase = ({ children, label }: ShowcaseProps) => {
  return (
    <div className={classes.container}>
      <label className={classes.label}>{label}</label>
      <div>{children}</div>
    </div>
  );
};

export default Showcase;
