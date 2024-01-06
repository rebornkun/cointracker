"use client";
import { Dropdown, Space } from "antd";
import { ThreeDotsSvg, EyeSvg } from "./svg";

const ActionsBtn = ({
  items,
  actions,
  data}) => {
  const handleMenuClick = (e) => {
    if (e.key === "0") {
      actions[0](data);
    }else if (e.key === "1") {
      actions[1](data);
    }
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <div className="flex items-center space-x-2">
      <span className=" text-lg">
        <EyeSvg className="action" />
      </span>
      <span className=" cursor-pointer">
        <Dropdown menu={menuProps} trigger={["click"]}>
          <a onClick={(e) => e.preventDefault()}>
            <ThreeDotsSvg className="action" />
          </a>
        </Dropdown>
      </span>
    </div>
  );
};
export default ActionsBtn;
