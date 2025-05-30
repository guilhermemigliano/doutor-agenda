import { faker } from "@faker-js/faker/locale/pt_BR";

import { db } from "@/db";
import { patientsTable } from "@/db/schema";

const main = async () => {
  // Primeiro, vamos pegar uma clínica aleatória do banco
  const clinic = await db.query.clinicsTable.findFirst();

  if (!clinic) {
    console.error("Nenhuma clínica encontrada. Crie uma clínica primeiro.");
    process.exit(1);
  }

  const patients = Array.from({ length: 20 }).map(() => {
    const sex = faker.helpers.arrayElement(["male", "female"]) as
      | "male"
      | "female";
    const firstName =
      sex === "male"
        ? faker.person.firstName("male")
        : faker.person.firstName("female");
    const lastName = faker.person.lastName();

    return {
      clinicId: clinic.id,
      name: `${firstName} ${lastName}`,
      email: faker.internet.email({ firstName, lastName }).toLowerCase(),
      phoneNumber: faker.helpers.replaceSymbols("###########"), // Formato: 11999999999
      sex,
    };
  });

  console.log("Inserindo pacientes...");
  await db.insert(patientsTable).values(patients);
  console.log("Pacientes inseridos com sucesso!");
  process.exit(0);
};

main().catch((error) => {
  console.error("Erro ao inserir pacientes:", error);
  process.exit(1);
});
