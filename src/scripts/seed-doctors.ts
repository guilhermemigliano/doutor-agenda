import { faker } from "@faker-js/faker/locale/pt_BR";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { MedicalSpecialty } from "@/app/(protected)/doctors/_constants";
import { db } from "@/db";
import { doctorsTable } from "@/db/schema";

dayjs.extend(utc);

const main = async () => {
  // Primeiro, vamos pegar uma clínica aleatória do banco
  const clinic = await db.query.clinicsTable.findFirst();

  if (!clinic) {
    console.error("Nenhuma clínica encontrada. Crie uma clínica primeiro.");
    process.exit(1);
  }

  const specialties = Object.values(MedicalSpecialty);

  const doctors = Array.from({ length: 10 }).map(() => {
    // Horário de trabalho aleatório entre 6h e 22h
    const availableFromHour = faker.number.int({ min: 6, max: 16 });
    const availableToHour = faker.number.int({
      min: availableFromHour + 4,
      max: 22,
    });

    // Dia da semana aleatório (0 = Domingo, 6 = Sábado)
    const availableFromWeekDay = faker.number.int({ min: 1, max: 5 }); // Segunda a Sexta
    const availableToWeekDay = faker.number.int({
      min: availableFromWeekDay,
      max: 6,
    }); // Até Sábado

    const fromTime = dayjs()
      .set("hour", availableFromHour)
      .set("minute", 0)
      .set("second", 0)
      .utc();

    const toTime = dayjs()
      .set("hour", availableToHour)
      .set("minute", 0)
      .set("second", 0)
      .utc();

    return {
      clinicId: clinic.id,
      name: faker.person.fullName(),
      specialty:
        specialties[faker.number.int({ min: 0, max: specialties.length - 1 })],
      appointmentPriceInCents: faker.number.int({
        min: 15000,
        max: 50000,
      }), // Entre R$ 150 e R$ 500
      availableFromWeekDay,
      availableToWeekDay,
      availableFromTime: fromTime.format("HH:mm:ss"),
      availableToTime: toTime.format("HH:mm:ss"),
    };
  });

  console.log("Inserindo médicos...");
  await db.insert(doctorsTable).values(doctors);
  console.log("Médicos inseridos com sucesso!");
  process.exit(0);
};

main().catch((error) => {
  console.error("Erro ao inserir médicos:", error);
  process.exit(1);
});
