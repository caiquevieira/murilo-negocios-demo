/** Caminho de arquivo em public/ com o basePath (para usos fora do next/image, ex.: CSS mask). */
export function asset(path: string) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${path}`;
}
