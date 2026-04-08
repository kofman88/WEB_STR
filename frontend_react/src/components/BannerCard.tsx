export function BannerCard({ title, text }: { title: string; text: string }) {
  return (
    <article className="banner-press glass reveal">
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}
