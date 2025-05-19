type ZodErrorShape = {
  errors?: Record<string, { message: string }>;
};

type PrismaErrorShape = {
  code?: string;
  meta?: { target?: string[] };
};

type GenericError = {
  name: string;
  message?: string | unknown;
} & Partial<ZodErrorShape & PrismaErrorShape>;

function formatZodError(error: ZodErrorShape): string {
  if (!error.errors) return "Validation error";

  const fieldErrors = Object.keys(error.errors).map(
    (field) => error.errors![field].message
  );
  return fieldErrors.join(". ");
}

function formatPrismaError(error: PrismaErrorShape & { name: string }): string {
  if (error.name !== "PrismaClientKnownRequestError") return "";

  if (error.code === "P2002") {
    const field = error.meta?.target ? error.meta.target[0] : "Field";
    return `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
  }

  return "";
}

export const formatError = (error: unknown): string => {
  if (typeof error === "object" && error !== null && "name" in error) {
    const err = error as GenericError;

    if (err.name === "ZodError") {
      return formatZodError(err);
    }

    if (err.name === "PrismaClientKnownRequestError") {
      const prismaMessage = formatPrismaError(err);
      if (prismaMessage) return prismaMessage;
    }

    if (typeof err.message === "string") {
      return err.message;
    }

    return JSON.stringify(err.message);
  }

  return "Unknown error";
};
