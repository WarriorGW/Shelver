export const passwordValidations = [
  {
    message: "Al menos 8 caracteres",
    check: (val: string) => val.length >= 8,
  },
  {
    message: "Al menos una letra mayúscula",
    check: (val: string) => /[A-Z]/.test(val),
  },
  {
    message: "Al menos una letra minúscula",
    check: (val: string) => /[a-z]/.test(val),
  },
  {
    message: "Al menos un carácter especial",
    check: (val: string) => /[^a-zA-Z0-9]/.test(val),
  },
  {
    message: "Sin números consecutivos (ej. 123)",
    check: (val: string) => {
      const digits = val.replace(/\D/g, "");
      for (let i = 0; i < digits.length - 2; i++) {
        const n1 = parseInt(digits[i]);
        const n2 = parseInt(digits[i + 1]);
        const n3 = parseInt(digits[i + 2]);
        if (n2 === n1 + 1 && n3 === n2 + 1) {
          return false; // hay tres consecutivos
        }
      }
      return true;
    },
  },
  {
    message: "Sin letras consecutivas (ej. abc)",
    check: (val: string) => {
      const letters = val.toLowerCase().replace(/[^a-z]/g, "");
      for (let i = 0; i < letters.length - 2; i++) {
        const c1 = letters.charCodeAt(i);
        const c2 = letters.charCodeAt(i + 1);
        const c3 = letters.charCodeAt(i + 2);
        if (c2 === c1 + 1 && c3 === c2 + 1) {
          return false; // hay tres consecutivas
        }
      }
      return true;
    },
  },
];
