import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Detail from "./detail";
import { unLockCreatorMode } from "../../redux/user/user.action";
import Creator from "./creator";

const Profile = () => {
  const { isAuth, loginUserDetail } = useSelector((store) => store.userReducer);
  const dispatch = useDispatch();

  const onUnlockCreator = () => {
    dispatch(unLockCreatorMode());
  };
  return (
    <main className="w-[80%] m-auto">
      <section className="mt-5 border px-5">
        <Detail />
      </section>
      <section className="mt-5" >
        {loginUserDetail?.roles?.includes("CREATOR") ? (
          <Creator />
        ) : (
          <div className="text-center">
            <h1 className="text-[teal] text-[2rem] font-bold">
              Unlock Creator Mode
            </h1>
            <button
              // type="submit"
              onClick={onUnlockCreator}
              className=" justify-center
               rounded-md  px-3
               text-[#3863bf] text-[2rem] 
                py-2 text-sm font-semibold leading-6
                 text-blue shadow-sm border-dashed border-[2px]
                  block w-[200px] m-auto
                  "
            >
              Unlock
            </button>
          </div>
        )}
      </section>
    </main>
  );
};

export default Profile;
