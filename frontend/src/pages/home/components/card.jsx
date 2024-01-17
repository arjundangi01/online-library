import axios from "axios";
import React, { useEffect, useState } from "react";
import { ImCancelCircle } from "react-icons/im";
import { useDispatch } from "react-redux";
import Svg from "../../../components/svg";
import { getDate } from "../../../utils/date";
const Card = ({
  
}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [dateObj, setDateObj] = useState({});
  useEffect(() => {
    // setDateObj(getDate(date));
  }, []);
  const onDelete = async () => {
    try {
      setLoading(true);
    
      setLoading(false);
    } catch (error) {
      setLoading(false);

      console.log(error);
    }
  };

  return (
    <div className="flex gap justify-between  border my-2 py-2">
     
    </div>
  );
};

export default Card;
