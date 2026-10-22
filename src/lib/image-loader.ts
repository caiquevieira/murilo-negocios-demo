// Loader do next/image para export estático: sem otimização em tempo real, só prefixa o basePath.
export default function imageLoader({ src }: { src: string; width: number; quality?: number }) {
  return src.startsWith("/") ? `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${src}` : src;
}
