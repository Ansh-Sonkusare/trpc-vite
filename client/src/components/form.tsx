import { FunctionComponent, useRef, useState } from "react";
import { trpc } from "../utils/trpc";
import { inferRouterInputs } from "@trpc/server";
import { AppRouter } from "../../../server";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
type RouterInput = inferRouterInputs<AppRouter>;

interface FormProps {}

const Form: FunctionComponent<FormProps> = () => {
  const [Data, setData] = useState<RouterInput["userCreate"]>({
    email: "",
    name: "",
  });
  const { data, refetch } = trpc.getUsers.useQuery();

  const createUser = trpc.userCreate.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

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
        <Input
          className="w-96 my-4  text-white"
          type="text"
          placeholder="Username"
          value={Data.name}
          onChange={(e) => setData({ ...Data, name: e.target.value })}
        />
        <Input
          className="w-96 my-4 text-white"
          type="text"
          placeholder="Email"
          value={Data.email}
          onChange={(e) => setData({ ...Data, email: e.target.value })}
        />

        <Button
          ref={inp}
          variant={"secondary"}
          onClick={handleClick}
          className="h-14 w-32 "
        >
          CLICK ME
        </Button>

        <div>
          {data?.map((user) => {
            return (
              <div className="text-white" key={user.id}>
                Name: {user.name}{" "}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Form;
