import { FunctionComponent, useRef, useState } from "react";
import { trpc } from "../utils/trpc";
import { inferRouterInputs } from "@trpc/server";
import { AppRouter } from "../../../server";
type RouterInput = inferRouterInputs<AppRouter>;

interface FormProps {}

const Form: FunctionComponent<FormProps> = () => {
  const [Data, setData] = useState<RouterInput["userCreate"]>({
    email: "",
    name: "",
  });

  const createUser = trpc.userCreate.useMutation({
    onSuccess: () => {
      refetch();
    },
  });
  const { data, refetch } = trpc.getUsers.useQuery();

  const inp = useRef<HTMLButtonElement>(null);
  const handleClick = () => {
    createUser.mutate(Data);
    setData({
      name: "",
      email: "",
    });
  };

  return (
    <>
      <div className="m-12 flex flex-col ">
        <input
          className="border-[1px] rounded-md py-1 px-4  border-slate-800 m-4 w-96 "
          type="text"
          placeholder="Username"
          value={Data.name}
          onChange={(e) => setData({ ...Data, name: e.target.value })}
        />
        <input
          className="border-[1px] rounded-md py-1 px-4  border-slate-800 m-4 w-96 "
          type="text"
          placeholder="Email"
          value={Data.email}
          onChange={(e) => setData({ ...Data, email: e.target.value })}
        />
        <button
          className="border-2 h-14 w-32 rounded-lg  border-slate-800 m-4"
          ref={inp}
          onClick={handleClick}
        >
          Submit
        </button>
      </div>
      <div>
        {data?.map((user) => {
          return <div key={user.id}>Name: {user.name} </div>;
        })}
      </div>
    </>
  );
};

export default Form;
