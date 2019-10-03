import { Typography } from "@material-ui/core";
import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";

export interface IHeaderTitleProps {
  isLink: boolean;
}
export const HeaderTitle: FunctionComponent<IHeaderTitleProps> = ({
  isLink
}) => {
  if (isLink) {
    return (
      <Link to="/" style={{ textDecoration: "none", color: "#FFFFFF" }}>
        <Typography variant="h6" color="inherit">
          Movies to watch
        </Typography>
      </Link>
    );
  }

  return (
    <Typography variant="h6" color="inherit">
      Movies to watch
    </Typography>
  );
};
