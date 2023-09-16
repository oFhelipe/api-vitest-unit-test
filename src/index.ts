import { api } from "./app";

const port = 3333;
api.listen(port, () => {
  console.log(`Api iniciada na porta ${port}`);
});
