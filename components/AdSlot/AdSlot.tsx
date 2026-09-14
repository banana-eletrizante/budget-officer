import styles from "./AdSlot.module.css";

interface AdSlotProps {
  /** Identifica o espaço (útil para saber onde colar cada <ins> do AdSense) */
  label: string;
  /** "horizontal" para topo/rodapé, "vertical" para lateral */
  orientation?: "horizontal" | "vertical";
}

/**
 * Espaço reservado e já estilizado para anúncios do Google AdSense.
 * Quando for ativar os anúncios de verdade, troque o conteúdo interno
 * deste componente pelo bloco <ins class="adsbygoogle" ...> gerado
 * pelo painel do AdSense, mantendo o wrapper com a classe "slot".
 */
export default function AdSlot({ label, orientation = "horizontal" }: AdSlotProps) {
  return (
    <div
      className={`${styles.slot} ${
        orientation === "vertical" ? styles.vertical : styles.horizontal
      }`}
      aria-label={`Espaço de anúncio: ${label}`}
    >
      <span className={styles.placeholderText}>Espaço para anúncio · {label}</span>
    </div>
  );
}
