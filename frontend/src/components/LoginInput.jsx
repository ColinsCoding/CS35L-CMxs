import React, { useState } from "react";

const LoginInput = ({
  placeHolder,
  icon,
  inputState,
  inputStateFunc,
  type,
  isSignUp,
}) => {
  const [isFocus, setIsFocus] = useState(false);

  const isShadow = isFocus ? "" : "";
  /*console.log(isShadow);*/
  return (
    <div className={` ${isShadow}`}>
      {icon}
      <input
        type={type}
        placeholder={placeHolder}
        className=""
        value={inputState}
        onChange={(e) => inputStateFunc(e.target.value)}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
    </div>
  );
};

export default LoginInput;
