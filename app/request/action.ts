import axiosPL from "@/utils/axiosPL";

export const createRequest = async () => {
  const res = await axiosPL.post(
    "https://paperless.privatbank.ua/PplsService/api2/checked/login",
    {
      login: "dearian2706@gmail.com",
      password: "V56jkass92$12t",
    }
  );
  console.log(res.data);
};
