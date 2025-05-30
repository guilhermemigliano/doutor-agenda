import { faker } from "@faker-js/faker/locale/pt_BR";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { appointmentsTable, doctorsTable, patientsTable } from "@/db/schema";

dayjs.extend(utc);

const main = async () => {
  // Primeiro, vamos pegar uma clínica aleatória do banco
  const clinic = await db.query.clinicsTable.findFirst();

  if (!clinic) {
    console.error("Nenhuma clínica encontrada. Crie uma clínica primeiro.");
    process.exit(1);
  }

  // Buscar todos os médicos e pacientes da clínica
  const [doctors, patients] = await Promise.all([
    db.query.doctorsTable.findMany({
      where: eq(doctorsTable.clinicId, clinic.id),
    }),
    db.query.patientsTable.findMany({
      where: eq(patientsTable.clinicId, clinic.id),
    }),
  ]);

  if (doctors.length === 0) {
    console.error(
      "Nenhum médico encontrado. Execute o seed de médicos primeiro.",
    );
    process.exit(1);
  }

  if (patients.length === 0) {
    console.error(
      "Nenhum paciente encontrado. Execute o seed de pacientes primeiro.",
    );
    process.exit(1);
  }

  const appointments = Array.from({ length: 50 }).map(() => {
    const doctor = faker.helpers.arrayElement(doctors);
    const patient = faker.helpers.arrayElement(patients);

    // Gerar data aleatória entre junho e dezembro de 2025
    const appointmentDate = dayjs(
      faker.date.between({
        from: "2025-06-01T00:00:00.000Z",
        to: "2025-12-31T23:59:59.999Z",
      }),
    );

    // Ajustar para o horário de trabalho do médico
    const doctorStartHour = parseInt(doctor.availableFromTime.split(":")[0]);
    const doctorEndHour = parseInt(doctor.availableToTime.split(":")[0]);

    // Gerar horário aleatório dentro do horário de trabalho do médico
    // Garantir que temos pelo menos 1 hora de consulta disponível
    const maxHour = Math.max(doctorStartHour, doctorEndHour - 1);
    const appointmentHour = faker.number.int({
      min: doctorStartHour,
      max: maxHour,
    });

    // Definir minutos como 00 ou 30 (consultas de 30 minutos)
    const appointmentMinute = faker.helpers.arrayElement([0, 30]);

    const finalDate = appointmentDate
      .set("hour", appointmentHour)
      .set("minute", appointmentMinute)
      .set("second", 0);

    // Verificar se o dia da semana está dentro da disponibilidade do médico
    const dayOfWeek = finalDate.day(); // 0 = Domingo, 6 = Sábado
    if (
      dayOfWeek < doctor.availableFromWeekDay ||
      dayOfWeek > doctor.availableToWeekDay
    ) {
      // Se o dia não estiver disponível, ajustar para o próximo dia disponível
      const daysToAdd = doctor.availableFromWeekDay - dayOfWeek;
      finalDate.add(daysToAdd >= 0 ? daysToAdd : 7 + daysToAdd, "day");
    }

    return {
      clinicId: clinic.id,
      doctorId: doctor.id,
      patientId: patient.id,
      date: finalDate.toDate(),
      appointmentPriceInCents: doctor.appointmentPriceInCents,
    };
  });

  console.log("Inserindo agendamentos...");
  await db.insert(appointmentsTable).values(appointments);
  console.log("Agendamentos inseridos com sucesso!");
  process.exit(0);
};

main().catch((error) => {
  console.error("Erro ao inserir agendamentos:", error);
  process.exit(1);
});
