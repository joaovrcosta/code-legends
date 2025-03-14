import { Input } from "../ui/input";

export function newAdmin() {
  return (
    <div>
      <h1>New admin Form</h1>
      <form>
        <Input placeholder="Nome do admin" />
        <Input placeholder="Email do admin" />
        <Input placeholder="Senha do admin" />
        <button>Enviar formulario</button>
      </form>
    </div>
  );
}
