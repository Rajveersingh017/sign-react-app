import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { onError } from "../libs/errorLib";
import config from "../config";

export default function Settings() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="Settings">
    </div>
  );
}